import { authorType } from "./authorType";
import { bookType } from "./bookType";
import { booklistType } from "./booklistType";
import { entryType } from "./entryType";
import { libraryType } from "./libraryType";
import { linksType } from "./linksType";
import { modificationHistoryType } from "./modificationHistoryType";
import { preferencesType } from "./preferencesType";
import { reviewType } from "./reviewType";
import { staffMemberType } from "./staffMemberType";
import { userType } from "./userType";

import { loginResponseType } from "./loginResponseType";
import { addStaffResponseType } from "./addStaffResponseType";

const types = [
  authorType,
  bookType,
  booklistType,
  entryType,
  libraryType,
  linksType,
  modificationHistoryType,
  preferencesType,
  reviewType,
  staffMemberType,
  userType,
  loginResponseType,
  addStaffResponseType,
];

module.exports = { types };
