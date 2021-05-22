import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    title: {
      type: String,
    },
    review: {
      type: String,
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model("Review", reviewSchema);
