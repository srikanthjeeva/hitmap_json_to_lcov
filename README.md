JSON to LCOV Converter
======================

A small library that converts JSON to LCOV. I have used [lcov-parse](https://github.com/davglass/lcov-parse) to convert infofile to JSON.
- This module is for converting JSON back to infofile.
- I have made 1 slight modification in the json object compared to lcov-parse. I have used filename as keys to input object.


## Installation

  `npm install hitmap_json_to_lcov`

## JSON object format should match the below object

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

## Usage

    var hitmap_json_to_lcov = require('hitmap_json_to_lcov');

    var result = hitmap_json_to_lcov(validObject);
  
  
    Output should be `
    SF:/home/name/project/test.c
    FN:1,fn1
    FN:2,fn2
    FN:3,fn3
    FNDA:2,fn1
    FNDA:10,fn2
    FNDA:0,fn3
    FNF:4
    FNH:2
    DA:1,2
    DA:2,10
    DA:3,0
    LF:3
    LH:2
    end_of_record
    `

## Tests

  `npm test`

## To report bugs, changes, modifications

https://github.com/srikanthjeeva/hitmap_json_to_lcov/issues

## License

MIT