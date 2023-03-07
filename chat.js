// get the form and input elements
const submitbtn = document.getElementById('submitbtn');
const input = document.getElementById('question-input');

// handle the form submission
submitbtn.addEventListener("submit", (e) => {
  // prevent the default form submission behavior
  e.preventDefault();

  alert("hey")
  
  // create a new URLSearchParams object
  const searchParam = new URLSearchParams();
  
  // add the form data to the URLSearchParams object
  searchParam.append('question', input.value);
  
  // send the form data to the server using fetch API
  fetch('https://localhost:3000/chat?' + searchParam.toString())
  .then(response => {
    resultTextarea.value = response.choises[0].text()
  })
  .catch(error => {
    console.log('Error: ', error);
  });
});


// const myForm = document.getElementById('myForm');
// const resultTextarea = document.getElementById('response-textarea');

// myForm.addEventListener('submit', (event) => {
// event.preventDefault();

// const formData = new FormData(myForm);

// const questionInput = document.getElementById('question-input');
// const inputQuery = questionInput.name;
// const inputData = questionInput.value;

// responseTextarea.value = 'Loading...';

// var delayInMilliseconds = 7000; //7 second

// setTimeout(function() {
// 	fetch(`/chat?${inputQuery}=${inputData}`, {
// 		method: 'GET',
// 		headers: {
// 	      "Content-Type": "application/json",
// 	    },
// 	})
// 	.then(response => response.choises[0].text())
// 	.then(data => {
// 		resultTextarea.value = data;
// 	})
// 	.catch(error => {
// 		console.error(error);
// 	});

// }, delayInMilliseconds);



// import got from 'got';

// const f = document.querySelector("form");

// f.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const form = e.target; // find closest form element
//   const formData = new FormData(form); // create new FormData object from form data
//   const url = new URL(form.action, window.location.origin); // create new URL object from form action and current domain

//   const questionInput = document.getElementById('question-input');
//   const inputQuery = questionInput.name;
//   const inputData = questionInput.value;

//   // const inputQuery = form.previousElementSibling.name; // get input query/name from previous sibling element of button
//   // const inputData = form.previousElementSibling.value; // get input data from previous sibling element of button
//   formData.append(inputQuery, inputData); // append input query and data to FormData object
//   const fullUrl = url.origin + url.pathname + '?' + inputQuery + '=' + inputData; // create full URL path
//   console.log(`Full URL: ${fullUrl}`);

  

//   const responseTextarea = document.getElementById('response-textarea');
//   responseTextarea.value = 'Loading...'; // Display a loading message while waiting for the response

//   const endpoint = `https://localhost:3000/chat?question=${encodeURIComponent(question)}`;
//   console.log(endpoint);

//   const jsonresponse = got.get(endpoint);
//   console.log(jsonresponse)
//   responseTextarea.value = JSON.stringify(jsonresponse, null, 2);

//   // fetch(endpoint, {
//   //       method : "GET",
        
//   //   })
//   //   .then(response => {
//   //     console.log(response)
//   //     response.json()
//   //   })
//   //   .then(data => {
//   //     console.log(data);
//   //     responseTextarea.value = JSON.stringify(data, null, 2); // Display the response data in the textarea
//   //   })
//   //   .catch(error => {
//   //     console.error('Error caught:', error);
//   //     responseTextarea.value = 'An error occurred'; // Display an error message if there was an error
//   //   });
// });

// // function submitQuestion() {
// //   const questionInput = document.getElementById('question-input');
// //   const question = questionInput.value;
// //   const endpoint = `http://localhost:8080/?question=${encodeURIComponent(question)}`;
// //   console.log(endpoint);
// //   const responseTextarea = document.getElementById('response-textarea');
// //   responseTextarea.value = 'Loading...'; // Display a loading message while waiting for the response
// //   fetch(endpoint, {
// //         method : "GET",
// //         mode: 'no-cors'
// //     })
// //     .then(response => response.json())
// //     .then(data => {
// //     	console.log(data);
// // 		responseTextarea.value = JSON.stringify(data, null, 2); // Display the response data in the textarea
// //     })
// //     .catch(error => {
// // 		console.error('Error:', error);
// // 		responseTextarea.value = 'An error occurred'; // Display an error message if there was an error
// //     });
// // }