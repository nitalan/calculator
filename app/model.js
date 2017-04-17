/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

const fs = require('fs');
const log = require('../config/log.js');

let exp = {};

let allModels = ['transcript.js'];
let folder = __dirname + '/models/';

fs.readdirSync(folder).filter((f) => {
  return (f in allModels);
}).forEach((f) => {
  log(`import model from file ${f}...`);
  let name = f.substring(0, f.length - 3);
  exp[name] = require(folder + f);
})

module.exports = exp;
