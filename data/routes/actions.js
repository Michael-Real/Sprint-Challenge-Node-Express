const actions = require('../helpers/actionModel');
const express = require('express');
const router = express.Router();

//Maybe add error handling const

//GET

router.get('/', (req, res) => {
    actions.get()
        .then(response => {
            res.status(200).json(response);
    })
        .catch(err => {
            res.status(500).json({ err: 'Failed to get action' });
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    actions.get(id)
        .then(response => {
          if(!response) {
            res.status(404).json({ msg: 'Action with specified id not found' });
       }
            res.status(200).json(response);
    })
        .catch(err => {
            res.status(500).json({ err: 'Failed to get action'});
    })
})

//POST

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    if(!project_id || !description || !notes) {
        res.status(400).json({ err: 'Missing required body content'});
    }
    actions.insert({ project_id, description, notes })
        .then(response => {
            res.status(201).json({ project_id, description, notes });
    })
        .catch(err => {
            res.status(500).json({ err: 'Failed to post action' });
    })
})

//DELETE

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actions.remove(id)
        .then(response => {
          if(!response) {
            res.status(404).json({ err: 'Action with specified id not found' });
        }
            res.status(200).json({ msg: 'Action deleted'});
    })
    .catch(err => {
        res.status(500).json({ err: 'Failed to delete action' });
    })
})

//PUT

router.put('/:id', (req, res) => {
    const { project_id, description, notes } = req.body;
    const id = req.params.id;
    if(!project_id || !description || !notes) {
        res.status(400).json({ err: 'Missing required body content' });
}
    actions.update(id, { project_id, description, notes })
        .then(response => {
          if(response === null) {
            res.status(404).json({ err: 'Action with specified id not found' });
        }
            res.status(200).json({ project_id, description, notes });
    })
        .catch(err => {
            res.status(500).json({ err: 'Failed to update action' });
    })
})

module.exports = router;