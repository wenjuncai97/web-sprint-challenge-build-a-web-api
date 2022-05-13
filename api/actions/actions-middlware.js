// add middlewares here related to actions
const Action = require('../actions/actions-model');

function validateActionId(req, res, next) {
    Action.get(req.params.id)
        .then((act) => {
            if(act) {
                req.existingAction = act;
                next()
            } else {
                res.status(404).json({
                    message: "missing action"
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
  
module.exports = { 
    validateActionId
}