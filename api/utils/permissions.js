import { UserInputError } from "apollo-server-express";
import getUser from "./getUser";

export const isauthedaslibrary =
  (resolver) => async (obj, args, context, info) => {
    if (!context.user || context.as.toLowerCase() !== "library") {
      throw new UserInputError("Permission denied!");
    }
    return resolver(obj, args, context, info);
  };

export const authedAsUser = async (req, res, next) => {
  if (!req.header("Authorization")) return res.sendStatus(401);
  try {
    const token = req.headers.authorization || "";
    const userInfo = await getUser(token);
    if (!userInfo) return res.sendStatus(401);
    req.user = userInfo;
    next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export const isAuthedAsUser =
  (resolver) => async (obj, args, context, info) => {
    if (!context.user || context.as.toLowerCase() !== "user") {
      throw new UserInputError("You must be signed in first!");
    }
    return resolver(obj, args, context, info);
  };

export const isAuthed = (resolver) => async (obj, args, context, info) => {
  if (!context.user) {
    return new UserInputError("You must be signed in to do this");
  }
  /*
    const user = await context.loaders.user.load(context.user.id)
  
    if (!user || user.bannedAt || user.deletedAt) {
      return new UserError('You must be signed in to do this')
    }
    */
  return resolver(obj, args, context, info);
};

export const logger = (resolver) => async (obj, args, context, info) => {
  console.log("logging...");
  return resolver(obj, args, context, info);
};
