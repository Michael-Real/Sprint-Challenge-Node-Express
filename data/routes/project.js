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
    const id = req.params.id;
    project.get(id)
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
    const id = req.params.id;
    project.getProjectActions(id)
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
    const id = req.params.id;
    project.remove(id)
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

router.put('/:id', (req, res) => {
    const { name, description } = req.body;
    const id = req.params.id;
    if(!name || !description) {
        res.status(400).json({ err: 'Missing name and description' });
}
    project.update(id, { name, description })
        .then(response => {
          if(response === null) {
            res.status(404).json({ err: 'Project with specified id not found' });
        }
            res.status(200).json({ name, description });
    })
        .catch(err => {
            res.status(500).json({ err: 'Failed to update project' });
    })
})

module.exports = router;