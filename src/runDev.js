import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

import { webpackConfig } from './webpack.config';

const devServerConfig = {
  host: 'localhost',
  port: 9093,
  compress: true,
}

const compiler = webpack(webpackConfig);

const server = new webpackDevServer(devServerConfig, compiler);

export const start = () => {
  server.start();
}