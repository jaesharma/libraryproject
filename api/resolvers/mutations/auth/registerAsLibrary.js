import { LibraryModel, DbModel } from "../../../models/index";
import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server-express";
import { ApolloError } from "apollo-server-express";
import { ActivityModel, BooklistModel } from "../../../models/index";

export const registerAsLibrary = async (_, args) => {
  //destructuring arguments
  const {
    name,
    username,
    email,
    password,
    about = "",
    phone,
    country,
    address,
    lat,
    long,
    links,
  } = args.input;
  if (!(name && username && email && password))
    throw new ApolloError(
      "Required arguments are missing!",
      "USER_INPUT_ERROR"
    );

  const usernameRegex = new RegExp(
    "^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
  );
  if (!usernameRegex.test(username))
    throw new UserInputError("Invalid Username!", {
      username: "Invalid Username!",
    });

  let isLibrary = await LibraryModel.findOne({
    username,
  });
  if (isLibrary)
    throw new UserInputError("username taken!", {
      username: "username taken!",
    });
  isLibrary = await LibraryModel.findOne({
    email,
  });
  if (isLibrary)
    throw new UserInputError("email already in use!", {
      email: "email is already used by another account.",
    });

  try {
    const db = await DbModel.create({
      entries: [],
    });

    await db.save();

    const joinedActivity = new ActivityModel({
      what: "JOINED",
      when: new Date(),
    });

    await joinedActivity.save();
    const defaultMemberShipPlan = {
      title: "membership",
      duration: "YEARLY",
    };

    const newLibrary = await LibraryModel.create({
      name,
      username,
      password: bcrypt.hashSync(password, 10),
      about,
      members: [],
      membership_plans: [defaultMemberShipPlan],
      bookclubs: [],
      booklists: [],
      identification_method: {
        is_required: false,
      },
      requests: [],
      membership_renew_requests: [],
      db: db._id,
      location: {
        country,
        address,
        lat,
        long,
      },
      contact: {
        email,
        phone,
      },
      links,
      activity: [joinedActivity._id],
    });

    const wishlist = await BooklistModel.create({
      title: "wishlist",
      description: "wishlist for library!",
      books: [],
      createdBy: newLibrary._id,
      onModel: "Library",
      isPrivate: true,
      voters: [],
      viewers: [],
    });
    await wishlist.save();
    await newLibrary.save();
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error!");
  }
};
