require('dotenv').config();
const express = require('express');
const path    = require('path');
const db      = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Rutas de la API ────────────────────────────────────────────────────────────

// GET /api/tasks → obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// POST /api/tasks → crear una tarea nueva
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title) VALUES (?)',
      [title.trim()]
    );
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// DELETE /api/tasks/:id → eliminar una tarea
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

// PUT /api/tasks/:id/toggle → cambiar completed entre true/false
app.put('/api/tasks/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      'UPDATE tasks SET completed = NOT completed WHERE id = ?',
      [id]
    );
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// ── Iniciar servidor ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
