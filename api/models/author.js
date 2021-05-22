import mongoose from "mongoose";
const Schema = mongoose.Schema;
import _ from "lodash";

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alternate_names: [String],
    age: Number,
    books: [
      {
        type: Schema.ObjectId,
        ref: "Book",
      },
    ],
    dob: Date,
    dod: Date,
    createdBy: {
      type: Schema.ObjectId,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      enum: ["User", "Library"],
      required: true,
    },
    modification_history: {
      type: Schema.ObjectId,
      ref: "ModificationHistory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AuthorSchema.pre("save", function (next) {
  this.books = _.uniq(this.books);
  this.alternate_names = _.uniq(this.alternate_names);
  next();
});

export const AuthorModel = mongoose.model("Author", AuthorSchema);
