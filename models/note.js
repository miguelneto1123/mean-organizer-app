const mongoose = require('mongoose');
const config = require('../config/database');

// Notes schema
const NoteSchema = mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  userId: {
    type: String
  }
});

const Note = module.exports = mongoose.model('Note', NoteSchema);

module.exports.getNoteById = function(id, callback) {
  Note.findById(id, callback);
}

module.exports.getUserNotes = function(userId, callback) {
  const query = {userId: userId};
  Note.find(query, callback);
}

module.exports.addNote = function(newNote, callback) {
  newNote.save(callback);
}

module.exports.removeNote = function(id, callback) {
  const query = {_id: id};
  Note.remove(query, callback);
}
