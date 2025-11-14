const universityModel = require('../model/universityModel');

exports.createUniversity = (req, res, next) => {
    const data = universityModel.create(req.body);
    res.status(201).json(data);
};

exports.getUniversities = (req, res, next) => {
    const data = universityModel.find({});
    res.status(200).json(data);
};
