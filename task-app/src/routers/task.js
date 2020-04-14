const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  // task.save().then(() => {
  //    res.status(201).send(task);
  // }).catch((error) => {
  //     res.status(400).send(error);
  // });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /tasks?completed=false
// GET /tasks?limit=10&skip=5
// GET /task?sortBy=createdAt_asc
router.get('/tasks', auth, async (req,res) => {
  // Task.find({}).then((tasks) => {
  //     res.send(tasks);
  // }).catch((error) => {
  //     res.status(500).send(error);
  // });
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    // const tasks = await Task.find({owner: req.user._id});
    // await req.user.populate('tasks').execPopulate();
    await req.user.populate({
      path: 'tasks',
      match, // filtering params
      options: { // pagination params
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', auth, async (req,res) => {
  const taskId = req.params.id;
  // Task.findById(taskId).then((task) => {
  //     if (!task) {
  //         return res.status(404).send();
  //     }
  //     res.send(task);
  // }).catch((error) => {
  //     res.status(500).send(error);
  // });

  try {
    // const task = await Task.findById(taskId);
    const task = await Task.findOne({_id: taskId, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

});

router.patch('/tasks/:id', auth, async (req,res) => {
  const taskId = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidUpdates = updates.every((update) => {
    return  allowedUpdates.includes(update);
  });

  if (!isValidUpdates) {
    return res.status(400).send({error: 'Invalid updates'});
  }

  try {
    // const task = await Task.findById(taskId);
    const task = await Task.findOne({_id: taskId, owner: req.user._id});
    // const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    task.save();

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }

});

router.delete('/tasks/:id', auth, async (req,res) => {
  const taskId = req.params.id;

  try {
    // const task = await Task.findByIdAndDelete(taskId);

    const task = await Task.findOneAndDelete({_id: taskId, owner: req.user._id});

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }

});

module.exports = router;
