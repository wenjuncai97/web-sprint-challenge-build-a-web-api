// add middlewares here related to projects
const Project = require('../projects/projects-model')

function validateProjectId(req, res, next) {
    Project.get(req.params.id)
        .then((action) => {
            if(action) {
                next()
            } else {
                res.status(404).json({
                    message: "missing project id"
                })
            }
        })
}

function validateProject(req, res, next) {
    let {id, name, description, completed} = req.body;
    if(
        typeof name != "string" ||
        typeof description != "string" ||
        typeof completed != "boolean"
    ) {
        res.status(400).json({
            message: "missing some fields"
        })
        return;
    }
    req.project = {
        id, 
        name,
        description,
        completed
    }
    next();
}

module.exports = {
    validateProjectId,
    validateProject
}