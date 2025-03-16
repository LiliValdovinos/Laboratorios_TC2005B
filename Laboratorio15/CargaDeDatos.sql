-- Inserción de datos en la tabla Materiales
INSERT INTO Materiales (Clave, Descripcion, Precio, Impuesto) VALUES
(1000, 'Varilla 3/16', 100, 10),
(1010, 'Varilla 4/32', 115, 11.5),
(1020, 'Varilla 3/17', 130, 13),
(1030, 'Varilla 4/33', 145, 14.5),
(1040, 'Varilla 3/18', 160, 16),
(1050, 'Varilla 4/34', 175, 17.5),
(1060, 'Varilla 3/19', 190, 19),
(1070, 'Varilla 4/35', 205, 20.5),
(1080, 'Ladrillos rojos', 50, 5),
(1090, 'Ladrillos grises', 35, 3.5);

-- Inserción de datos en la tabla Proveedores
INSERT INTO Proveedores (RFC, RazonSocial) VALUES
('AAAA800101', 'La fragua'),
('BBBB800101', 'Oviedo'),
('CCCC800101', 'La Ferre'),
('DDDD800101', 'Cecoferre'),
('EEEE800101', 'Alvin'),
('FFFF800101', 'Comex'),
('GGGG800101', 'Tabiquera del centro'),
('HHHH800101', 'Tubasa');

-- Inserción de datos en la tabla Proyectos
INSERT INTO Proyectos (Numero, Denominacion) VALUES
(5000, 'Vamos Mexico'),
(5001, 'Aztecon'),
(5002, 'CIT Campeche'),
(5003, 'Mexico sin ti no estamos completos'),
(5004, 'Educando en Coahuila'),
(5005, 'Infonavit Durango'),
(5006, 'Reconstrucción del templo de Guadalupe'),
(5007, 'Construcción de plaza Magnolias');

-- Inserción de datos en la tabla Entregan
INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad) VALUES
(1000, 'AAAA800101', 5000, '2001-12-13', 165),
(1000, 'AAAA800101', 5019, '1999-07-13', 254),
(1010, 'BBBB800101', 5001, '1998-07-28', 528),
(1010, 'BBBB800101', 5018, '1997-02-09', 523),
(1020, 'CCCC800101', 5002, '2003-12-16', 582),
(1020, 'CCCC800101', 5017, '2000-03-29', 8),
(1030, 'DDDD800101', 5003, '1998-01-12', 202),
(1030, 'DDDD800101', 5016, '2005-06-07', 295);
