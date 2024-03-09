// Importamos el módulo 'express' y creamos un nuevo router
const express = require('express');
const router = express.Router();

// Importamos los controladores que vamos a utilizar
const pacientesController = require('../controllers/pacientesControllers');
const medicosController = require('../controllers/medicosControllers');
const citasController = require('../controllers/citasControllers');
const historialController = require('../controllers/historialCitasControllers');

// Definimos las rutas para los pacientes
// Ruta para obtener la lista de pacientes
router.get('/pacientes', pacientesController.list);
// Ruta para mostrar el formulario de nuevo paciente
router.get('/pacientes/new', pacientesController.newForm); 
// Ruta para guardar un nuevo paciente
router.post('/pacientes', pacientesController.save);
// Ruta para mostrar el formulario de edición de un paciente
router.get('/pacientes/edit/:id', pacientesController.edit);
// Ruta para actualizar los datos de un paciente
router.post('/pacientes/update/:id', pacientesController.update);
// Ruta para eliminar un paciente
router.delete('/pacientes/delete/:id', pacientesController.delete); 

// Definimos las rutas para el historial de citas
// Ruta para obtener la lista del historial de citas
router.get('/historialcitas', historialController.list);

// Definimos las rutas para las citas
// Ruta para obtener la lista de citas
router.get('/citas', citasController.list);

// Definimos las rutas para los médicos
// Ruta para obtener la lista de médicos
router.get('/medicos', medicosController.list);

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;