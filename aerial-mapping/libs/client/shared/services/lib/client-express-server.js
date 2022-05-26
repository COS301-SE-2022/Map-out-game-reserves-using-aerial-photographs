import express from 'express';
import { generateUploadURL } from './s3.js';
import cors from 'cors';

const app = express()
const port = 4201

//Allows a request to be made from port 4200 to port 4201. Although it should probably be changed
//to only allow requests from the same domain.
app.use(cors({
  origin: '*'
}))

app.get('/', async (req,res)=> {
  const url = await generateUploadURL();
  res.send({url});
  console.log(url);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
