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

router.post("/", (req, res) => {
    const { name, description } = req.body;
    if(!name || !description) {
        res.status(400).json({ err: 'Missing name and description' });
    }
    project.insert({ name, description })
        .then(response => {
            res.status(201).json({ name, description });
    })
        .catch(err => {
            res.status(500).json({ err: 'Failed to post project' });
    })
})

//DELETE

router.delete('/:id', (req, res) => {
    project.remove(req.params.id)
        .then(response => {
          if(!response) {
            res.status(404).json({ err: 'Project with specified ID not found' });
        }
            res.status(200).json({ msg: 'Project deleted'});
    })
    .catch(err => {
        res.status(500).json({ err: 'Failed to delete project' });
    })
})

//PUT

module.exports = router;