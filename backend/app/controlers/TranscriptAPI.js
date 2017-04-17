/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

const model = require('../model.js');
const constDef = require('../const.js');
const Errors = require('../catchError.js');

let PATHPREFIX = constDef.PATHPREFIX;
let url = PATHPREFIX + '/transcript';

let instance = model.User;
let exp = {};
let schema = require('../../config/table.json');

exp['GET ' + PATHPREFIX + '/schema'] = async (ctx, next) => {
  let tst = ctx.params.tst;
  try {
    ctx.rest(schema);
  } catch (err) {
    throw new Errors.APIError('GET schema API error', err, 500);
  }
};

exp['GET ' + url] = async (ctx, next) => {
  try {
    let validTime = constDef.validateTimeRange(ctx.query.start, ctx.query.end);
    ctx.rest(await instance.getByRange(validTime.start, validTime.end));
  } catch (err) {
    throw new Errors.APIError('GET transcript API error', err, 500);
  }
};

exp['GET ' + url + '/:tst'] = async (ctx, next) => {
  let tst = ctx.params.tst;
  try {
    ctx.rest(await instance.getByTranscript(tst));
  } catch (err) {
    throw new Errors.APIError('GET transcript by' + tst + 'API error', err, 500);
  }
};

exp['PUT ' + url + '/:tst'] = async (ctx, next) => {
  let tst = ctx.params.tst;
  try {
    //ctx.rest(await instance.createByObj)
  } catch (err) {
    throw new Errors.APIError('PUT transcript by' + tst + 'API error', err, 500);
  }
};

exp['DELETE ' + url + '/:tst'] = async (ctx, next) => {
  let tst = ctx.params.tst;
  try {
    ctx.rest(await instance.deleteByTranscript(tst));
  } catch (err) {
    throw new Errors.APIError('DELETE transcript by' + tst + 'API error', err, 500);
  }
};



module.exports = exp;
