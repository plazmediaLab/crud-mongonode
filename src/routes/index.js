const express = require('express');// Traemos express
const router = express.Router();// Modulo que devuelve (importa) un objeto

const Task = require('../models/task');

router.get('/', (req, res) => {
  res.render('index')
});

router.post('/add', async (req, res) =>{
  const task = new Task(req.body);
  await task.save();
  res.send('Recived');
})

module.exports = router;// Exportamos el modulo almavenado en nuestra constante.