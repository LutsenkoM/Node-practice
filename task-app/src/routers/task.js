const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

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

router.get('/tasks', async (req,res) => {
  // Task.find({}).then((tasks) => {
  //     res.send(tasks);
  // }).catch((error) => {
  //     res.status(500).send(error);
  // });

  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', async (req,res) => {
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
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

});

router.patch('/tasks/:id', async (req,res) => {
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
    const task = await Task.findById(taskId);

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    task.save();
    // const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }

});

router.delete('/tasks/:id', async (req,res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }

});

module.exports = router;
