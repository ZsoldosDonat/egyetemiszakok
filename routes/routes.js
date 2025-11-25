const express = require('express');
const majorModel = require('../model/majorModel');
const universityModel = require('../model/universityModel');
const router = express.Router();


//list all universities
router.get('/universities', async (req, res) => {
    try {
        const data = await universityModel.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//get a university by code
router.get('/universities/:code', async (req, res) => {
    try {
        const code = req.params.code;
        console.log('Searching for university with code:', code);
        
        // Try case-insensitive search
        const university = await universityModel.findOne({ 
            code: { $regex: new RegExp(`^${code}$`, 'i') } 
        });
        
        if (!university) {
            console.log('University not found');
            return res.status(404).json({ message: 'University not found' });
        }
        
        console.log('Found university:', university);
        res.status(200).json(university);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

//list all majors
router.get('/majors', async (req, res) => {
    try {
        const data = await majorModel.find();
        res.json(data)
        res.status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//get a major by id
router.get('/majors/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const major = await majorModel.findById(id);
        
        if (!major) {
            return res.status(404).json({ message: 'Major not found' });
        }
        
        res.status(200).json(major);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//add a new university
router.post('/universities', async (req, res) => {
    try {
        if (!req.body || !req.body.name || !req.body.code) {
            return res.status(400).json({ 
                message: 'Missing required fields: name and code are required',
                receivedBody: req.body 
            });
        }

        const university = new universityModel({
            name: req.body.name,
            code: req.body.code,
        });

        const savedUniversity = await university.save();
        res.status(201).json(savedUniversity);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//add a new major
router.post('/majors', async (req, res) => {
    try {
        if (!req.body || !req.body.major || !req.body.codes) {
            return res.status(400).json({ 
                message: 'Missing required fields: major and codes are required',
                receivedBody: req.body 
            });
        }

        const major = new majorModel({
            major: req.body.major,
            codes: req.body.codes,
        });

        const savedMajor = await major.save();
        res.status(201).json(savedMajor);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//update a university by code
router.patch('/universities/:code', async (req, res) => {
    try {
        const code = req.params.code;
        const updatedData = req.body;
        const options = { new: true };

        const result = await universityModel.findOneAndUpdate(
            { code: { $regex: new RegExp(`^${code}$`, 'i') } }, 
            updatedData, 
            options
        );

        if (!result) {
            return res.status(404).json({ message: 'University not found' });
        }

        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//update a major by id
router.patch('/majors/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await majorModel.findByIdAndUpdate(
            id, 
            updatedData, 
            options
        );

        if (!result) {
            return res.status(404).json({ message: 'Major not found' });
        }

        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete a university by code
router.delete('/universities/:code', async (req, res) => {
    try {
        const code = req.params.code;
        const result = await universityModel.findOneAndDelete({ 
            code: { $regex: new RegExp(`^${code}$`, 'i') } 
        });

        if (!result) {
            return res.status(404).json({ message: 'University not found' });
        }

        res.status(204).json({ message: 'University deleted successfully', data: result });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete a major by id
router.delete('/majors/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await majorModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Major not found' });
        }

        res.status(204).json({ message: 'Major deleted successfully', data: result });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;