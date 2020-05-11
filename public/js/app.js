console.log("Client side javascript file is loaded!"); // not server-side javascript

// To make HTTP request from the client-side JS, gonna use fetch API.
// It is not JS, it's browser based API, which can be used in all modern browser, but not accessible in node JS

// the request function in Node, we used a callback as the second argument to the function.
// but in fetch, use 'then' and use first and only data argument
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
// 	response.json().then((data) => {
// 		console.log(data);
// 	});
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1"); //selecting by id // . : selecting by class name
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "JS";

//name of the evnet, and callback
weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const location = search.value;
	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	fetch("http://localhost:3000/weather?address=" + location).then(
		(response) => {
			response.json().then((data) => {
				if (data.error) {
					messageOne.textContent = data.error;
				} else {
					messageOne.textContent = data.location;
					messageTwo.textContent = data.forecastData;
				}
			});
		}
	);
});
