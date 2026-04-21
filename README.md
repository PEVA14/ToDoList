# Task List App

Proyecto escolar — Aplicación web full-stack para administrar tareas.

## Tecnologías

| Capa       | Tecnología                        |
|------------|-----------------------------------|
| Frontend   | HTML, Bootstrap 5, JavaScript     |
| Backend    | Node.js + Express                 |
| Base datos | MySQL                             |
| Despliegue | Azure App Service + Azure Database|

## Funcionalidades

- Ver todas las tareas
- Crear una tarea nueva
- Marcar tarea como completada / pendiente
- Eliminar tarea

## Estructura del proyecto

```
ToDoList/
├── server.js          ← Express + rutas API
├── db.js              ← Conexión a MySQL
├── schema.sql         ← Script para crear la tabla
├── public/
│   ├── index.html     ← Interfaz de usuario
│   └── app.js         ← JavaScript del frontend
├── package.json
├── .env.example       ← Variables de entorno de ejemplo
└── .gitignore
```

## Cómo correrlo localmente

### 1. Requisitos previos
- Node.js 18+
- MySQL instalado y corriendo

### 2. Clonar e instalar
```bash
git clone <url-del-repo>
cd ToDoList
npm install
```

### 3. Crear la base de datos
```bash
mysql -u root -p
CREATE DATABASE todolist;
USE todolist;
source schema.sql;
exit
```

### 4. Configurar variables de entorno
```bash
cp .env.example .env
# Edita .env con tu usuario y password de MySQL
```

### 5. Correr el servidor
```bash
npm run dev    # desarrollo (con nodemon)
npm start      # producción
```

### 6. Abrir la app
Abre tu navegador en: http://localhost:3000

## API Endpoints

| Método | Ruta                    | Descripción              |
|--------|-------------------------|--------------------------|
| GET    | /api/tasks              | Obtener todas las tareas |
| POST   | /api/tasks              | Crear una tarea          |
| DELETE | /api/tasks/:id          | Eliminar una tarea       |
| PUT    | /api/tasks/:id/toggle   | Cambiar estado completed |

## Variables de entorno

```
DB_HOST      = host de la base de datos
DB_USER      = usuario de MySQL (root en local)
DB_PASSWORD  = contraseña
DB_NAME      = nombre de la base de datos
DB_PORT      = puerto (default 3306)
DB_SSL       = true en Azure, false en local
PORT         = puerto del servidor (default 3000)
```

---

*Proyecto desarrollado para materia de Desarrollo Web — 2024*
