How to use this api
1.  Install nodejs, run npm install 
2.  Install Mongodb
3.  Start the server: node server.js

Rest Endpoints:

Add a parent
http://localhost:8000/api/locations
POST
{
"name" : "John Carter",
"longitude": -73.9900700,
"latitude": 40.7456570,
"type": "parent",
"distance": 2
}

Response (when no children haven been added yet)
{
message: "No children created yet"
}

Response (returns an array of children)
[{"_id":"546a608c0c5c4f5f10000001","distance":0,"type":"child","name":"John Carter","__v":0,"location":[-73.99007,40.745657]}]


Add a child
http://localhost:8000/api/locations
POST
{
"name" : "John Carter",
"longitude": -73.9900700,
"latitude": 40.7456570,
"type": "child"
}

Response
{
message: "Location created!"
}


Get all locations in the database
http://jetfuel.drupalnyc.com:8000/api/locations
GET

Response
[{"_id":"546a5f933c6dfe1010000001","distance":2,"type":"parent","name":"John Carter","__v":0,"location":[-73.99007,40.745657]},
{"_id":"546a608c0c5c4f5f10000001","distance":0,"type":"child","name":"John Carter","__v":0,"location":[-73.99007,40.745657]},
{"_id":"546a61caa277afd410000001","distance":2,"type":"parent","name":"Linda Carter","__v":0,"location":[-73.99007,40.745657]}]
