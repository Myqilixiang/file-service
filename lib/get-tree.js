'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

var ReadDir = function () {
    function ReadDir() {
        _classCallCheck(this, ReadDir);
    }

    _createClass(ReadDir, [{
        key: 'explorer',
        value: function explorer(path) {
            var outputJson = [];
            var self = this;
            var files = fs.readdirSync(path);
            files.forEach(function (file) {
                var dir = {};
                dir["name"] = file;
                var stat = fs.statSync(path + '/' + file);
                if (stat.isDirectory()) {
                    dir["type"] = "dir";
                    if (file != "node_modules") {
                        var children = new Array();
                        dir["children"] = children;
                        dir.children = self.explorer(path + '/' + file);
                    }
                } else if (stat.isFile()) {
                    dir["type"] = "file";
                }
                outputJson.push(dir);
            });
            return outputJson;
        }
    }]);

    return ReadDir;
}();

;
exports.default = new ReadDir();