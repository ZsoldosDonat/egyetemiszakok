const majorModel = require('../model/majorModel');

exports.createMajor = (req, res, next) => {
    const data = majorModel.create(req.body);
    res.status(201).json(data);
};

exports.getMajors = (req, res, next) => {
    const data = majorModel.find({});
    res.status(200).json(data);
};