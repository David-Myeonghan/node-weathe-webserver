const request = require("request");

const forecast = (latitude, longitude, callback) => {
	// const url =
	// 	"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
	// 	encodeURIComponent(latitude, longitude) +
	// 	".json?access_token=pk.eyJ1IjoibXlkYXYxMiIsImEiOiJjazhmazV4bXYwNTZrM21vemV1NHhpYTh5In0._yL2n_UfOxYh1X6hvzQylw&limit=1";

	// const url =
	// 	"https://api.darksky.net/forecast/232e936ccf8b8b111d3ef77a0fae8ec8/" +
	// 	encodeURIComponent(latitude, longitude) +
	// 	"?units=si";

	const url =
		"http://api.weatherstack.com/current?access_key=20b769c29ecb1d31204e7d0aafcad9d7&query=" +
		latitude +
		"," +
		longitude;

	request({ url, json: true }, (error, { body }) => {
		// destructuring response.body
		const summary = body.current.weather_descriptions;
		const temperature = body.current.temperature;
		const feelslike = body.current.feelslike;

		if (error) {
			callback("Unable to connect to weather services!", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			callback(
				undefined,
				summary +
					". It is currently " +
					temperature +
					" degrees. It feels like " +
					feelslike +
					" degrees."
			);
		}
	});
};

// request({ url: weatherUrl, json: true }, (error, response) => {
// 	const summary = response.body.daily.data[0].summary;
// 	const temperature = response.body.currently.temperature;
// 	const precipProbability = response.body.currently.precipProbability;

// 	if (error) {
// 		console.log("Unable to connect to weather service!");
// 	} else if (response.body.error) {
// 		console.log("Unable to find location");
// 	} else {
// 		console.log(
// 			summary +
// 				" It is currently " +
// 				temperature +
// 				" degrees out. There is a " +
// 				precipProbability +
// 				"% chance of rain."
// 		);
// 	}
// });

module.exports = forecast;
