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
  var startdate = new Date(req.query.startdate);
  var enddate = new Date(req.query.enddate);

  var results = [];

  var getoptions = function(n) {

    var options = {
      host: 'api.twitpic.com',
      path: '/2/users/show.json?username=' + user + '?page=' + (n == 0 ? 0 : n),
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    };
    console.log(options);
    return options;

  };

  rest.getJSON(getoptions(0), function(statusCode, result) {

    // number of pages to request in batches of 20 rounded up
    var pages = Math.ceil(result.photo_only_count / 20);
    console.log('photo: ' + result.photo_only_count);
    console.log('pages: ' + pages);
    for (var i = 1; i <= pages; i++) {

      rest.getJSON(getoptions(i), function(statusCode, result) {
        results.push(result.images);
      });

    }

    res.send(results);

  });

});

app.listen(9999);
console.log(new Date() + 'Node+Express server listening on port 9999');
