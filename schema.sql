-- Script para crear la base de datos y la tabla de tareas
-- Compatible con MySQL

-- Crear la base de datos (correr esto por separado si no existe)
-- CREATE DATABASE todolist;

-- Usar la base de datos
-- USE todolist;

-- Crear la tabla de tareas
CREATE TABLE IF NOT EXISTS tasks (
  id         INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(255)  NOT NULL,
  completed  TINYINT(1)    NOT NULL DEFAULT 0,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);
