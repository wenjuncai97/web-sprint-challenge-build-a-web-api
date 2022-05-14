// add middlewares here related to actions
const Action = require('../actions/actions-model');

function validateActionId(req, res, next) {
    Action.get(req.params.id)
        .then((act) => {
            if(act) {
                next()
            } else {
                res.status(404).json({
                    message: "missing action id"
                })
            }
        })
}

function validateAction(req, res, next) {
    let {id, project_id, description, notes, completed} = req.body;
    if(
        typeof description != "string" || 
        typeof notes != "string" || 
        typeof completed != "boolean"
    ) {
        res.status(400).json({
            message: "missing some fields"
        })
        return;
    } 
    req.action = {
        id,
        project_id,
        description,
        notes,
        completed
    }
    next();
}
  
module.exports = { 
    validateActionId,
    validateAction
}