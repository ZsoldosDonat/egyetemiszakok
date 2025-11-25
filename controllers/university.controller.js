const universityModel = require('../model/universityModel');

exports.createUniversity = (req, res, next) => {
    const data = universityModel.create(req.body);
    res.status(201).json(data);
};

exports.getUniversities = (req, res, next) => {
    const data = universityModel.find({});
    res.status(200).json(data);
};

exports.getUniversityByCode = (req, res, next) => {
    const data = universityModel.findOne({ code: req.params.code });
    res.status(200).json(data);
};

exports.updateUniversity = (req, res, next) => {
    const data = universityModel.findOneAndUpdate({ code: req.params.code }, req.body, { new: true });
    res.status(200).json(data);
};

exports.deleteUniversity = (req, res, next) => {
    const data = universityModel.findOneAndDelete({ code: req.params.code });
    res.status(204).json(data);
};
