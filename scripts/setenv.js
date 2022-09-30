/*
* This file is run automatically upon build.
* This file generates the environment variables in the environment.ts file
*/

const { writeFile } = require('fs');
const { argv, env } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
let environmentFileContent = "";

if(!process.env.CODECOV_TOKEN) {
  console.log('CODECOV_TOKEN also not found in environment variables');
}
else {
  console.log('CODECOV_TOKEN found in env variable!');
}

if(!process.env.ACCESS_KEY_ID || !process.env.SECRET_ACCESS_KEY) {
  if(!env.ACCESS_KEY_ID || !env.SECRET_ACCESS_KEY){
    console.error('All the required environment variables were not provided.');
    process.exit(-1);
  }
  environmentFileContent = `export const environment = {
    production: ${isProduction},
    AWS_ACCESS_KEY_ID: '${env.ACCESS_KEY_ID}',
    AWS_SECRET_ACCESS_KEY: '${env.SECRET_ACCESS_KEY}'
  };
  `;
}

environmentFileContent = `export const environment = {
  production: ${isProduction},
  AWS_ACCESS_KEY_ID: '${process.env.ACCESS_KEY_ID}',
  AWS_SECRET_ACCESS_KEY: '${process.env.SECRET_ACCESS_KEY}'
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
  }
);
