const path = require('path');// Modulo de node para concatenar directorios
const express = require('express');// LLamamos al modulo express
const morgan = require('morgan');// Modulo para visualizar los datos de la DB en consola
const mongoose = require('mongoose');// Llamamos el modulo mongoose

const app = express();// Lo almacenamos en la constante app

// --------------- Conectin to DB ---------------
mongoose.connect('mongodb://localhost/crud-mongonode')// Indicamos la conección de mongo (DB) a nuestra app, estableciendo el nombre de nuestra DB, si no la tenemos ya anteriormente, Mongo la crea
  .then(db => console.log('DB connected'))// Utilizamos de promesa cuando se conecte
  .catch(err => console.log(err));// Utilizamos de promesa cuando haya un error

// --------------- Improting routes ---------------
const indexRauter = require('./routes/index');// Importamos muestro router del archivo index.js

// --------------- Settings --------------- 
app.set('port', process.env.PORT || 3000);// Establecemos dentro de 'port' que tome el puerto asignado por el sistema operativo o en su defecto tome el puerto 3000.
app.set('views', path.join(__dirname, 'views'));// Establecemos la ruta en donde esta nuestra carpeta 'views'.
app.set('view engine', 'ejs');// Establecemos nuestro motor de plantillas a utilizar.


// --------------- Middlewares ---------------
app.use(morgan('dev'));// Indicamos que se utilizara el modulo 'morgan'
app.use(express.urlencoded({extended: false}));// Metodo para interpretar los datos mandados de un HTML, "{extended: false}" parametro para indicar que se enviara solamente texto al servidor

// --------------- Routes ---------------
app.use('/', indexRauter);


// --------------- Starting the server ---------------
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
}); // Indicamos el puerto que tiene que "escuchar"

// Arrancamos el servidor $ node src/app.js, para provar que funcione.