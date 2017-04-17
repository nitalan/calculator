/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

const moment = require('moment');
const Errors = require('./catchError.js');

let exp = {};

exp.PATHPREFIX = '/api';
exp.LONGLONG_AGO = '1994-01-01T01:01:01.111Z';
exp.LONGLONG_LATER = '2050-02-02T02:02:02.222Z';

exp.validateTimeRange = (start, end) => {
  start = start !== undefined ? start : exp.LONGLONG_AGO;
  end = end !== undefined ? end : exp.LONGLONG_LATER;
  if (!moment(start, 'YYYY-MM-DDTHH:mm:SS.sssZ', true).isValid() ||
      !moment(end, 'YYYY-MM-DDTHH:mm:SS.sssZ', true).isValid()) {
    throw new Errors.APIError('Invalid request parameters time range', {}, 400);
  }
  return { start: start, end: end };
};

exp.getCurrentTime = () => {
  return moment(new Date(Date.now())).format().substring(0, 19);
};

exp.createByObj = (model, modelName) => {
  return async (obj) => {
    let res = await Errors.dbCatch(model.findOrCreate({
      where: obj,
      defaults: obj
    }), modelName, 'createByObj');
    return res[1] ? res[0] : '';
  };
}

exp.deleteForClear = (model, modelName) => {
  return async (threshold, count) => {
    let total = await Errors.dbCatch(model.count(), modelName, 'getTotalCount');
    if (total <= threshold) return [];
    let minId = parseInt(await Errors.dbCatch(model.min('id'), modelName, 'getMinId'));
    return await Errors.dbCatch(model.destroy({
      where: {
        id: {
          $lt: minId + count,   // return id < minId + count
        }
      }
    }), modelName, 'deleteForClear');
  };
}

exp.fakeObj = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      exp.fakeObj(obj[key])
    } else {
      obj[key] = Math.floor(Math.random() * 20);
    }
  }
}

module.exports = exp;
