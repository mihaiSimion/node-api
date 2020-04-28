const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
            name: 'order get response'
    });
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({
            parametrul: req.params.id,
            request: req.status
    });
});

router.post('/', (req, res, next) => {
    res.json({
            name: 'order post response',
            code: 'no status code',
            elev: {
                medie: 10,
                nume:'Simion Andrei Mihai',
                ocupatie:'programator'
            }
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
            name: 'order delete response'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
            name: 'order update response'
    });
});


module.exports = router;