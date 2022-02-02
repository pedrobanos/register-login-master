const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i
const SALT_ROUNDS = 10

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: EMAIL_PATTERN,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    match: [PASSWORD_PATTERN, 'Password must contain at least 8 chars!']
  }
})

userSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUNDS)
      .then((hash) => {
        user.password = hash
        next()
      })
      .catch(err => next(err))
  } else {
    next()
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User





































// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
// const Schema =  mongoose.Schema

// const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// const PASSWORD_PATTERN = /^.{8,}$/i
// const SALT_ROUNDS = 10

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     minLength: [3, 'Name must has at least 3 chars!']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     match: [EMAIL_PATTERN, 'Invalid email'],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     match: [PASSWORD_PATTERN, 'Password must contain 8 characters']
//   }
// })

// userSchema.pre('save', function (next) {
//   const user = this;

//   if (user.isModified('password')) {
//     bcrypt.hash(user.password, SALT_ROUNDS)
//       .then(hash => {
//         user.password = hash;
//         next();
//       })
//       .catch(error => next(error))
//   } else {
//     next()
//   }
// })

// userSchema.methods.checkPassword = function(passwordToCheck) {
//   const user = this;
//   return bcrypt.compare(passwordToCheck, user.password)
// }

// const User =  mongoose.model('User', userSchema)
// module.exports = User