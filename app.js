var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var path = require('path');
var request = require('request');
var mongo = require('mongodb').MongoClient,
    mongodb_link = require('./mongodb.js')
routes = require('./routes/index')

var app = express();

const pug = require('pug')
app.set('view engine', 'pug')

var url = process.env.MONGODB_URI || mongodb_link.MONGODB_URI;

mongo.connect(url, function(err, db){
  if (err) {
      throw new Error('Database failed to connect!');
  } else {
      console.log('MongoDB successfully connected to', url);
  }

//  app.use(bodyParser.json());
  app.use('/public', express.static(process.cwd() + '/public'));
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(upload.array()); // for parsing multipart/form-data

  routes(app, db);

  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
})
