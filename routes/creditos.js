const router = require('express').Router();
const path = require('path');

router.get('/', function(req, res){
    res.sendFile(path.join(path.dirname(__dirname) + '/views/sobres.html'));
});

module.exports = router;