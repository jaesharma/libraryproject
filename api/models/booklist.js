import mongoose from "mongoose";
import _ from "lodash";
const Schema = mongoose.Schema;

const booklistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: String,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
      required: true,
    },
    onModel: {
      type: String,
      enum: ["User", "Library"],
      default: "User",
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    voters: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    viewers: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
booklistSchema.index({ title: "text" });

booklistSchema.pre("save", function (next) {
  this.voters = _.uniq(this.voters);
  this.viewers = _.uniq(this.viewers);
  this.books = _.uniq(this.books);
  next();
});

module.exports = {
  BooklistModel: mongoose.model("Booklist", booklistSchema),
};
