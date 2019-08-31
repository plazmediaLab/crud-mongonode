### **Iniciamos con el comando:**

`$ npm init --yes` => Esto inicia un archivo .json en que tendremos las configuraciones de nuestro proyecto con NODE.

Instalamos los modulos principales con los que estaremos trabajando, los cuales son:

1. `express` => Framework de NODEjs, que permite escribir el codigo de servidos de  NODEjs de manera mas corta.

2. `mongoose` => Permite la conexión de NODE y MongoDB, ademas de modelar, ejecutar y mostrar nuestros datos de la DB, imteractuar con la base de datos.

3. `ejs` => Motor de plantillas, ejecutar pequeños Javascripts para modelar la vista en el navegador tanto de nuestra aplicación, como de nuestros datos.

4. `morgan` => Modulo que ayuda mas que nada en el desarrollo, para visualizar el movimiento de los datos por consola.   

`$ npm install extress mongoose ejs morgan` => Instala los modulos de NODE.

### **Una ves instalados los modulos, instalaremos otro por fuera de estos previamente agregados.**

`$ npm i nodemon -D` => Instala el modulo, pero con la diferencia de que el comando `-D` lo instala por fuera, en la sección `"devDependecies"` dentro de el `package.json`, esta sección queda fuera de los archivos exportados a la hora de poner en producción nuestra app.

>**Creamos una carpeta llamada `./src` dentro de nuestra carpeta de proyecto.**
>
>En esta carpeta tendremos todos nuestros archivos de desarrollo, en los que estaremos trabajando.
>
>Dentro de esta carpeta creamos un archivo `app.js`.
>
>**Este archivo será nuestro servidor.**

**Arrancamos el servidor con:** 

`$ node src/app.js` // para probar que funcione.

**Modificamos el `package.json` para adaptar nuestro servidor.**

En la sección:
~~~
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
~~~
Quedando de la siguiente manera:
~~~
    "scripts": {
      "start": "node src/app.js",
      "dev": "nodemon src/app.js"
    },
~~~

**Estructura inicial de nuestro servidor en `app.js`**

~~~
    const express = require('express'); 
    const app = express();

    app.listen(4000, () => {
        console.log("Server on port 3000");
    });
~~~

`"start": "node src/app.js"` es el comando con el que el servidor. 

`$ npm start` => Ejecuta el servidor en producción.

`"dev": "nodemon src/app.js"` es el metodo con el que ejecutaremos, cuando estemos en desarrollo.

Para esto lo ejecutamos en consola con:

`$ npm run dev` => `"run"` es el metodo para ejecutar *nodemon* y `"dev"` es nuestro *script* establecido anteriormente, esto cuando estemos en desarrollo.

>Ejecutamos en desarrollo con `nodemon` para que así esta dependencia este al tanto de cualquier cambio o modificacion en nuestra aplicación y se actialice automaticamente, ya que por si solo `node` requiere de detener y reiniciar el servidor tras cualquier cambio, de ahí que el primer *script* es para el servidor ya en producción.

**Mejorando nuestro servidor**

Agregamos secciones en nuestro servidor, para referenciarnos un poco mejor de que incluimos y como esta estructurado.


**./src/app.js**
~~~
    const path = require('path');
    const express = require('express');
    const morgan = require('morgan');
    const mongoose = require('mongoose');

    const app = express();

    mongoose.connect('mongodb://localhost/crud-mongonode')
        .then(db => console.log('DB connected'))
        .catch(err => console.log(err));

    const indexRauter = require('./routes/index');

    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));

    app.use('/', indexRauter);

    app.listen(app.get('port'), () => {
        console.log(`Server on port ${app.get('port')}`);
    }); 
~~~
>*En el archivo app (servidor) hay más especificaciones de cada modulo, punción y parametro establecido*

### **Con esto tenemos configurado y ejecutando nuestro servidor.**

1. ### *Arrancamos nuestro servidor.*
    + `$ npm run dev` => Arranca el servidor.

2. ### *Iniciamos MongoDB en una consola nueva, para conectar nuestro servidor.*
    + `$ mongod` => Inicia nuestra DB y si todo es correcto, se conectara al servidor.

---
## Creamos la estrucctura que utilizaremos en nuestra aplicación.

>**Creamos las caretas `routes` - `views` - `models` dentro de `./src`.**
> + **routes**: directorio para todas las rutas del servidor.
> + **routes**: directorio para vistas, todos lor archivos de UI que exportaremos a *HTML*.
> + **models**: Almacena todos los archivos de como lucen los datos dentro de la base de datos (DB).