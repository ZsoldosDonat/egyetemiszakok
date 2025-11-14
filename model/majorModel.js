const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
    major: { type: String, required: true },

    codes: { type: [String], required: true }
});

const Major = mongoose.model('Major', majorSchema);

module.exports = Major;
