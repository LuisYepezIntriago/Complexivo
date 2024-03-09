// Definimos un objeto vacío llamado 'controller' que contendrá nuestras funciones de controlador
const controller = {};

// Definimos una función 'list' en nuestro controlador. Esta función se encargará de listar todos los médicos especialistas
controller.list = (req, res) => {
    // Usamos el método 'getConnection' del objeto 'req' para obtener una conexión a la base de datos
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que selecciona todos los registros de la tabla 'MedicosEspecialistas'
        conn.query('SELECT * FROM MedicosEspecialistas', (err, medicos) => {
            // Si hay un error al ejecutar la consulta, respondemos con el error en formato JSON
            if (err) {
                res.json(err);
            }
            // Si no hay errores, renderizamos la vista 'medicos' y le pasamos los datos de los médicos
            res.render('medicos', {
                data: medicos
            });
        });
    });
};

// Definimos una función 'save' en nuestro controlador. Esta función se encargará de guardar un nuevo médico especialista
controller.save = (req, res) => {
    // Obtenemos los datos del médico del cuerpo de la solicitud
    const data = req.body;
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que inserta un nuevo registro en la tabla 'MedicosEspecialistas'
        conn.query('INSERT INTO MedicosEspecialistas SET ?', [data], (err, result) => {
            // Si hay un error al ejecutar la consulta, respondemos con el error en formato JSON
            if (err) {
                res.json(err);
            }
            // Si no hay errores, redirigimos al usuario a la página de médicos
            res.redirect('/medicos');
        });
    });
};

// Definimos una función 'edit' en nuestro controlador. Esta función se encargará de obtener los datos de un médico para editarlos
controller.edit = (req, res) => {
    // Obtenemos el id del médico de los parámetros de la ruta
    const { id } = req.params;
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que selecciona el registro del médico con el id especificado
        conn.query('SELECT * FROM MedicosEspecialistas WHERE id = ?', [id], (err, medico) => {
            // Si hay un error al ejecutar la consulta, respondemos con el error en formato JSON
            if (err) {
                res.json(err);
            }
            // Si no hay errores, renderizamos la vista 'medico_edit' y le pasamos los datos del médico
            res.render('medico_edit', {
                data: medico[0]
            });
        });
    });
};

// Definimos una función 'update' en nuestro controlador. Esta función se encargará de actualizar los datos de un médico
controller.update = (req, res) => {
    // Obtenemos el id del médico de los parámetros de la ruta y los nuevos datos del cuerpo de la solicitud
    const { id } = req.params;
    const newMedico = req.body;
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que actualiza el registro del médico con el id especificado
        conn.query('UPDATE MedicosEspecialistas SET ? WHERE id = ?', [newMedico, id], (err, result) => {
            // Si hay un error al ejecutar la consulta, respondemos con el error en formato JSON
            if (err) {
                res.json(err);
            }
            // Si no hay errores, redirigimos al usuario a la página de médicos
            res.redirect('/medicos');
        });
    });
};

// Definimos una función 'delete' en nuestro controlador. Esta función se encargará de eliminar un médico
controller.delete = (req, res) => {
    // Obtenemos el id del médico de los parámetros de la ruta
    const { id } = req.params;
    req.getConnection((err, conn) => {
        // Usamos la conexión para ejecutar una consulta SQL que elimina el registro del médico con el id especificado
        conn.query('DELETE FROM MedicosEspecialistas WHERE id = ?', [id], (err, result) => {
            // Si hay un error al ejecutar la consulta, respondemos con el error en formato JSON
            if (err) {
                res.json(err);
            }
            // Si no hay errores, redirigimos al usuario a la página de médicos
            res.redirect('/medicos');
        });
    });
};

// Exportamos nuestro controlador para que pueda ser requerido en otros archivos
module.exports = controller;