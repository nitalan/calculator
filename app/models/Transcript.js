/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

const db = require('../db.js');
const dbCatch = require('../catchError.js').dbCatch;
const constDef = require('../const.js');

let modelName = 'User';
let model = db.defineModel(modelName, {
  ts: db.DATE(3),
  username: db.STRING(100),
  transcript: db.STRING(100),
  data: db.JSON,
  score: db.INTEGER
});

let exp = {};
let tableObj = require('../../config/tableObj.json');

exp.getByRange = async (start, end) => {
  return await dbCatch(model.findAll({
    where: {
      ts: {
        $gte: start,
        $lte: end,
      }
    }
  }), modelName, 'getByRange');
};

exp.getByTranscript = async (transcript) => {
  return await dbCatch(model.findAll({
    where: {
      transcript: transcript
    }
  }), modelName, 'getByTranscript');
};

exp.deleteByTranscript = async (transcript) => {
  return await dbCatch(model.destory({
    where: {
      transcript: transcript
    }
  }), modelName, 'deleteByTranscript');
}

exp.createByObj = constDef.createByObj(model, modelName);
exp.deleteForClear = constDef.deleteForClear(model, modelName);

exp.generateFakeData = async (count) => {
  let fakeData = [];
  for (let i = 0; i < count; i++) {
    let dataObj = require('../../config/tableObj.json');
    fakeData.push((await dbCatch(exp.createByObj({
      ts: + (Date.now()) + Math.floor(Math.random() * 360),
      username: "py",
      transcript: Math.floor(Math.random() * 10000)，
      data: fakeObj(dataObj);
    }), modelName, 'generateFakeData')).toJSON());
  }
  return fakeData;
};

module.exports = exp;
