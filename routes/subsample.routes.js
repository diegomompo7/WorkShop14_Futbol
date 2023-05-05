const express = require("express");

// Modelos
const { SubSample } = require("../models/SubSample.js");
const { Sample } = require("../models/Sample.js");

const router = express.Router();

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const subSamples = await SubSample.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Num total de elementos
    const totalElements = await SubSample.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: subSamples,
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
    let subSample = await SubSample.findById(id);

    if (subSample) {
      const includeParents = req.query.includeParents === "true";

      if (includeParents) {
        const parents = await Sample.find({ child: id });
        if (parents) {
          subSample = subSample.toObject();
          subSample.parents = parents;
        }
      }

      res.json(subSample);
    } else {
      res.status(404).json({});
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
    const subSample = new SubSample(req.body);
    const createdSubSample = await subSample.save();
    return res.status(201).json(createdSubSample);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const subSampleDeleted = await SubSample.findByIdAndDelete(id);
    if (subSampleDeleted) {
      res.json(subSampleDeleted);
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
    const subSampleUpdated = await SubSample.findByIdAndUpdate(id, req.body, { new: true });
    if (subSampleUpdated) {
      res.json(subSampleUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { subSampleRouter: router };
