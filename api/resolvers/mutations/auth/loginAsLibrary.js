import { LibraryModel } from "../../../models/index";
import bcrypt from "bcryptjs";
import { UserInputError, ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import validator from "validator";

export class MyError extends ApolloError {
  constructor(message) {
    super(message, "MY_ERROR_CODE");

    Object.defineProperty(this, "name", { value: "MyError" });
  }
}

export const loginAsLibrary = async (_, args, _2) => {
  const { identity, password } = args;
  let library;
  if (validator.isEmail(identity)) {
    library = await LibraryModel.findOne({ "contact.email": identity });
  } else {
    library = await LibraryModel.findOne({ username: identity });
  }

  //wrong password
  if (!library) {
    throw new ApolloError("Invalid Credentials!", "BAD_CREDENTIALS");
  }

  const isMatch = bcrypt.compareSync(password, library.password);

  if (!isMatch) {
    throw new ApolloError("Bad Credentials!", "BAD_CREDENTIALS");
  }

  try {
    const token = jwt.sign(
      {
        lid: library._id,
      },
      process.env.JWT_SECRET
    );
    await library.updateOne({ $push: { tokens: token } });
    return {
      token,
      profile: library,
    };
  } catch (err) {
    throw new Error(err);
  }
};
