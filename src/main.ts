import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';

const additionalConfig = {
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS"
}

//configure amplify with the auto-generated config file
Amplify.configure(aws_exports);
//configure amplify with the existing Cognito User Pool
Amplify.configure(additionalConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
