var fs = require('fs');
class ReadDir {
    explorer(path) {
        let outputJson = [];
        let self = this;
        let files = fs.readdirSync(path);
        files.forEach((file) => {
            let dir = {};
            dir["name"] = file;
            let stat = fs.statSync(path + '/' + file);
            if (stat.isDirectory()) {
                dir["type"] = "dir";
                if (file != "node_modules") {
                    let children = new Array();
                    dir["children"] = children;
                    dir.children = self.explorer(path + '/' + file);
                }
            } else if (stat.isFile()) {
                dir["type"] = "file";
            }
            outputJson.push(dir);
        })
        return outputJson;
    }
};
export default new ReadDir();
//异步加回调方式的实现
// fs.readdir(path, function(err, files) {
//     //err 为错误 , files 文件名列表包含文件夹与文件
//     if (err) {
//         console.log('error:\n' + err);
//         return;
//     }
//     await files.forEach(function(file) {
//         let dir = {};
//         dir["path"] = file;
//         fs.stat(path + '/' + file, function(err, stat) {
//             if (err) { console.log(err); return; }
//             if (stat.isDirectory()) {
//                 dir["dir"] = "folder";
//                 outputJson.push(dir);
//                 // 如果是文件夹遍历
//                 explorer(path + '/' + file).then(dir["children"]=subOutputJson)
//             } else {
//                 // 读出所有的文件
//                 dir["dir"] = "file";
//                 outputJson.push(dir);
//             }
//         });
//     });
// });

// console.log(outputJson)