const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subSampleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubSample = mongoose.model("SubSample", subSampleSchema, "testsubsample");
module.exports = { SubSample };
