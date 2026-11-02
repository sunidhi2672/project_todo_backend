const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/mongopractice`);

const todoSchema = mongoose.Schema({
  title: {
    type: String,
  },
  complete: {
    type: Boolean,
  },
});

module.exports = mongoose.model("todo", todoSchema);
