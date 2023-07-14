const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://my-share-frontend.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const PORT = process.env.PORT || 5000;
app.use(express.static('public'));
app.use(express.json());
require('./config/db'); 

const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}
app.use(cors(corsOptions))

//Template engine
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

app.use('/css', express.static(path.resolve(__dirname, "public/css")));
app.use('/image',express.static(path.resolve(__dirname,"public/image")));

//Routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));




app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
})
