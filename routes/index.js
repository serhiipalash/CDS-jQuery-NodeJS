var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Customer Data Service' });
});

/* GET json file. */
router.get('/:id.json', function(req, res, next) {
  fs.readFile('public/files/'+req.params.id+'.json', {encoding: 'utf8'}, function (err, data) {
    if (err) console.log(err);
    else res.send(data);
  });
});

module.exports = router;
