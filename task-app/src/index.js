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

const myFunction = async () => {
    const pass = 'Red12345!';
    const hashedPass = await bcrypt.hash(pass, 8);
    console.log(pass);
    console.log(hashedPass);

    const isMatch = await bcrypt.compare("Red12345!", hashedPass);
    console.log(isMatch);
};

myFunction();
