const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema jugador
const playerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    positionPrefer : {
      type: String,
      required: true,
    },
    number : {
      type: Number,
      required: true,
    },
    team : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    }
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema, "players");
module.exports = { Player };
