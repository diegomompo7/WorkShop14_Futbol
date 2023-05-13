const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Team } = require("../models/Team.js");
const { Match } = require("../models/Match.js");

const createMatches = async () => {
  try {
    await connect();
    console.log("Conectado y listo para crear partidos");

    const teams = await Team.find();

    if (!teams.length) {
      console.error("Debe haber equipos en la base de datos para poder crear partidos.");
      return;
    }

    // Elimina partidos anteriores
    await Match.collection.drop();
    console.log("Borrados partidos.");

    // Crear los nuevos partidos
    const matches = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          localTeam: teams[i]._id,
          awayTeam: teams[j]._id,
          goalsLocalTeam: 0,
          goalsAwayTeam: 0,
          isPlayed: false,
          matchDate: null,
        });
        matches.push({
          localTeam: teams[j]._id,
          visitorTeam: teams[i]._id,
          goalsLocalTeam: 0,
          goalsAwayTeam: 0,
          isPlayed: false,
          matchDate: null,
        });
      }
    }

    // Guardar los nuevos partidos
    await Match.insertMany(matches);

    console.log("Partidos creados correctamente.");
  } catch (error) {
    console.status(500).json(error);
  } finally {
    mongoose.disconnect();
  }
};

createMatches();
