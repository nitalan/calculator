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
const util = require('util');
const winston = require('winston');

const config = require('./config.js');
const constDef = require('../app/const.js');

let logFileName = config.log
let oldName = logFileName;
logFileName = logFileName.slice(0, -4) + '_' + constDef.getCurrentTime() + '_' + '.log';

// winston.add(winston.transports.File, {
//   filename: logFileName,
//   maxsize: config.restlogSizeLimit * 1048576,
//   maxFile: config.restlogFileLimit,
//   colorize: true,
//   showLevel: false,
//   flag: 'w',
//   json: false,
//   timestamp: false,
//   tailable: true
// });
// if (process.env.NODE_ENV !== 'dev') {
//   winston.remove(winston.transports.Console);
// }
// if (fs.existsSync(oldName)) {
//   fs.unlinkSync(oldName);
// }
// fs.symlinkSync(logFileName, oldName);

module.exports = function () {
  console.log(constDef.getCurrentTime() + ': ' + util.format.apply(null, arguments));
}
