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

module.exports = router;