import express from 'express';
import dotenv from 'dotenv';
import userrouter from './router/userrouter.js';
import { connectdatabase } from './config/mongoose.js'; 
import blogrouter from './router/blogrouter.js';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';
import adminrouter from './router/adminroute.js';

const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config();

const server = express();
server.use(cors()); 

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.send('Welcome to Blog');
    
  });
  const staticImagePath = path.join(__dirname, 'uploads');
  server.use(
      '/uploads',
      express.static(staticImagePath, {
          setHeaders: (res, filePath) => {
              res.setHeader('Cache-Control', 'no-store');
              console.log(`Serving file: ${filePath}`); 
          },
      })
  );
server.use('/blogsite/user',userrouter)
server.use('/blogsite/blogs',blogrouter)
server.use('/blogsite/admin',adminrouter)


server.listen(process.env.PORT,()=>{
    console.log('server is running at', process.env.PORT);
    connectdatabase();
})


 