const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer');
const sharp =require('sharp');

const uploadAvatar = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Please upload an image'));
    }

    callback(undefined, true);
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  // user.save().then((response) => {
  //     res.status(201).send(user);
  // }).catch((error) => {
  //     res.status(400).send(error);
  // });
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }

});

router.post('/users/login', async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password); // findByCredentials can be any name of function
    const token = await user.generateAuthToken();
    res.send({user: user.getPublicProfile(), token});
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users', auth, async (req,res) => {
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

router.get('/users/me', auth, async (req,res) => {
  res.send(req.user);
});

// router.get('/users/:id', async (req,res) => {
//   const userId = req.params.id;
//
//   // User.findById(userId).then((user) => {
//   //     if (!user) {
//   //         return res.status(404).send();
//   //     }
//   //     res.send(user);
//   // }).catch((error) => {
//   //     res.status(500).send(error);
//   // });
//
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send();
//     }
//
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  });

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.patch('/users/:id', async (req,res) => {
//   const userId = req.params.id;
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ['name', 'email', 'password', 'age'];
//   const isValidOperation = updates.every((update) => {
//     return allowedUpdates.includes(update)
//   });
//
//   if (!isValidOperation) {
//     return res.status(400).send({error: 'Invalid updates!'});
//   }
//
//   try {
//     const user = await User.findById(userId);
//
//     updates.forEach((update) => {
//       user[update] = req.body[update];
//     });
//
//     await user.save();
//
//     //const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
//
//     if (!user) {
//       return res.status(404).send();
//     }
//
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// router.delete('/users/:id', async (req, res) => {
//   const userId = req.params.id;
//
//   try {
//     const user = await User.findByIdAndDelete(userId);
//
//     if (!user) {
//       return res.status(404).send();
//     }
//
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/users/me/avatar', auth, uploadAvatar.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
});

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/user/:id/avatar', async (req, res) => { // link for image http://localhost:2000/user/5e94afcd796efe4ce0bbeaf8/avatar
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
