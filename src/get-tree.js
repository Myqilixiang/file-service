var fs = require('fs');
class ReadDir {
    explorer(path) {
        let outputJson = [];
        let self = this;
        let files = fs.readdirSync(path);
        files.forEach((file) => {
            let dir = {};
            dir["name"] = file;
            //获取文件实例
            let stat = fs.statSync(path + '/' + file);
            if (stat.isDirectory()) {
                dir["type"] = "dir";
                if (file != "node_modules") {
                    let children = new Array();
                    dir["children"] = children;
                    // 如果是文件夹则递归
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