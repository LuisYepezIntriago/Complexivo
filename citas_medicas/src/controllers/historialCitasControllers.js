// Definimos un objeto vacío llamado 'controller' que contendrá nuestras funciones de controlador
const controller = {};

// Definimos una función 'list' en nuestro controlador. Esta función se encargará de listar todas las citas del historial
controller.list = (req, res) => {
    // Usamos el método 'getConnection' del objeto 'req' para obtener una conexión a la base de datos
    req.getConnection((err, conn) => {
        // Si hay un error al obtener la conexión, lo pasamos a la siguiente función de middleware
        if (err) {
            return next(err);
        }
        // Usamos la conexión para ejecutar una consulta SQL que selecciona todos los registros de la tabla 'historialcitas'
        conn.query('SELECT * FROM historialcitas', (err, citas) => {
            // Si hay un error al ejecutar la consulta, respondemos con el error en formato JSON
            if (err) {
                res.json(err);
            }
            // Si no hay errores, renderizamos la vista 'historial' y le pasamos los datos de las citas
            res.render('historial', {
                data: citas
            });
        });
    });
};

// Exportamos nuestro controlador para que pueda ser requerido en otros archivos
module.exports = controller;