var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var request = require('request');
var router = express.Router();

const letsEncryptReponse = process.env.CERTBOT_RESPONSE;

var app = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (app, db) {
  app.get('/', (req, res) => {
    res.render('index')
  })

  app.route('/save_answers').post(function(req, res){
    console.log(req.body)

    var data = {
      "What are you doing": req.body.first,
      "What have you learned during this work session": req.body.second,
      "How has this helped you move closer to achieving your goals": req.body.third
    }
    var dateAdded = Date.now()

    var answers = db.collection('answers')
    answers.insert({
      dateAdded: dateAdded,
      data: data
    })

    res.render('index', {form: 'Form succesfully submitted.'})
  })

}
