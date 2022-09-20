import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    'baseUrl': 'http://localhost:4200',
  },
  "env": {
    "VALID_USERNAME": process.env.VALID_USERNAME,
    "VALID_PASSWORD": process.env.VALID_PASSWORD
  }
})
