/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');

const config = require('./config/config.js');
const log = require('./config/log.js');
const rest = require('./app/rest.js');

const app = new Koa();

app.use(async (ctx, next) => {
  log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(bodyParser());
app.use(rest.restify());

app.on('error', err => {
  log('server error', );
});

app.listen(config.glivePort);
log('app started at port: ' + config.glivePort);
