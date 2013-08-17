var express = require('express'),
  app = express(),
  rest = require('./app/js/rest.js');

// configure Express
app.configure(function() {
  app.use(express.favicon());
  app.use(express.static(__dirname + '/app'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

// routes
app.get('/twitpic/:user', function(req, res) {

  var user = req.params.user;

  var options = {
    host: 'api.twitpic.com',
    // port: 443,
    path: '/2/users/show.json?username=' + user,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  rest.getJSON(options, function(statusCode, result) {
    console.log('onResult: (' + statusCode + ')' + JSON.stringify(result));
    res.statusCode = statusCode;
    res.send(result);
  });

});

app.listen(9999);
console.log(new Date() + 'Node+Express server listening on port 9999');
