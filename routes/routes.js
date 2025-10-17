const express = require('express');
const majorModel = require('../model/majorModel');
const universityModel = require('../model/universityModel');
const router = express.Router();

//list all universities
router.get('/universities', async (req, res) => {
    try {
        const data = await universityModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//list all majors
router.get('/majors', async (req, res) => {
    try {
        const data = await majorModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//add a new university
router.post('/universities', async (req, res) => {
    const university = new universityModel({
        name: req.body.name,
        code: req.body.code,
    });

    try {
        const savedUniversity = await university.save();
        res.status(201).json(savedUniversity);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//add a new major
router.post('/majors', async (req, res) => {
    const major = new majorModel({
        name: req.body.name,
        code: req.body.code,
    });

    try {
        const savedMajor = await major.save();
        res.status(201).json(savedMajor);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;