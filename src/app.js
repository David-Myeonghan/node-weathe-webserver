const path = require("path");
const express = require("express"); // express is just a function.
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname); // the directory of the current script lives in.
// console.log(__filename); // dirname plus the path to the file itself.
// console.log(path.join(__dirname, "../public")); // how to manipulate the file path

const app = express();
const port = process.env.PORT || 3000 // use the port Heroku provides, or 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// req: the first object containing information about the incoming request to the server.
// res: contains a bunch of methods allowing us to customise what we're going to send back to the requester.

// app.get("", (req, res) => { // This is not used as we have app.use(staticPath).
// 	// to send a response when someone tries to get this address.
// 	res.send("<h1>Weather</h1>"); // able to render HTML directly
// });

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "David Ryu",
	}); // refers to index.hbs, name of the view to render, needs to exactly match with the hbs file in views folder.
});

// app.get("/help", (req, res) => {
// 	res.send([{ name: "David" }, { name: "Mathew" }]); // able to send json and array of objects as well.
// });

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "David Ryu",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		text: "Helpful Text",
		name: "David Ryu",
	});
});

// finish HTTP endpoint(URI)
app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address!",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			// default parameters
			if (error) {
				return res.send({
					error,
				});
			}

			forecast(latitude, longitude, (error, forecastData, icon) => {
				if (error) {
					return res.send({
						error,
					});
				}

				res.send({
					forecastData,
					location,
					address: req.query.address,
					icon
				});
			});
		}
	);
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		//HTTP only allows one respond per a request
		return res.send({
			error: "You must provide a search term!",
		});
	}

	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "David Ryu",
		errorMessage: "Help article not found",
	});
});

// 404 page for all not existing page
app.get("*", (req, res) => {
	//Wild card character
	res.render("404", {
		title: "404",
		name: "David Ryu",
		errorMessage: "Page not found",
	});
});

app.listen(port, () => {
	console.log("Server is up on port " + port);
}); // 3000 is not default but in local, it's okay. // default http: 80
