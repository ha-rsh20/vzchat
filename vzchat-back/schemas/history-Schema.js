const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  meetid: {
    type: String,
    required: true,
  },
  meetname: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  meettime: {
    type: Date,
    required: true,
  },
});

const history = mongoose.model("history", historySchema);

module.exports = history;
