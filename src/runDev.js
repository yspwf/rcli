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

const stopServer = async () => {
  console.log('Stopping server...');
  await server.stop();
};

const runServer = () => {
  return new Promise((resolve, reject) => {
    console.log('Starting server...');
    server.start();
    resolve(true);
  })
};

export const start = async() => {
  await runServer();
}

export const startCi = async() => {
  if(await runServer()) {
    setTimeout(stopServer, 10000);
  }
}