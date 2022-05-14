const express = require('express');
const {
    validateProjectId,
    validateProject
} = require('./projects-middleware');

const Project = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => res.status(500).json({
            message: "failed to retrieve projects array"
        }))
})

router.get('/:id', validateProjectId, (req, res, next) => {
    Project.get(req.params.id)
        .then(action => res.status(200).json(action))
        .catch(() => res.status(404).json({
            message: "invalid project_id"
        }))
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.project)
        .then(action => res.status(201).json(action))
        .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Project.update(req.params.id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(() => {
            res.status(400).json({
                message: "failed to update"
            })
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "successfully removed project"
            })
        })
        .catch(() => {
            res.status(404).json({
                message: "missing or wrong id"
            })
        })
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})



module.exports = router;