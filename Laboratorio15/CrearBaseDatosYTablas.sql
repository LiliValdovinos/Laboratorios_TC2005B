-- Creación de la base de datos (opcional)
CREATE DATABASE IF NOT EXISTS GestionMateriales;
USE GestionMateriales;

-- Tabla de Materiales
CREATE TABLE Materiales (
    Clave INT PRIMARY KEY,
    Descripcion VARCHAR(255) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Impuesto DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Tabla de Proveedores
CREATE TABLE Proveedores (
    RFC VARCHAR(15) PRIMARY KEY,
    RazonSocial VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Tabla de Proyectos
CREATE TABLE Proyectos (
    Numero INT PRIMARY KEY,
    Denominacion VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Tabla intermedia de Entregas (Relación entre Materiales, Proveedores y Proyectos)
CREATE TABLE Entregan (
    Clave INT,
    RFC VARCHAR(15),
    Numero INT,
    Fecha DATE NOT NULL,
    Cantidad INT NOT NULL,
    PRIMARY KEY (Clave, RFC, Numero, Fecha),
    FOREIGN KEY (Clave) REFERENCES Materiales(Clave) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (RFC) REFERENCES Proveedores(RFC) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Numero) REFERENCES Proyectos(Numero) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
