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
