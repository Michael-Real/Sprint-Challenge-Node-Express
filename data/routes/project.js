const project = require('../helpers/projectModel');
const express = require('express');
const router = express.Router();

//GET
router.get('/', (req, res) => {
    project.get()
        .then(response => {
            res.status(200).json(response);
    })
        .catch(err => {
            res.status(500).json({ err: 'Failed to get project data' });
    })
})

router.get('/:id', (req, res) => {
    project.get(req.params.id)
        .then(response => {
          if(!response) {
            res.status(404).json({ msg: 'Project with specified ID not found' });
       }
            res.status(200).json(response);
    })
        .catch(err => {
            res.status(500).json({ err: 'Failed to get project data'});
    })
})

router.get('/:id/actions', (req, res) => {
    project.getProjectActions(req.params.id)
        .then(response => {
          if(!response) {
            res.status(404).json({ msg: "Project with specified ID not found" });
        }     
            res.status(200).json(response);
    })
        .catch(err => {
            res.status(500).json({ err: "Failed to retrieve project actions" });
    })
})

//POST

//DELETE

//PUT

module.exports = router;