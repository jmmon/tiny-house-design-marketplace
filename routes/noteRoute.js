const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel');

router.route("/create").post((req, res) => {
    console.log('create router working');
    const title = req.body.title;
    const content = req.body.content;

    const newNote = new Note({
        title,
        content
    })

    newNote.save();
});


router.route('/notes').get((req, res) => {
    console.log('notes router working')
    Note.find()
    .then(notes => {
        res.json(notes);
        console.log('notes', notes)
    })

});

module.exports = router;