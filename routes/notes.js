const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Note = require('../models/note');

// Create note route
router.post('/create', (req, res, next) => {
  let newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId
  });

  Note.addNote(newNote, (err, note) => {
    if(err){
      res.json({success: false, msg: 'Failed to create note'});
    } else {
      res.json({success: true, msg: 'Note created'});
    }
  });
});

// List notes route
router.get('/list/:userId', (req, res, next) => {
  const userId = req.params.userId;
  Note.getUserNotes(userId, (err, notes) => {
    if (err) throw err;

    if (notes.length == 0) {
      return res.json({
        success: true,
        msg: 'User has no notes',
        notes: []
      });
    }

    res.json({
      success: true,
      msg: 'Notes found',
      notes: notes
    });
  });
});

// Remove note router
router.post('/remove', (req, res, next) => {
  const noteId = req.body.id;
  Note.removeNote(noteId, (err) => {
    if (err) throw err;
    res.json({success: true, msg: 'Note successfully deleted'})
  })
});

module.exports = router;
