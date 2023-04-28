const express = require("express");

// Modelos
const { Sample } = require("../models/Sample.js");

const router = express.Router();

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const samples = await Sample.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Num total de elementos
    const totalElements = await Sample.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: samples,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: READ
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sample = await Sample.findById(id);
    if (sample) {
      res.json(sample);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/title/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const sample = await Sample.find({ title: new RegExp("^" + title.toLowerCase(), "i") });
    if (sample?.length) {
      res.json(sample);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: CREATE
router.post("/", async (req, res) => {
  console.log(req.headers);

  try {
    const sample = new Sample({
      title: req.body.title,
      subtitle: req.body.subtitle,
    });

    const createdSample = await sample.save();
    return res.status(201).json(createdSample);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sampleDeleted = await Sample.findByIdAndDelete(id);
    if (sampleDeleted) {
      res.json(sampleDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: UPDATE
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sampleUpdated = await Sample.findByIdAndUpdate(id, req.body, { new: true });
    if (sampleUpdated) {
      res.json(sampleUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { sampleRouter: router };
