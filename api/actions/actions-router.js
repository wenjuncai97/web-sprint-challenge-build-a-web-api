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
    Action.get(req.params.id)
        .then(action => res.status(200).json(action))
        .catch(() => res.status(500).json({
            message: "failed to retrieve action with id",
        }))
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
            res.status(400).json({
                message: "failed to update"
            })
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "successfully removed action"
            })
        })
        .catch(() => {
            res.status(404).json({
                message: "missing or wrong id"
            })
        })
})

module.exports = router;