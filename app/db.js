/******************************************************************************
# Copyright (c) 2016-2017
# All rights reserved.
#
# Project: Calculator
# Authors: Yun Peng
# Created on: Apr 15, 2017
#
******************************************************************************/

const Sequelize = require('sequelize');

const log = require('../config/log.js');
const dbConfig = require('../config/config.js').dbConfig;

log('init sequelize...');
let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    idle: dbConfig.pool.idle
  },
  logging: function(){}
});

const ID_TYPE = Sequelize.INTEGER;

function defineModel(name, attributes) {
  let attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true,
    autoIncrement: true
  };

  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        if (obj.isNewRecord) {
          log('will create entity...' + obj + "  "  + obj.ts.toISOString());
        } else {
          log('will update entity...');
        }
      }
    }
  });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'FLOAT', 'DATE', 'DATEONLY', 'BOOLEAN', 'JSON'];

let exp = {
  ID: ID_TYPE,
  defineModel: defineModel,
  sequelize: sequelize
};

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

module.exports = exp;
