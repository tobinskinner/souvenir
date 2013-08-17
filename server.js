var express = require('express'),
  app = express();

// configure Express
app.configure(function() {
  app.use(express.favicon());
  app.use(express.static(__dirname + '/app'));
  app.use(express.methodOverride());
  app.use(app.router);
});

app.listen(9999);
console.log(new Date() + 'Node+Express server listening on port 9999');
