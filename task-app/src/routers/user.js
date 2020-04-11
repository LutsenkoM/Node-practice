const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  // user.save().then((response) => {
  //     res.status(201).send(user);
  // }).catch((error) => {
  //     res.status(400).send(error);
  // });
  try {
    await user.save();
    await user.generateAuthToken();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.post('/users/login', async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password); // findByCredentials can be any name of function
    await user.generateAuthToken();
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/users', async (req,res) => {
  // User.find({}).then((users) => {
  //     res.send(users);
  // }).catch((error) => {
  //     res.status(500).send(error);
  // });

  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }

});

router.get('/users/:id', async (req,res) => {
  const userId = req.params.id;

  // User.findById(userId).then((user) => {
  //     if (!user) {
  //         return res.status(404).send();
  //     }
  //     res.send(user);
  // }).catch((error) => {
  //     res.status(500).send(error);
  // });

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/users/:id', async (req,res) => {
  const userId = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  });

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const user = await User.findById(userId);

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    //const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
