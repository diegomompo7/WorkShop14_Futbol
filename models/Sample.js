const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SubSample } = require("./SubSample.js");

const sampleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    child: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: SubSample,
    },
  },
  {
    timestamps: true,
  }
);

const Sample = mongoose.model("Sample", sampleSchema);
module.exports = { Sample };
