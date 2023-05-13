const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    localTeam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Teams",
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Teams",
    },
    goalsLocalTeam: {
      type: Number,
      required: true,
    },
    goalsAwayTeam: {
      type: Number,
      required: true,
    },
    isPlayed: {
      type: Boolean,
      required: true,
    },
    matchDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema, "matches");
module.exports = { Match };
