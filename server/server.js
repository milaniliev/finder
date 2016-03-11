var r = require('rethinkdb')
var express = require('express')
var server = express()

server.use(express.static('../web/'))

r.connect({host: 'milaniliev.com'}, function(error, connection) {
  if (error) { throw error }

  server.get('/buildings.json', function(request, response){
    r.table('buildings').run(connection, function(error, cursor){
      if (error) { throw error }
      cursor.toArray(function(error, buildings){
        if (error) { throw error }
        var buildings_json = JSON.stringify(buildings)
      
        response.send(buildings_json)
      })
    })
  })

  server.listen(3415)    
});
