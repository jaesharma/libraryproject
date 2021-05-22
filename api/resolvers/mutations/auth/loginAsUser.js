import { UserModel } from "../../../models/index";
import bcrypt from "bcryptjs";
import { ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import validator from "validator";

export const loginAsUser = async (_, args, _2) => {
  const { identity, password } = args;
  let user;
  if (validator.isEmail(identity)) {
    user = await UserModel.findOne({ email: identity });
  } else {
    user = await UserModel.findOne({ username: identity });
  }

  if (!user) {
    throw new ApolloError("Invalid Credentials!", "BAD_CREDENTIALS");
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    //wrong password
    throw new ApolloError("Invalid Credentials!", "BAD_CREDENTIALS");
  }
  try {
    const token = jwt.sign(
      {
        uid: user._id,
      },
      process.env.JWT_SECRET
    );

    await user.updateOne({ $push: { tokens: token } });

    return { token, profile: user };
  } catch (err) {
    throw new Error(err);
  }
};
