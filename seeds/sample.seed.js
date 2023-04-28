const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Sample } = require("../models/Sample.js");
const { faker } = require("@faker-js/faker");

const sampleList = [];

for (let i = 0; i < 50; i++) {
  const sample = new Sample({
    title: faker.name.firstName(),
    subtitle: faker.lorem.words(5),
  });

  sampleList.push(sample);
}

console.log(sampleList);

const sampleSeed = async () => {
  try {
    const database = await connect();
    await Sample.collection.drop();
    console.log("Borrados samples");
    await Sample.insertMany(sampleList);
    console.log("Creados samples correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

sampleSeed();
