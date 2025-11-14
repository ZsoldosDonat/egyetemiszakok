const httpMocks = require('node-mocks-http');
const majorModel = require('../../model/majorModel');
const universityModel = require('../../model/universityModel');
const majorController = require('../../controllers/major.controller');
const universityController = require('../../controllers/university.controller');

jest.mock('../../model/majorModel');
jest.mock('../../model/universityModel');

const newMajor = require('../mock-data/major.json');
const newUniversity = require('../mock-data/university.json');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    req.body = newMajor;
});


// MAJOR POST
describe('MajorController.createMajor', () => {
    it('Should have a createMajor function', () => {
        expect(typeof majorController.createMajor).toBe('function');
    });
    it('Should call majorModel.create', () => {
        majorController.createMajor(req, res, next);
        expect(majorModel.create).toHaveBeenCalledWith(newMajor);
    });
    it('Should return 201 response code', () => {
        majorController.createMajor(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('Should return json response', () => {
        majorModel.create.mockReturnValue(newMajor);
        majorController.createMajor(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newMajor);
    });
});
// MAJOR GET
describe('MajorController.getMajors', () => {
    it('Should have a getMajors function', () => {
        expect(typeof majorController.getMajors).toBe('function');
    });
    it('Should call majorModel.find', () => {
        majorController.getMajors(req, res, next);
        expect(majorModel.find).toHaveBeenCalledWith({});
    });
    it('Should return 200 response code', () => {
        majorController.getMajors(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('Should return json response', () => {
        majorModel.find.mockReturnValue([newMajor]);
        majorController.getMajors(req, res, next);
        expect(res._getJSONData()).toStrictEqual([newMajor]);
    });
});

// MAJOR GET BY ID
describe('MajorController.getMajorById', () => {
    it('Should have a getMajorById function', () => {
        expect(typeof majorController.getMajorById).toBe('function');
    });
    it('Should call majorModel.findById', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        majorController.getMajorById(req, res, next);
        expect(majorModel.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });
    it('Should return 200 response code', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        majorController.getMajorById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('Should return json response', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        majorModel.findById.mockReturnValue(newMajor);
        majorController.getMajorById(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newMajor);
    });
});

// MAJOR UPDATE
describe('MajorController.updateMajor', () => {
    it('Should have a updateMajor function', () => {
        expect(typeof majorController.updateMajor).toBe('function');
    });
    it('Should call majorModel.findByIdAndUpdate', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        req.body = { name: 'Updated Major' };
        majorController.updateMajor(req, res, next);
        expect(majorModel.findByIdAndUpdate).toHaveBeenCalledWith('507f1f77bcf86cd799439011', { name: 'Updated Major' }, { new: true });
    });
    it('Should return 200 response code', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        majorController.updateMajor(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('Should return json response', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        const updatedMajor = { ...newMajor, name: 'Updated Major' };
        majorModel.findByIdAndUpdate.mockReturnValue(updatedMajor);
        majorController.updateMajor(req, res, next);
        expect(res._getJSONData()).toStrictEqual(updatedMajor);
    });
});

// MAJOR DELETE
describe('MajorController.deleteMajor', () => {
    it('Should have a deleteMajor function', () => {
        expect(typeof majorController.deleteMajor).toBe('function');
    });
    it('Should call majorModel.findByIdAndDelete', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        majorController.deleteMajor(req, res, next);
        expect(majorModel.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });
    it('Should return 200 response code', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        majorController.deleteMajor(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('Should return json response', () => {
        req.params.id = '507f1f77bcf86cd799439011';
        majorModel.findByIdAndDelete.mockReturnValue(newMajor);
        majorController.deleteMajor(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newMajor);
    });
});

