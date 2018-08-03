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
    actions.get(req.params.id)
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

//DELETE

//PUT

module.exports = router;