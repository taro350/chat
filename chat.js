import got from 'got';

const f = document.querySelector("form");

f.addEventListener("submit", async (e) => {
  e.preventDefault();

  const questionInput = document.getElementById('question-input');
  const question = questionInput.value;
  const endpoint = `https://chat-taro350.vercel.app/chat?question=${encodeURIComponent(question)}`;
  console.log(endpoint);

  const responseTextarea = document.getElementById('response-textarea');
  responseTextarea.value = 'Loading...'; // Display a loading message while waiting for the response

  const jsonresponse = await got.post(endpoint);
  console.log(jsonresponse)

  // fetch(endpoint, {
  //       method : "GET",
        
  //   })
  //   .then(response => {
  //     console.log(response)
  //     response.json()
  //   })
  //   .then(data => {
  //     console.log(data);
  //     responseTextarea.value = JSON.stringify(data, null, 2); // Display the response data in the textarea
  //   })
  //   .catch(error => {
  //     console.error('Error caught:', error);
  //     responseTextarea.value = 'An error occurred'; // Display an error message if there was an error
  //   });
});

// function submitQuestion() {
//   const questionInput = document.getElementById('question-input');
//   const question = questionInput.value;
//   const endpoint = `http://localhost:8080/?question=${encodeURIComponent(question)}`;
//   console.log(endpoint);
//   const responseTextarea = document.getElementById('response-textarea');
//   responseTextarea.value = 'Loading...'; // Display a loading message while waiting for the response
//   fetch(endpoint, {
//         method : "GET",
//         mode: 'no-cors'
//     })
//     .then(response => response.json())
//     .then(data => {
//     	console.log(data);
// 		responseTextarea.value = JSON.stringify(data, null, 2); // Display the response data in the textarea
//     })
//     .catch(error => {
// 		console.error('Error:', error);
// 		responseTextarea.value = 'An error occurred'; // Display an error message if there was an error
//     });
// }