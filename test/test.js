'use strict';

var expect = require('chai').expect;
var hitmap_json_to_lcov = require('../hitmap_json_to_lcov');
var result;

var validObject = {
    '/home/name/project/test.c': {
        'lines': {
            'found': 3,
            'hit': 2,
            'details': [
                {
                    "line": 1,
                    "hit": 2
                },
                {
                    "line": 2,
                    "hit": 10
                },
                {
                    "line": 3,
                    "hit": 0
                }
            ]
        },
        'functions': {
            'hit': 2,
            'found': 4,
            'details': [
                {
                    "name": "fn1",
                    "line": 1,
                    "hit": 2
                },
                {
                    "name": "fn2",
                    "line": 2,
                    "hit": 10
                },
                {
                    "name": "fn3",
                    "line": 3,
                    "hit": 0
                }
            ]
        }
    }
}

describe('#lcov_converter', function () {
    it('should send error if not object', function () {
        result = hitmap_json_to_lcov("test");
        expect(result).to.equal("ERROR: Failed to parse input object");

        result = hitmap_json_to_lcov(1);
        expect(result).to.equal("ERROR: Failed to parse input object");
    });

    it('should not send error if object', function () {
        result = hitmap_json_to_lcov({"test.c": "Test"});
        expect(result).to.not.equal("ERROR: Failed to parse input object");
    });

    it('output should be string for valid object', function () {
        result = hitmap_json_to_lcov(validObject);
        expect(result).to.be.an('string');
    });

    it('check output validity in infofile format', function () {
        result = hitmap_json_to_lcov(validObject);
        expect(result).to.have.string('SF:/home/name/project/test.c');
        expect(result).to.have.string('DA:1,2'); //check line data
        expect(result).to.have.string('FNDA:10,fn2'); //check FNDA data
        expect(result).to.have.string('FN:3,fn3'); //check FN data
        expect(result).to.have.string('FNF:4'); //check FNF data
        expect(result).to.have.string('FNH:2'); //check FNH data
        expect(result).not.to.have.string('LF:2'); //check LF data
        expect(result).to.have.string('LF:3'); //check LF data
        expect(result).to.have.string('LH:2'); //check LH data

    });

});