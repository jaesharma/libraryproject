import { isAuthed as requireAuth } from "../../../utils/permissions";

export const logout = requireAuth(async (_parent, _args, { user, token }) => {
  try {
    const tokens = user.tokens.filter((storedToken) => storedToken !== token);
    await user.updateOne({ tokens });
    return "loggedOut";
  } catch (e) {
    throw new Error("Internal Server Error");
  }
});

export const logoutFromAll = requireAuth(async (_parent, _args, { user }) => {
  try {
    await user.updateOne({ tokens: [] });
    return "loggedOut";
  } catch (err) {
    throw new Error("Internal Server Error!");
  }
});
