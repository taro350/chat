import express from 'express';
import got from 'got';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// enabling CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.get('/chat.js', (req, res) => {
  res.sendFile('index.js', { root: __dirname });
});

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
  console.log(`Root directly done`);
});

app.get('/chat', function (req, res) {
  console.log(`Params for query : ${req.query.question}`);

  // only ?question= in URL
  if (req.query.question != undefined) {

    

    (async () => {
      const userInputText = req.query.question;
      const url = 'https://api.openai.com/v1/engines/davinci/completions';
      const requestData = {
        "prompt": `Say this is a ${userInputText}`,
        "max_tokens": 7,
        "temperature": 0.5,
        "frequency_penalty": 0.5
      };
      const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      };

      try {
        const jsonresponse = await got.post(url, { json: requestData, headers: headers }).json();
        output = `${prompt}${jsonresponse.choices[0].text}`;
        console.log(output);
      } catch (err) {
        console.log(err);
      }
    })();

    
  }
});





app.listen(port, () => {
  console.log('chat server started on port:' + port);
});