// server.js

// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/restapp');

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 			// define our app using express
var bodyParser = require('body-parser');

// data model
var Location = require('./app/models/location');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 			// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});



// test route to make sure everything is working (accessed at GET http://localhost:8000/api)
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to our Location Tracker API!' });	
});

router.route('/locations')

	// create a location (accessed at POST http://localhost:8000/api/locations)
	.post(function(req, res) {

		Location.findOne({'name': req.body.name, 'type': req.body.type}, function(err, location) {	
			if (err) res.send(err);
			// If not found, create a new location
			if (!location) {
				console.log("Creating a new location for " + req.body.type + " " + req.body.name);
				location = new Location();
				location.name = req.body.name;
				location.location = [req.body.longitude, req.body.latitude];
				location.type = req.body.type;
				location.distance = (req.body.type == "parent")? req.body.distance : 0;
			} else {
				// If found, update the record
				console.log("Updating an existing location for " + req.body.type + " " + req.body.name);
				location.location = [req.body.longitude, req.body.latitude];
				location.distance = (req.body.type == "parent")? req.body.distance : 0;
			}
			// Save the location record
			location.save(function(err) {
				if (err) res.send(err);
				if (req.body.type == "parent") {
					isChildInZone(req.body.name, req.body.longitude, req.body.latitude, req.body.distance);   
				} else {
					res.json({ message: 'Location created!' });
				}

				function isChildInZone(name, longitude, latitude, distance) {
					Location.find({'name': name, 'type': 'child', 'location': { $near: [longitude,latitude], $maxDistance: distance }}, function (err, children){
						if (!children.length) {
							res.json({ message: 'No children created yet' });	
						} else {
							res.json(children);
						}
					});
				} // function

			});  // save

		});  // findOne

	}) // post

	// get all the locations (accessed at GET http://localhost:8000/api/locations)
	.get(function(req, res) {
		Location.find(function(err, locations) {
			if (err)
				res.send(err);

			res.json(locations);
		});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);

