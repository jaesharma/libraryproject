import mongoose from "mongoose";
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  price_per_copy: Number,
  total_copies: Number,
  where: {
    rack: String,
  },
  issued_list: [
    {
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
    },
  ],
  waiting_list: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  status: {
    type: String,
    enum: ["AVAILABLE", "ISSUED", "NOT_AVAILABLE"],
    default: "AVAILABLE",
  },
  issue_history: [
    {
      type: Schema.Types.ObjectId,
      ref: "BookIssueHistory",
    },
  ],
});

export const EntryModel = mongoose.model("Entry", entrySchema);
