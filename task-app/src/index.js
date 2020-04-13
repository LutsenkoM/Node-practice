const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 2000;

// EXPRESS MIDDLEWARE
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests disabled')
//     } else {
//         next();
//     }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port' + port)
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const comparePasswordFunction = async () => {
//     const pass = 'Red12345!';
//     const hashedPass = await bcrypt.hash(pass, 8);
//     console.log(pass);
//     console.log(hashedPass);
//
//     const isMatch = await bcrypt.compare("Red12345!", hashedPass);
//     console.log(isMatch);
// };
// comparePasswordFunction();

// const jsonWebToken = () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'secretkeyvalue', { expiresIn: '7 days' });
//     console.log('token', token);
//
//     const data = jwt.verify(token, 'secretkeyvalue');
//     console.log('data', data);
// };
//
// jsonWebToken();

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5e932c7172ef016b08355333');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById('5e932aaa785b786a0dcbfc9d');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
};

main();
