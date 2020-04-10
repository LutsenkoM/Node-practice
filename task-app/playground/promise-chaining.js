require('../src/db/mongoose');
const User = require('../src/models/user');

// 5e7e6359c4aa6b58d5517cdf

// User.findByIdAndUpdate('5e8edf7d109012270b827f4c', {age: 30}).then((user) => {
//   console.log(user);
//
//   return User.countDocuments({ age: 30 })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// });


const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age: age });

  return count

};


updateAgeAndCount('5e8edf7d109012270b827f4c', 75).then((count) => {
  console.log('UIO', count);
}).catch((e) => {
  console.log(e)
});
