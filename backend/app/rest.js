/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

const constDef = require('./const.js');
const log = require('../config/log.js');

let PATHPREFIX = constDef.PATHPREFIX;
let exp = {};

function handleErrorMsg(err) {
  if (err.err === undefined) {
    return typeof err === 'object' ? JSON.stringify(err) : String(err);
  } else {
    return err.message + '--->' + handleErrorMsg(err.err);
  }
}

exp.restify = () => {
  return async (ctx, next) => {
    if (ctx.request.path.startsWith(PATHPREFIX)) {
      log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
      ctx.rest = (data) => {
        ctx.response.type = 'application/json';
        ctx.response.body = {
          error: false,
          message: '',
          result: data
        }
        //ctx.response.header['Access-Control-Allow-Origin'] ='*';
        //ctx.response.header['Access-Control-Allow-Headers'] ='Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With';
        //ctx.response.header['Access-Control-Allow-Methods'] ='GET, PUT, POST, DELETE';
      }
      try {
        await next();
      } catch (err) {
        log('Process API error...');
        log(JSON.stringify(err));
        ctx.response.type = 'application/json';
        ctx.response.status = err.code || 400;
        ctx.response.body = {
          error: true,
          message: handleErrorMsg(err) || "Process API error",
          result: err.data
        };
      }
    } else {
      await next();
      ctx.response.type = 'application/json';
      ctx.response.status = 404;
      ctx.response.body = {
        error: true,
        message: 'Url not found',
        result: {}
      };
    }
  };
}

module.exports = exp;
