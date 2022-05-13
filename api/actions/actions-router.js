const express = require('express');
const {
    validateActionId,
} = require('./actions-middlware');

const Action = require('./actions-model');

const router = express.Router();


router.get('/', (req, res, next) => {
    Action.get()
        .then((action) => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.existingAction);
})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;