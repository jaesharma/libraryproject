import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validatePassword from "../utils/validatePassword";
import LibraryModel from ".";

const librarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.matches(value, "^[a-zA-Z0-9_.-]*$")) {
          throw new Error("Invalid username");
        }
      },
    },
    userType: {
      type: String,
      default: "Library",
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    logo: {
      type: String,
    },
    staff: [
      {
        member: {
          type: Schema.Types.ObjectId,
          ref: "Staff",
        },
        permissions: {
          type: Array,
          default: ["viewer"],
          //  viewer, manage_entries, manage_staff, admin, manage_library
        },
      },
    ],
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        joined: {
          type: Date,
        },
        membership_plan: {
          type: String,
        },
        membership_expires_on: {
          type: Date,
          required: true,
        },
        currently_issued: {
          type: Number,
          default: 0,
        },
      },
    ],
    membership_plans: [
      {
        title: {
          type: String,
          required: true,
        },
        duration: {
          type: String,
          enums: [
            "DAILY",
            "WEEKLY",
            "MONTHLY",
            "QUARTERLY",
            "HALF-YEARLY",
            "YEARLY",
          ],
          required: true,
        },
        fees: {
          type: Number,
          default: 0,
        },
        description: {
          type: String,
        },
        issue_limit: {
          type: Number,
          default: 8,
        },
      },
    ],
    booklists: [
      {
        type: Schema.ObjectId,
        ref: "Booklist",
      },
    ],
    identification_method: {
      is_required: {
        type: Boolean,
        default: false,
      },
      identification_type: {
        type: String,
        enum: ["AADHAAR", "COLLEGE_ID", "LIBRARY_CARD"],
        default: "LIBRARY_CARD",
        required: function () {
          return this.identification_method.is_required;
        },
      },
    },
    requests: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        note: {
          type: String,
        },
        identity: {
          type: String,
          required: function () {
            return this.identification_method.is_required;
          },
        },
        when: {
          type: Date,
          required: true,
        },
      },
    ],
    membership_renew_requests: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        note: {
          type: String,
        },
        when: {
          type: Date,
          required: true,
        },
      },
    ],
    entries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Entry",
      },
    ],
    location: {
      country: {
        type: String,
      },
      address: {
        type: String,
      },
      lat: String,
      long: String,
    },
    contact: {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: Number,
      },
    },
    links: {
      facebook: String,
      twitter: String,
      instagram: String,
      website: String,
      github: String,
    },
    tokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

librarySchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id.toString(),
      as: "library",
    },
    process.env.JWT_SECRET
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

librarySchema.pre("save", async function (next) {
  const library = this;

  if (library.isModified("password")) {
    const isValid = validatePassword(library.password);
    if (isValid.status === "invalid") {
      // const err = new Error();
      // err.message = isValid.error;
      // err.name = "Password Invalidation";
      // throw err;
    }
    library.password = await bcrypt.hash(library.password, 8);
  }
  next();
});

librarySchema.pre("updateOne", async function (next) {
  const library = this;

  if (library._update.password) {
    const isValid = validatePassword(library._update.password);
    if (isValid.status === "invalid") {
      // const err = new Error();
      // err.message = isValid.error;
      // err.name = "Password Invalidation";
      // throw err;
    }
    library._update.password = await bcrypt.hash(library._update.password, 8);
  }
  next();
});

librarySchema.pre("remove", async function (next) {
  // await CommentModel.deleteMany({ by: this._id });
  // await ProjectModel.deleteMany({ developer: this._id });
  next();
});

librarySchema.statics.findByCredentials = async ({
  email,
  username,
  password,
}) => {
  let user;
  if (username) {
    user = await LibraryModel.findOne({ username });
  } else if (email) {
    user = await LibraryModel.findOne({ email });
  } else {
    throw new Error("use email/username to login!");
  }
  if (!user) throw new Error("Bad Credentials!");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Bad Credentials!");
  return user;
};

librarySchema.methods.toJSON = function () {
  const library = this.toObject();
  delete library.password;
  delete library.tokens;
  return library;
};

export default mongoose.model("Library", librarySchema);
