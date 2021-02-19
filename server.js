// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import reload from 'livereload';
import connectReload from 'connect-livereload';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;
const staticFolder = 'public';

// Add some auto-reloading to our server
const liveReloadServer = reload.createServer();
liveReloadServer.watch(path.join(__dirname, staticFolder));

// Configure express
app.use(connectReload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(staticFolder));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

function someAlgo(string, data) {
  return data.filter((f) => f.zipcode === string);// do a bunch of math to find the thing you want;
}

app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    // console.log('data from fetch', json);
    res.json(json);
  })
  .post(async (req, res) => {
    // console.log('Hello World');
    res.send('Hello World');
    // console.log('Form data in req.body', req.body);
    // res.json({facilities: dataStore});
  });

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
});

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});
