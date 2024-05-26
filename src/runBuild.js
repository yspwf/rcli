import webpack from 'webpack';
import { webpackConfig } from './webpack.config';

export const build = () => {
  webpack(webpackConfig, (error) => {
    if(error){
      throw new Error(error)
    }
  });
} 

