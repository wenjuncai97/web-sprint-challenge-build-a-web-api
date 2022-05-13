const express = require('express');
const {
    validateActionId,
    validateAction
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

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.action)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Action.update(req.params.id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(404).json({
                message: "missing id"
            })
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.existingAction.id)
        .then(() => {
            res.status(200).json(req.existingAction)
        })
        .catch(err => {
            res.status(404).json({
                message: "missing or wrong id"
            })
        })
})

module.exports = router;