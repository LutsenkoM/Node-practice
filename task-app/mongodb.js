// CRUD Creat read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databeseName = 'node-task-app';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=> {
  if (error) {
    return console.log('Unable to connect to database!');
  }

  console.log('Connected correctly!');

  const db = client.db(databeseName);

  // ADD DATA___________________________________________________________________________________________________________

  // db.collection('users').insertOne({
  //   name: 'Petya',
  //   age: 29
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user');
  //   }
  //
  //   console.log(result.ops);
  // });

  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen',
  //     age: 28
  //   },
  //   {
  //     name: 'Gunther',
  //     age: 27
  //   },
  //   {
  //     name: 'Petya',
  //     age: 27
  //   },
  //   {
  //     name: 'AAAAAAAnton',
  //     age: 27
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert document!');
  //   }
  //
  //   console.log(result.ops);
  // });

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Buy food',
  //     completed: true
  //   },
  //   {
  //     description: 'Go to GYM',
  //     completed: false
  //   },
  //   {
  //     description: 'Go to home',
  //     completed: false
  //   },
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert tasks!');
  //   }
  //
  //   console.log(result.ops);
  // });


  // FIND DATA__________________________________________________________________________________________________________

  // db.collection('users').findOne({ _id: new ObjectID('5e78ca6ed6b8f410fbd31484') }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch');
  //   }
  //
  //   console.log('Find one user -', user);
  // });

  // db.collection('users').find({ age: 27 }).toArray((error, users) => {
  //     if (error) {
  //       return console.log('Users not found' );
  //     }
  //
  //     console.log('Users result -', users);
  // });

  // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
  //   if (error) {
  //     return console.log('Task not found' );
  //   }
  //
  //   console.log('Not completed tasks:', tasks);
  // });

  // db.collection('tasks').find({ _id: new ObjectID('5e78eed8e2655437a5932092')}).toArray((error, tasks) => {
  //   if (error) {
  //     return console.log('Task not found' );
  //   }
  //
  //   console.log('Task by id:', tasks);
  // });


  // UPDATE DATA________________________________________________________________________________________________________

  // db.collection('users').updateOne({ _id: new ObjectID('5e78ce5f512a0915e91a274d') }, {
  //   // $set: {
  //   //   age: 40
  //   // }
  //   $inc: { // increment age
  //     age: 1
  //   }
  // }).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // });

  // db.collection('tasks').updateMany({completed: false}, {
  //   $set: {
  //     completed: true
  //   }
  // }).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // });

  // DELETE DATA________________________________________________________________________________________________________

  db.collection('users').deleteMany({age: 27}).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });

});
