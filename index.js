import express from 'express';
import got from 'got';
import path from 'path'
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


app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
  console.log(`Root directly done`);
  console.log(__dirname)
});

app.get('/chat', async function (req, res) {
  console.log(`Params for query : ${req.query.question}`);

  // only ?question= in URL
  if (req.query.question != undefined) {

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
        console.log(`Success! Here's the output :${output}`);
        return output
      } catch (err) {
        console.log(`Agh, erroe caught : ${err}`);
      }
    

    
  }
});

app.get('/chat.js', (req, res) => {
  console.log(__filename)
  res.sendFile(__filename);
});

app.get('/logo.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'logo.png'));
});



app.listen(port, () => {
  console.log('chat server started on port:' + port);
});