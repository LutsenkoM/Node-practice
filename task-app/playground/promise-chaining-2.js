require('../src/db/mongoose');
const Task = require('../src/models/task');



// Task.findByIdAndUpdate('5e8ef635ad029a06c8865af9', {completed: true}).then((task) => {
//   console.log(task);
//
//   return Task.countDocuments({ completed: false })
//
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({completed: false});

  return count;
};

deleteTaskAndCount('5e8ef635ad029a06c8865af9').then((count) => {
  console.log('Task Count', count);
}).catch((e) => {
  console.log(e)
});

