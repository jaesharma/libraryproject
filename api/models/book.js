import mongoose from "mongoose";
import _ from "lodash";
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: [
      {
        type: String,
        required: true,
      },
    ],
    cover: {
      type: String,
    },
    audiobook: {
      type: String,
    },
    ebook: {
      type: String,
    },
    authors: [
      {
        type: Schema.ObjectId,
        ref: "Author",
      },
    ],
    publishers: [String],
    publish_date: Date,
    number_of_pages: Number,
    ids: {
      isbn_10: String,
      isbn_13: String,
      lccn: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      enum: ["User", "Library"],
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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

bookSchema.pre("save", function (next) {
  this.authors = _.uniq(this.authors);
  this.publishers = _.uniq(this.publishers);
  next();
});

module.exports = {
  BookModel: mongoose.model("Book", bookSchema),
};
