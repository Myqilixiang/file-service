'use strict';

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var express = require('express');
var app = express();
var util = require('util');
var path = 'F:/Program Files/csd开发/IDE/ide/service/test';

app.listen(1334, "127.0.0.1");
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "text/plain;charset=utf-8");
    next();
});

app.post('*', function (req, res) {
    var result = void 0;
    req.on('data', function (data) {
        var _data = JSON.parse(data.toString());

        result = (0, _dispatch2.default)(_data);
        res.send(result);
        res.end();
    });
});

console.log("listen ......");