const router = require('express').Router();
const path = require('path');

router.put('/:id', function (req, res) {
    res.sendFile(path.join(path.dirname(__dirname) + '/views/editar.html'));
});

module.exports = router;