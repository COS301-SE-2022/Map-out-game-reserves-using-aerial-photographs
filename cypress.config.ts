import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    'baseUrl': 'http://localhost:4200',
  },
  "env": {
    "VALID_USERNAME": process.env.VALID_USERNAME,
    "VALID_PASSWORD": process.env.VALID_PASSWORD,
    "ACCESS_KEY_ID": process.env.ACCESS_KEY_ID,
    "SECRET_ACCESS_KEY": process.env.SECRET_ACCESS_KEY,
    "ONBOARDING_API_KEY": process.env.ONBOARDING_API_KEY
  }
})
