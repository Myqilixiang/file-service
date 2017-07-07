// 引入模块
var fs = require('fs');
var express = require('express');
var app = express();
var util = require('util');
var path = 'F:/Program Files/csd开发/IDE/ide/service/test';
import readDir from './get-tree';
app.listen(1334, "127.0.0.1");
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "text/plain;charset=utf-8");
    next();
});

// 1.0 处理请求
// 1.1 请求文件
app.post('*', function(req, res) {
    let result;
    req.on('data', function(data) {
        result = readDir.explorer(data.toString());
        res.send(result);
        res.end();
    });
})


console.log("listen ......");