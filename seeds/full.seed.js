const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Team } = require("../models/Team.js");
const { Player } = require("../models/Player.js");

let playerList = [
  {
    firstName: "Humberto",
    lastName: "Casanova",
    positionPrefer: "Lateral izquierdo",
    number: 23,
  },
  {
    firstName: "Diego",
    lastName: "Mompó",
    positionPrefer: "Medio centro",
    number: 8,
  },
  {
    firstName: "Juanito",
    lastName: "Valderrama",
    positionPrefer: "Portero",
    number: 1,
  },
  {
    firstName: "Ana",
    lastName: "Torroja",
    positionPrefer: "Delantero",
    number: 7,
  },
  {
    firstName: "Carla",
    lastName: "Mendoza",
    positionPrefer: "Lateral derecho",
    number: 2,
  },
  {
    firstName: "Gustavo",
    lastName: "Pérez",
    positionPrefer: "Medio centro defensivo",
    number: 5,
  },
  {
    firstName: "Fernando",
    lastName: "Gómez",
    positionPrefer: "Portero",
    number: 25,
  },
  {
    firstName: "Luis",
    lastName: "Ramírez",
    positionPrefer: "Delantero centro",
    number: 9,
  },
  {
    firstName: "Paula",
    lastName: "Díaz",
    positionPrefer: "Lateral izquierdo",
    number: 3,
  },
  {
    firstName: "Ricardo",
    lastName: "Márquez",
    positionPrefer: "Medio centro ofensivo",
    number: 10,
  },
  {
    firstName: "Isabel",
    lastName: "García",
    positionPrefer: "Portero",
    number: 13,
  },
  {
    firstName: "Miguel",
    lastName: "Sánchez",
    positionPrefer: "Delantero",
    number: 11,
  },
  {
    firstName: "Julia",
    lastName: "Martínez",
    positionPrefer: "Lateral derecho",
    number: 22,
  },
  {
    firstName: "Andrés",
    lastName: "González",
    positionPrefer: "Medio centro defensivo",
    number: 14,
  },
  {
    firstName: "Lucas",
    lastName: "Hernández",
    positionPrefer: "Portero",
    number: 31,
  },
  {
    firstName: "Elena",
    lastName: "Suárez",
    positionPrefer: "Delantero centro",
    number: 19,
  },
  {
    firstName: "Oscar",
    lastName: "Vargas",
    positionPrefer: "Lateral izquierdo",
    number: 16,
  },
  {
    firstName: "María",
    lastName: "Flores",
    positionPrefer: "Medio centro ofensivo",
    number: 20,
  },
  {
    firstName: "Rafael",
    lastName: "Guzmán",
    positionPrefer: "Portero",
    number: 11,
  },
  {
    firstName: "Adriana",
    lastName: "Fernández",
    positionPrefer: "Delantero",
    number: 17,
  },
];

const playerSeed = async () => {
  try {
    // CONEXION
    await connect();

    // BORRADO
    await Player.collection.drop();
    console.log("Borrados jugadores");

    // CREACION DE LOS OTROS DOCUMENTOS
    playerList = playerList.map((elem) => new Player(elem));

    await Player.insertMany(playerList);
    console.log("Creados jugadores correctamente");
  } catch (error) {
    console.error(error);
  }
};

playerSeed();

let teamList = [
  {
    name: "Valley FC",
    fundation: 2010,
    city: "Madrid",
  },
  {
    name: "La Isla CD",
    fundation: 1975,
    city: "San Fernando",
  },
  {
    name: "UD Ferrol",
    fundation: 1980,
    city: "Ferrol",
  },
  {
    name: "Pulinhos FC",
    fundation: 2016,
    city: "Cadiz",
  },
];

const teamSeed = async () => {
  try {
    // BORRADO
    await Team.collection.drop();
    console.log("Borrados equipos");

    // CREACION DE LOS OTROS DOCUMENTOS
    teamList = teamList.map((elem) => new Team(elem));

    await Team.insertMany(teamList);
    console.log("Creados equipos correctamente");
  } catch (error) {
    console.error(error);
  }
};

teamSeed();

const allReslationsSeed = async () => {
  try {
    console.log("Conectado y listo para crear relaciones");

    const players = await Player.find();
    const teams = await Team.find();

    console.log(players.length)
    console.log(teams.length)

    if (!players.length || !teams.length) {
      console.error("Debe haber equipos y jugadores en la base de datos para poder relacionarlos. Parece que fala alguno de ellos.");
      return;
    } else {
      // Relaciona aleatoriamente jugadores a equipos
      try {
        console.log("Ha entrado para asignar futbolistas y equipos")
        const playersPerTeam = Math.floor(players.length / teams.length);
        let playersAssigned = 0;

        for (let i = 0; i < teams.length; i++) {
          const team = teams[i];

          for (let j = 0; j < playersPerTeam; j++) {
            const player = players[playersAssigned];
            player.team = team.id;
            await player.save();
            playersAssigned++;
          }
        }
        console.log("Relaciones entre equipos-jugadores creadas correctamente.");
      } catch (error) {
        console.status(500).json(error);
      }
    }
  } catch (error) {
    console.status(500).json(error);
  } finally {
    mongoose.disconnect();
  }
};

allReslationsSeed();
