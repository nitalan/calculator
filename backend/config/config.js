/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

const defaultConfig = './configDefault.json';
const yaml = require('js-yaml');
const fs = require('fs');

let config = {
  log: __dirname + '/app.log';
};

config = Object.assign(config, require(defaultConfig));


module.exports = config;
