const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Task = require('../models/task');

// Create task route
router.post('/create', (req, res, next) => {
  let newTask = new Task({
    content: req.body.content,
    userId: req.body.userId
  });

  Task.addTask(newTask, (err, task) => {
    if(err){
      res.json({success: false, msg: 'Failed to create task'});
    } else {
      res.json({success: true, msg: 'Task created'});
    }
  });
});

// List tasks route
router.get('/list/:userId', (req, res, next) => {
  const userId = req.params.userId;
  Task.getUserTasks(userId, (err, tasks) => {
    if (err) throw err;

    if (!tasks) {
      return res.json({
        success: true,
        msg: 'User has no tasks',
        tasks: {}
      });
    }

    res.json({
      success: true,
      msg: 'Tasks found',
      tasks: tasks
    });
  });
});

// Remove task router
router.post('/remove', (req, res, next) => {
  const taskId = req.body.id;
  Task.removeTask(taskId, (err) => {
    if (err) throw err;
    res.json({success: true, msg: 'Task successfully deleted'})
  })
});

module.exports = router;
