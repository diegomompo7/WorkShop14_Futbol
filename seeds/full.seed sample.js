const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Sample } = require("../models/Sample.js");
const { SubSample } = require("../models/SubSample.js");

let subSampleList = [
  {
    name: "Alex",
    number: 13,
  },
  {
    name: "Dani",
    number: 69,
  },
];

let sampleList = [
  {
    title: "Test Alex",
    subtitle: "Test 2",
  },
  {
    title: "Test Dani",
    subtitle: "Another subtitle",
  },
];

const sampleSeed = async () => {
  try {
    // CONEXION
    const database = await connect();

    // BORRADO
    await Sample.collection.drop();
    await SubSample.collection.drop();
    console.log("Borrados samples y subsamples");

    // CREACION DOCUMENTOS
    subSampleList = subSampleList.map((elem) => new SubSample(elem));

    // RELACIONES
    sampleList[0].child = subSampleList[0]._id;
    sampleList[1].child = subSampleList[1]._id;

    // CREACION DE LOS OTROS DOCUMENTOS
    sampleList = sampleList.map((elem) => new Sample(elem));

    await SubSample.insertMany(subSampleList);
    await Sample.insertMany(sampleList);
    console.log("Creados samples correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

sampleSeed();
