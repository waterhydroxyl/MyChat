const path = require('path'); // webpack内置模块

const appRoot = process.cwd(); // 命令行运行的根目录

const resolveApp = (resolvePath) => {
  return path.resolve(appRoot, resolvePath); // 获取指定目录的完整绝对路径
};

module.exports = resolveApp;
