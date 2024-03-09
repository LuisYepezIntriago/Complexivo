// Definimos un objeto vacío llamado 'controller' que contendrá nuestras funciones de controlador
const controller = {};

// Definimos una función 'list' en nuestro controlador. Esta función se encargará de listar todos los pacientes
controller.list = (req, res) => {
    // Usamos el método 'getConnection' del objeto 'req' para obtener una conexión a la base de datos
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que selecciona todos los registros de la tabla 'Pacientes'
        conn.query('SELECT * FROM Pacientes', (err, pacientes) => {
            // Si hay un error al ejecutar la consulta, respondemos con el error en formato JSON
            if (err) {
                res.json(err);
            }
            // Si no hay errores, renderizamos la vista 'pacientes' y le pasamos los datos de los pacientes
            res.render('pacientes', {
                data: pacientes
            });
        });
    });
};

// Definimos una función 'newForm' en nuestro controlador. Esta función se encargará de renderizar el formulario para agregar un nuevo paciente
controller.newForm = (req, res) => { 
    res.render('pacienteAdd');
};

// Definimos una función 'save' en nuestro controlador. Esta función se encargará de guardar un nuevo paciente
controller.save = (req, res) => {
    // Obtenemos los datos del paciente del cuerpo de la solicitud
    const data = req.body;
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que inserta un nuevo registro en la tabla 'Pacientes'
        conn.query('INSERT INTO Pacientes set ?', [data], (err, pacientes) => {
            // Si hay un error al ejecutar la consulta, respondemos con el error en formato JSON
            if (err) {
                res.json(err);
            }
            // Si no hay errores, redirigimos al usuario a la página principal
            res.redirect('/');
        });
    });
};

// Definimos una función 'edit' en nuestro controlador. Esta función se encargará de obtener los datos de un paciente para editarlos
controller.edit = (req, res) => {
    // Obtenemos el id del paciente de los parámetros de la ruta
    const { id } = req.params;
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que selecciona el registro del paciente con el id especificado
        conn.query('SELECT * FROM Pacientes WHERE id = ?', [id], (err, paciente) => {
            // Si no hay errores, renderizamos la vista 'pacientes_edit' y le pasamos los datos del paciente
            res.render('pacientes_edit', {
                data: paciente[0]
            });
        });
    });
};

// Definimos una función 'update' en nuestro controlador. Esta función se encargará de actualizar los datos de un paciente
controller.update = (req, res) => {
    // Obtenemos el id del paciente de los parámetros de la ruta y los nuevos datos del cuerpo de la solicitud
    const { id } = req.params;
    const newPaciente = req.body;
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que actualiza el registro del paciente con el id especificado
        conn.query('UPDATE Pacientes set ? WHERE id = ?', [newPaciente, id], (err, rows) => {
            // Si no hay errores, redirigimos al usuario a la página principal
            res.redirect('/');
        });
    });
};

// Definimos una función 'delete' en nuestro controlador. Esta función se encargará de eliminar un paciente
controller.delete = (req, res) => {
    // Obtenemos el id del paciente de los parámetros de la ruta
    const { id } = req.params;
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que elimina el registro del paciente con el id especificado
        conn.query('DELETE FROM Pacientes WHERE id = ?', [id], (err, rows) => {
            // Si no hay errores, redirigimos al usuario a la página principal
            res.redirect('/');
        });
    });
};

// Exportamos nuestro controlador para que pueda ser requerido en otros archivos
module.exports = controller;