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

app.get('/flickr', function(req, res) {

  // var user = req.query.user;
  // var startdate = new Date(req.query.startdate);
  // var enddate = new Date(req.query.enddate);
  var user = '70625544%40N00';
  var startdate = '1251000000000';
  var enddate = '1251172799000';

  var options = {
    host: 'api.flickr.com',
    path: '/services/rest/?method=flickr.photos.search' +
      '&api_key=6ccf3ac4e38fcdc496798883300e8b6b' +
      '&user_id=' + user +
      '&min_taken_date=' + startdate +
      '&max_taken_date=' + enddate +
      '&format=json&nojsoncallback=1',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  rest.getJSON(options, function(statusCode, result) {
    res.statusCode = statusCode;
    res.send(result);
  });

});

app.get('/twitpic/:user', function(req, res) {

  var user = req.params.user;
  var startdate = new Date(req.query.startdate);
  var enddate = new Date(req.query.enddate);

  var results = [];

  function getoptions(n) {
    console.log('getoptions was called with: ' + n);
    var options = {
      host: 'api.twitpic.com',
      path: '/2/users/show.json?username=' + user + '?page=' + (n == 0 ? 0 : n),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log('we are returning: ' + JSON.stringify(options));
    return options;

  };

  rest.getJSON(getoptions(0), function(statusCode, result) {

    // number of pages to request in batches of 20 rounded up
    var pages = Math.ceil(result.photo_only_count / 20);
    console.log('number of pages: ' + pages);

    function repeater(p) {
      if (p <= pages) {
        console.log('start of if loop: ' + p);
        rest.getJSON(getoptions(p), function(statusCode, nextresult) {
          console.log('rest request ' + p + ' push to array');
          results.push(nextresult.images);
          console.log('current array ' + results);
          repeater(p + 1);
        });
      }
    };
    repeater(1);
  });

  res.statusCode = statusCode;
  res.send(results);

});

app.listen(9999);
console.log(new Date() + 'Node+Express server listening on port 9999');
