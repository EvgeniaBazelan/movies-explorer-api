const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { default: validator } = require('validator');
const Unauthorized = require('../errors/Unauthorized');
const { errorMessage } = require('../errors/ErrorMessages');

const userSchema = new mongoose.Schema({
  email: {
    isEmail: true,
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: errorMessage.invalidEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}
userSchema.methods.toJSON = toJSON;

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Почта или пароль не верны');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Почта или пароль не верны');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
