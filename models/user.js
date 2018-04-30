const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/loginapp');

const db = mongoose.connection;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, cb) =>{
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
      newUser.password = hash;
      newUser.save(cb);
    });
  });
}

module.exports.getUserByUsername = (username, cb) => {
  const query = {username};
  User.findOne(query, cb);
}

module.exports.getUserById = (id, cb) => {
    User.findById(id,cb);
}

module.exports.comparePassword = (candidatePassword, hash, cb) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if(err) throw err;
    cb(null, isMatch);
  })
}

