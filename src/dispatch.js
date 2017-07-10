import FileOpt from './file-option';
import readDir from './get-tree';
export default function dispatch(req) {
    switch (req.opt) {
        case "init":
            // 读取文件树
            return readDir.explorer(req.data.path);
        case "create":
            // 创建文件或文件夹
            return FileOpt.createFile(req.data);
        case "rename":
            //重命名文件
            return FileOpt.rename(req.data.type, req.data.path);
        case "delete":
            //删除文件
            return FileOpt.delete(req.data);
    }
}