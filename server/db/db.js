const mongoose = require('mongoose');

mongoose
  .connect('mongodb://0.0.0.0:27017/Docterbooking')
  .then(() => {
    console.log('Db connected');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
