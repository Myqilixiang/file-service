'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

var FileOpt = function () {
    function FileOpt() {
        _classCallCheck(this, FileOpt);
    }

    _createClass(FileOpt, [{
        key: 'createFile',
        value: function createFile(path) {
            if (path.type == "file") {
                fs.writeFile(path.path, '', function (err) {
                    if (err) {
                        return err;
                    } else {
                        console.log("create file sucecss");
                        return "create file success！";
                    }
                });
            } else if (path.type == "folder") {
                fs.mkdir(path.path, function (err) {
                    if (err) {
                        return err;
                    } else {
                        console.log("create folder success");
                        return "create folder success!";
                    }
                });
            }
        }
    }, {
        key: 'rename',
        value: function rename(oldPath, newPath) {
            fs.rename(oldPath, newPath, function () {
                console.log("rename success!");
                return "rename success!";
            });
        }
    }, {
        key: 'delete',
        value: function _delete(path) {
            var _type = path.type;
            var _path = path.path;

            var emptyDir = function emptyDir(fileUrl) {
                var files = fs.readdirSync(fileUrl);
                files.forEach(function (file) {
                    var stats = fs.statSync(fileUrl + '/' + file);
                    if (stats.isDirectory()) {
                        emptyDir(fileUrl + '/' + file);
                    } else {
                        fs.unlinkSync(fileUrl + '/' + file);
                    }
                });
            };

            var rmEmptyDir = function rmEmptyDir(fileUrl) {
                var files = fs.readdirSync(fileUrl);
                if (files.length > 0) {
                    var tempFile = 0;
                    files.forEach(function (fileName) {
                        tempFile++;
                        rmEmptyDir(fileUrl + '/' + fileName);
                    });
                    if (tempFile == files.length) {
                        fs.rmdirSync(fileUrl);
                    }
                } else {
                    fs.rmdirSync(fileUrl);
                }
            };
            if (_type == "folder") {
                emptyDir(_path);
                rmEmptyDir(_path);
            } else if (_type == "file") {
                fs.unlinkSync(_path);
            }
        }
    }]);

    return FileOpt;
}();

exports.default = new FileOpt();