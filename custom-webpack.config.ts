import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin({
      AWS_ACCESS_KEY_ID: 'defaultvalue',
      AWS_SECRET_ACCESS_KEY: 'defaultvalue'
    })
  ]
};
