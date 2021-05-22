import { queryType } from "./queryType";
import { mutationType } from "./mutationType";
import { inputs } from "./inputs/index";
import { types } from "./types/index";
import { unions } from "./unions";

const typeDefs = [unions, queryType, mutationType, ...inputs, ...types];

module.exports = {
  typeDefs,
};
