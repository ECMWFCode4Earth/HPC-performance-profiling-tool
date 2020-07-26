'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('sunburst.json');
let student = JSON.parse(rawdata);
console.log(student);
