const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema en el que se almacenaran los datos en cada colección en MongoDB
const TaskSchema = new Schema({
  title: String,
  description: String,
  status:{
      type: Boolean,
      default: false
  }  
});

module.exports = mongoose.model('tasks', TaskSchema);