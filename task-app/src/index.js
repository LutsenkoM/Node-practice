const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 2000;

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

const jsonWebToken = () => {
    const token = jwt.sign({ _id: 'abc123' }, 'secretkeyvalue', { expiresIn: '7 days' });
    console.log('token', token);

    const data = jwt.verify(token, 'secretkeyvalue');
    console.log('data', data);
};

jsonWebToken();
