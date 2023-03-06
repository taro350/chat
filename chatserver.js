const express = require('express');
const path = require('path');

const { spawn } = require('child_process');

const app = express();
const port = 3000;



// enabling CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.get('/chat.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/chat.js'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
  console.log(`Root directly done`);
});

app.get('/chat', function (req, res) {
  console.log(`Params for query : ${req.query.question}`);

  // only ?question= in URL
  if (req.query.question != undefined) {

  
    const userInputText = req.query.question;

    // const response = {
    //   output: []
    // };

    // const msg = response.output;

    // Define the API request data as a JavaScript object
    const requestData = {
      model: "text-davinci-003",
      prompt: `Say this is a ${userInputText}`,
      max_tokens: 7,
      temperature: 0
    };

    // Convert the request data object to a JSON string
    const requestDataJson = JSON.stringify(requestData);

    // Define the curl command arguments as an array
    const curlArgs = [
      'https://api.openai.com/v1/completions',
      '-H', 'Content-Type: application/json',
      '-H', 'Authorization: Bearer OPENAI_API_KEY',
      '-d', requestDataJson
    ];

    // Spawn a new child process to execute the curl command
    const curl = spawn('curl', curlArgs);

    let output = '';

    // Listen for data events on the child process stdout stream
    curl.stdout.on('data', (data) => {
      output += data;
    });

    // Listen for the child process to exit
    curl.on('exit', (code) => {
      if (code !== 0) {
        res.status(500).send(`Error: curl exited with code ${code}`);
      } else {
        res.send(output);
      }
    });


    console.log(output)
  
    // msg.push(chatresponse);
    
    // res.status(200).json({ result: chatresponse.data.choices[0].text });
    // res.json(chatresponse.data);
  }
});





app.listen(port, () => {
  console.log('chat server started on port:' + port);
});