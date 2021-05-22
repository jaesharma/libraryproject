import jwt from "jsonwebtoken";
import _ from "lodash";
import { UserModel, LibraryModel, StaffMemberModel } from "../models/index";

const getUser = async (token) => {
  if (!token) return null;
  const tokenValue = token.replace("Bearer ", "");
  let user;
  try {
    const userInfo = jwt.verify(tokenValue, process.env.JWT_SECRET);
    if (userInfo.as.toLowerCase() === "user") {
      user = await UserModel.findById(userInfo.uid);
    }
    if (userInfo._id.toLowerCase() === "library") {
      user = await LibraryModel.findById(userInfo.lid);
    }
    if (userInfo._id.toLowerCase() === "staff") {
      user = await StaffMemberModel.findById(userInfo.sid);
    }
    if (!_.includes(user.tokens, tokenValue)) {
      throw new Error();
    }
    userInfo.user = user;
    userInfo.token = tokenValue;
    return userInfo;
  } catch (err) {
    console.log("[Error log: getUser]", err);
    return null;
  }
};

export default getUser;
