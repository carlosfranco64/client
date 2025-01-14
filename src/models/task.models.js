const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      requires: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    statusTask: {
      type: Boolean,
      default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'

    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
