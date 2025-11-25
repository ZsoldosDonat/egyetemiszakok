const majorModel = require('../model/majorModel');

exports.createMajor = (req, res, next) => {
    const data = majorModel.create(req.body);
    res.status(201).json(data);
};

exports.getMajors = (req, res, next) => {
    const data = majorModel.find({});
    res.status(200).json(data);
};

exports.getMajorById = (req, res, next) => {
    const data = majorModel.findById(req.params.id);
    res.status(200).json(data);
};

exports.updateMajor = (req, res, next) => {
    const data = majorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(data);
};

exports.deleteMajor = (req, res, next) => {
    const data = majorModel.findByIdAndDelete(req.params.id);
    res.status(204).json(data);
};