'use strict';

/**
 * Converts JSON to LCOV. The Format of JSON is in README file
 * @param {hitmaps} JSON Object
 * @return {infofile data} string
 */

module.exports = function (hitmaps) {
    var records = [];

    if (typeof(hitmaps) != "object") return ("ERROR: Failed to parse input object");

    for (var filename in hitmaps) {
        if (!hitmaps.hasOwnProperty(filename)) continue;
        records.push("SF:" + filename);
        var file_hitmaps = hitmaps[filename];

        var line_data = file_hitmaps.lines;
        var function_data = file_hitmaps.functions;

        if (!line_data && !function_data) continue;

        var line_maps = line_data.details;
        var function_maps = function_data.details;

        var i;
        for (i = 0; i < function_maps.length; i++) {
            records.push("FN:" + function_maps[i].line + "," + function_maps[i].name);
        }
        for (i = 0; i < function_maps.length; i++) {
            records.push("FNDA:" + function_maps[i].hit + "," + function_maps[i].name);
        }
        records.push('FNF:' + function_data.found);
        records.push('FNH:' + function_data.hit);
        for (i = 0; i < line_maps.length; i++) {
            records.push("DA:" + line_maps[i].line + "," + line_maps[i].hit);
        }
        records.push('LF:' + line_data.found);
        records.push('LH:' + line_data.hit);
    }
    if (records.length > 0) records.push('end_of_record');
    return records.join('\n');
};