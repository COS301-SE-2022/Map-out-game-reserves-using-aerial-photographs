import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin({
      ACCESS_KEY_ID: 'defaultvalue',
      SECRET_ACCESS_KEY: 'defaultvalue',
      VALID_USERNAME: 'defaultvalue',
      VALID_PASSWORD: 'defaultvalue'
    })
  ]
};
