import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookIssueHistorySchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  when: {
    type: Date,
    required: true,
  },
  till: {
    type: Date,
    required: true,
  },
  returned: {
    type: Date,
  },
  fine_collected: {
    type: Number,
    default: 0,
  },
});

export const BookIssueHistoryModel = mongoose.model(
  "BookIssueHistory",
  bookIssueHistorySchema
);
