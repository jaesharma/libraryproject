import authMutations from "./auth/index";
import libraryMutations from "./library/index";

export default {
  ...authMutations,
  ...libraryMutations,
};
