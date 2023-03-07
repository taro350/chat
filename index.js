import url from 'url';
import path from 'path'
import https from 'https';
import http from 'http';

import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import express from 'express';
import morgan from 'morgan';
import { v4 } from'uuid';

import { createRequire } from "module";
const require = createRequire(import.meta.url);



const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use(morgan('combined'));

// enabling CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Content-Length, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});


// home
app.get('/', function (req, res) {
  res.sendFile('/public/index.html', { root: __dirname });
  console.log(`----- Root directly done`);
  console.log(`----- __dirname : ${__dirname}`)
});


// ******************************************
// /api for Vercel
app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});
app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});
// ******************************************


// chat
app.get('/chat', async function (req, res) {
  let queryParam = url.parse(req.url, true).query.question

  res.send({
    'qestion' : queryParam
  })
  
  console.log(`----- Route : ${req.url}`);
  console.log(`----- Params for path : ${req.path}`);
  console.log(`----- Params for query : ${queryParam}`);

  // only ?question= in URL
  if (queryParam !== undefined) {
      console.log('queryParam is defined');

      const jsonpayload = JSON.stringify({
        "prompt" : "Say this is a hi",
        "max_tokens" : 7,
        "temperature" : 0.5,
        "frequency_penalty": 0.5
      });

      console.log(jsonpayload)

      const options = {
        hostname: "api.openai.com",
        port: 443,
        path: '/v1/engines/davinci/completions',
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Content-Length' : jsonpayload.length,
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      };

      let rawData = [];

      console.log("Let's reqeust! to OpenAI");

      // Actually express skip this part and get to the req.write(jsonpayload)
      // and that's why we can send HTTP POST request with JSON payload!!
      // WTF!! 
      // This is actually happening behind the scenes!
      // *************************************************************
      // const req = http.request(options);
      // req.end();
      // req.on('connect', (res, socket, head) => {
      //     console.log('got connected!');
      //     ..
      // });
      // https://nodejs.org/api/http.html#event-connect
      // *************************************************************

      const req = https.request(options, (res) => {
        console.log('----- StatusCode for OpenAI req:', res.statusCode);
        console.log('----- Headers of response :', res.headers);
        res.setEncoding('utf8');

        res.on('data', (buf) => {
          rawData.push(buf);  // buffer to string
        });

        res.on('end', () => {
          try {
            // const obj = JSON.parse(rawData); // string to JSON obj
            console.log(`------ Data object ${rawData}`);
            
          } catch (e) {
            console.error(`------ Data error : ${e.message}`);
          }
          console.log('----- No more data in response.');

        });
      });

      req.on('error', (e) => {
        console.error(`----- Problem with request: ${e.message}`);
      });

      req.write(jsonpayload)

      req.end();

      // Wait for 'rawData' to fed with data
      await new Promise(resolve => setTimeout(resolve, 5000));

      res.json(rawData)



      // const url = 'https://api.openai.com/v1/engines/davinci/completions';
      // const requestData = {
      //   "prompt": `Say this is a hi`,
      //   "max_tokens": 7,
      //   "temperature": 0.5,
      //   "frequency_penalty": 0.5
      // };
      // const headers = {
      //   'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      // };

      // try {
      //   const jsonresponse = await got.post(url, { json: requestData, headers: headers }).json();
      //   output = `${prompt}${jsonresponse.choices[0].text}`;
      //   console.log(`Success! Here's the output :${output}`);
      //   return output
      // } catch (err) {
      //   console.log(`Agh, erroe caught : ${err}`);
      // }
  }

});

app.get('/chat.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat.js'));
});

app.get('/logo.png', (req, res) => {

  res.sendFile('/public/logo.png', { root: __dirname });
});



app.listen(port, () => {
  console.log('****************** Chat server started on port:' + port + '******************');
});


export default app;

