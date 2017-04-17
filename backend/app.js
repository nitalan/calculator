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
const cors = require('koa-cors');
const fs = require('fs');

const config = require('./config/config.js');
const log = require('./config/log.js');

const controller = require('./app/controller.js');
const rest = require('./app/rest.js');

const app = new Koa();

app.use(async (ctx, next) => {
  log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(bodyParser());
app.use(cors());
app.use(rest.restify());
app.use(controller());


app.on('error', err => {
  log('server error');
});

app.listen(config.port);
log('app started at port: ' + config.port);
