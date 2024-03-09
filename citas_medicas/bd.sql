-- Creando la base de datos
CREATE DATABASE citas_medicas;

-- Seleccionando la base de datos para las operaciones siguientes
USE citas_medicas;

-- Creando la tabla Pacientes
CREATE TABLE Pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100)
);

-- Insertando un registro en la tabla Pacientes
INSERT INTO Pacientes (nombre, direccion, telefono, email) VALUES ('Juan Perez', 'Calle 123', '1234567', 'juan@example.com');

-- Creando la tabla MedicosEspecialistas
CREATE TABLE MedicosEspecialistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    especialidad VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100)
);

-- Insertando un registro en la tabla MedicosEspecialistas
INSERT INTO MedicosEspecialistas (nombre, especialidad, telefono, email) VALUES ('Dr. Juan Perez', 'Cardiologo', '1234567', 'juanperez@example.com');

-- Creando la tabla CitasMedicas
CREATE TABLE CitasMedicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    hora TIME,
    paciente_id INT,
    medico_id INT,
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES MedicosEspecialistas(id)
);

-- Insertando un registro en la tabla CitasMedicas
INSERT INTO CitasMedicas (fecha, hora, paciente_id, medico_id) VALUES ('2021-01-01', '10:00:00', 1, 1);

-- Creando la tabla HistorialCitas
CREATE TABLE HistorialCitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cita_id INT,
    fecha DATE,
    hora TIME,
    paciente_id INT,
    medico_id INT,
    FOREIGN KEY (cita_id) REFERENCES CitasMedicas(id),
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES MedicosEspecialistas(id)
);

-- Insertando un registro en la tabla HistorialCitas
INSERT INTO HistorialCitas (cita_id, fecha, hora, paciente_id, medico_id) VALUES (1, '2021-01-01', '10:00:00', 1, 1);

-- Creando el usuario Administrador
CREATE USER 'administrador'@'localhost' IDENTIFIED BY 'contraseña';
GRANT ALL PRIVILEGES ON *.* TO 'administrador'@'localhost';
FLUSH PRIVILEGES;

-- Creando el usuario Gestor
CREATE USER 'gestor'@'localhost' IDENTIFIED BY 'contraseña';
GRANT SELECT, UPDATE ON base_de_datos.* TO 'gestor'@'localhost';
FLUSH PRIVILEGES;

-- Verificando los usuarios creados
SELECT user FROM mysql.user;

-- Creando el usuario Administrador con una contraseña diferente
CREATE USER 'administrador'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON *.* TO 'administrador'@'localhost';
FLUSH PRIVILEGES;

-- Creando otro usuario Gestor
CREATE USER 'gestor'@'localhost' IDENTIFIED BY 'contraseña';
GRANT SELECT, UPDATE ON base_de_datos.* TO 'gestor'@'localhost';
FLUSH PRIVILEGES;

-- Verificando el usuario actualmente loggeado
SELECT CURRENT_USER();