const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modificationHistorySchema = new Schema({
  history: [
    {
      date: {
        type: Date,
        required: true,
      },
      modifier: {
        type: Schema.Types.ObjectId,
        onModel: "onModel",
        required: true,
      },
      onModel: {
        type: String,
        enum: ["User", "Library"],
        required: true,
      },
    },
  ],
});

module.exports = {
  ModificationHistoryModel: mongoose.model(
    "ModificationHistory",
    modificationHistorySchema
  ),
};
