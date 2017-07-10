var fs = require('fs');
class FileOpt {
    createFile(path) {
        //创建文件
        if (path.type == "file") {
            fs.writeFile(path.path, '', function(err) {
                if (err) {
                    return err;
                } else {
                    console.log("create file sucecss")
                    return "create file success！"
                }
            })
        } else if (path.type == "folder") {
            //创建文件夹
            fs.mkdir(path.path, function(err) {
                if (err) {
                    return err;
                } else {
                    console.log("create folder success")
                    return "create folder success!";
                }
            })
        }
    };
    rename(oldPath, newPath) {
        fs.rename(oldPath, newPath, function() {
            console.log("rename success!");
            return "rename success!";
        });
    };
    delete(path) {
        let _type = path.type;
        let _path = path.path;
        //删除所有的文件(将所有文件夹置空)
        var emptyDir = function(fileUrl) {
                var files = fs.readdirSync(fileUrl); //读取该文件夹
                files.forEach(function(file) {
                    var stats = fs.statSync(fileUrl + '/' + file);
                    if (stats.isDirectory()) {
                        emptyDir(fileUrl + '/' + file);
                    } else {
                        fs.unlinkSync(fileUrl + '/' + file);
                    }
                });
            }
            //删除所有的空文件夹
        var rmEmptyDir = function(fileUrl) {
            var files = fs.readdirSync(fileUrl);
            if (files.length > 0) {
                var tempFile = 0;
                files.forEach(function(fileName) {
                    tempFile++;
                    rmEmptyDir(fileUrl + '/' + fileName);
                });
                if (tempFile == files.length) { //删除母文件夹下的所有字空文件夹后，将母文件夹也删除
                    fs.rmdirSync(fileUrl);
                }
            } else {
                fs.rmdirSync(fileUrl);
            }
        }
        if (_type == "folder") {
            emptyDir(_path);
            rmEmptyDir(_path);
        } else if (_type == "file") {
            fs.unlinkSync(_path);
        }
    }
}
export default new FileOpt();