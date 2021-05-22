import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validatePassword from "../utils/validatePassword";
import StaffMemberModel from ".";

const staffMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.matches(value, "^[a-zA-Z0-9_.-]*$")) {
          throw new Error("Invalid alias");
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
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enums: ["MAN", "WOMAN", "NON_BINARY", "PREFER_NOT_TO_SAY"],
      default: ["prefer_not_to_say"],
    },
    library: {
      type: Schema.ObjectId,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

staffMemberSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id.toString(),
      as: "staff",
    },
    process.env.JWT_SECRET
  );
  return token;
};

staffMemberSchema.pre("save", async function (next) {
  const member = this;

  if (member.isModified("password")) {
    const isValid = validatePassword(member.password);
    if (isValid.status === "invalid") {
      const err = new Error();
      err.message = isValid.error;
      err.name = "Password Invalidation";
      throw err;
    }
    member.password = await bcrypt.hash(member.password, 8);
  }
  next();
});

staffMemberSchema.pre("updateOne", async function (next) {
  const member = this;

  if (member._update.password) {
    const isValid = validatePassword(member._update.password);
    if (isValid.status === "invalid") {
      const err = new Error();
      err.message = isValid.error;
      err.name = "Password Invalidation";
      throw err;
    }
    member._update.password = await bcrypt.hash(member._update.password, 8);
  }
  next();
});

staffMemberSchema.pre("remove", async function (next) {
  // await CommentModel.deleteMany({ by: this._id });
  // await ProjectModel.deleteMany({ developer: this._id });
  next();
});

staffMemberSchema.statics.findByCredentials = async ({
  email,
  alias,
  password,
}) => {
  let member;
  if (alias) {
    member = await StaffMemberModel.findOne({ alias });
  } else if (email) {
    member = await StaffMemberModel.findOne({ email });
  } else {
    // throw new Error("use email/username to login!");
  }
  if (!member) throw new Error("Bad Credentials!");
  const isMatch = await bcrypt.compare(password, member.password);
  if (!isMatch) throw new Error("Bad Credentials!");
  return member;
};

staffMemberSchema.methods.toJSON = function () {
  const member = this.toObject();
  delete member.password;
  return member;
};

export default mongoose.model("StaffMember", staffMemberSchema);
