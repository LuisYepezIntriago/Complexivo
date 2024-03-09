// Importando módulos necesarios
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const methodOverride = require('method-override'); 

// Creando la aplicación Express
const app = express();

// Importando rutas
const propiertiesRoutes = require('./routers/routes'); 

// Configurando la aplicación
app.set('port', process.env.PORT || 3000); // Puerto
app.set('view engine', 'ejs'); // Motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Directorio de vistas

// Configurando middlewares
app.use(morgan('dev')); // Logger
app.use(myConnection(mysql, { // Conexión a MySQL
    host: 'localhost',
    user: 'administrador',
    password: 'contraseña',
    port: '3306',
    database: 'citas_medicas'
}, 'single'));
app.use(express.urlencoded({extended: false})); // Parseo de cuerpos de solicitud
app.use(methodOverride('_method'));  // Sobrescribir métodos HTTP

// Ruta para la vista principal
app.get('/', (req, res) => {
    res.render('principal');
});

// Ruta para obtener los datos de los pacientes en formato JSON
app.get('/api/pacientes', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      return res.send(err);
    }
    conn.query('SELECT * FROM pacientes', (err, data) => {
      if (err) {
        return res.send(err);
      }
      res.json(data);
    });
  });
});

// Usando las rutas importadas
app.use('/', propiertiesRoutes); 

// Sirviendo archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});