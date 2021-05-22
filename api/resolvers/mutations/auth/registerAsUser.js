import { UserModel } from "../../../models/index";
import bcrypt from "bcryptjs";
import { ApolloError, UserInputError } from "apollo-server-express";

export const registerAsUser = async (_, { input }) => {
  const { name, username, email, password } = input;

  const usernameRegex = new RegExp(
    "^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
  );
  if (!usernameRegex.test(username))
    throw new UserInputError("Invalid Username", {
      username: "Invalid Username",
    });

  let isUser = await UserModel.findOne({ username });
  if (isUser) {
    throw new UserInputError("username taken!", {
      username: "username taken!",
    });
  }

  isUser = await UserModel.findOne({ email });
  if (isUser) {
    throw new UserInputError("email already in use!", {
      email: "email already in use.",
    });
  }

  try {
    const newUser = await UserModel.create({
      name,
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      profile_picture: `https://robohash.org/${Math.random() * 100 + 1}.png`,
      isPrivate: false,
      links: {
        facebook: null,
        twitter: null,
        instagram: null,
        website: null,
        github: null,
      },
      bookclubs: [],
      booklists: [],
    });

    await newUser.save();

    return true;
  } catch (error) {
    throw new Error(error);
  }
};
