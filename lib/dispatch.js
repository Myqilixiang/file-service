'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dispatch;

var _fileOption = require('./file-option');

var _fileOption2 = _interopRequireDefault(_fileOption);

var _getTree = require('./get-tree');

var _getTree2 = _interopRequireDefault(_getTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dispatch(req) {
    switch (req.opt) {
        case "init":
            return _getTree2.default.explorer(req.data.path);
        case "create":
            return _fileOption2.default.createFile(req.data);
        case "rename":
            return _fileOption2.default.rename(req.data.type, req.data.path);
        case "delete":
            return _fileOption2.default.delete(req.data);
    }
}