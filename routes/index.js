var express = require('express');
var router = express.Router();

// Redirecciono la pagina de inicio 
router.get('/', function(req, res, next) {
  res.redirect('/admin/login');
});

module.exports = router;
