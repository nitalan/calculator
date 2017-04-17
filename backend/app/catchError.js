/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

let exp = {};

function APIError(message, err, code) {
  this.message = message;
  this.err = err;
  this.code = code;
};

exp.APIError = APIError;

exp.dbCatch = async (promise, modelName, funcName) => {
  try {
    return await promise;
  } catch (err) {
    if (err instanceof APIError) {
      throw err;
    } else {
      throw new APIError('database operation ' + modelName + ' excute ' + funcName + ' error', err, 500);
    }
  }
};

module.exports = exp;
