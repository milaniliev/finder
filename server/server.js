var buildings = [
  {"name": "Calkins Hall", "places": [
    {"name": "Calkins Lab", "resources": ["Student Computing Services"]}
  ]},
  {"name": "Adams Hall", "places": [
    {"name": "Innovation lab"}, {"name": "Linux lab"},
    {"name": "Computer Science Department Office",  "resources": ["Department Chair"]}
  ]}
]

var express = require('express')
var server = express()

server.get('/buildings.json', function(request, response){
  response.send(JSON.stringify(buildings))
})

server.listen(3415)