import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validator from "validator";
import bcrypt from "bcryptjs";
import UserModel from ".";
import jwt from "jsonwebtoken";
import validatePassword from "../utils/validatePassword";

const userSchema = new Schema(
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
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Invalid Email Address!");
      },
    },
    userType: {
      type: String,
      default: "User",
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
    },
    bio: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    links: {
      facebook: String,
      twitter: String,
      instagram: String,
      website: String,
      github: String,
    },
    booklists: [
      {
        type: Schema.ObjectId,
        ref: "Booklist",
      },
    ],
    followers: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    preferences: {
      theme: {
        type: String,
        enums: ["LIGHT", "DARK"],
        DEFAULT: "LIGHT",
      },
    },
    joinedLibraries: [
      {
        library: {
          type: Schema.Types.ObjectId,
          ref: "Library",
          required: true,
        },
        libraryId: {
          type: String,
          required: true,
        },
        when: {
          type: Date,
          required: true,
        },
      },
    ],
    follow_requests: [
      {
        user: {
          type: Schema.ObjectId,
          ref: "User",
          required: true,
        },
        when: {
          type: Date,
          required: true,
        },
      },
    ],
    tokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamp: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id.toString(),
      as: "user",
    },
    process.env.JWT_SECRET
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const isValid = validatePassword(user.password);
    if (isValid.status === "invalid") {
      // const err = new Error();
      // err.message = isValid.error;
      // err.name = "Password Invalidation";
      // throw err;
    }
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("updateOne", async function (next) {
  const user = this;

  if (user._update.password) {
    const isValid = validatePassword(user._update.password);
    if (isValid.status === "invalid") {
      // const err = new Error();
      // err.message = isValid.error;
      // err.name = "Password Invalidation";
      // throw err;
    }
    user._update.password = await bcrypt.hash(user._update.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  // await CommentModel.deleteMany({ by: this._id });
  // await ProjectModel.deleteMany({ developer: this._id });
  next();
});

userSchema.statics.findByCredentials = async ({
  email,
  username,
  password,
}) => {
  let user;
  if (username) {
    user = await UserModel.findOne({ username });
  } else if (email) {
    user = await UserModel.findOne({ email });
  } else {
    throw new Error("use email/username to login!");
  }
  if (!user) throw new Error("Bad Credentials!");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Bad Credentials!");
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

export default mongoose.model("User", userSchema);
