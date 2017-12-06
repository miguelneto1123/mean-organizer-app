const mongoose = require('mongoose');
const config = require('../config/database');

// Notes schema
const TaskSchema = mongoose.Schema({
  content: {
    type: String
  },
  userId: {
    type: String
  }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.getTaskById = function(id, callback) {
  Task.findById(id, callback);
}

module.exports.getUserTasks = function(userId, callback) {
  const query = {userId: userId};
  Task.find(query, callback);
}

module.exports.addTask = function(newTask, callback) {
  newTask.save(callback);
}

module.exports.removeTask = function(id, callback) {
  const query = {_id: id};
  Task.remove(query, callback);
}
