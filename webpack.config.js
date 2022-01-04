const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

// const smp = new SpeedMeasurePlugin();

module.exports = (env) => {
  // const finalResult = env.production ? prodConfig : devConfig;
  // console.log('final---->', finalResult)
  // return smp.wrap(finalResult);
  return env.production ? prodConfig : devConfig;
};
