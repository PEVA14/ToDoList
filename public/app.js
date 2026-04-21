const API_URL = '/api/tasks';

document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.getElementById('taskTitle');
  const title = input.value.trim();
  const errorDiv = document.getElementById('formError');

  if (!title) return;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (!res.ok) {
      const data = await res.json();
      showFormError(data.error || 'Error al crear la tarea');
      return;
    }

    input.value = '';
    errorDiv.classList.add('d-none');
    loadTasks();
  } catch (err) {
    showFormError('No se pudo conectar con el servidor');
  }
});

async function loadTasks() {
  try {
    const res   = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error('Error cargando tareas:', err);
  }
}

function renderTasks(tasks) {
  const list         = document.getElementById('taskList');
  const emptyMessage = document.getElementById('emptyMessage');
  const countBadge   = document.getElementById('taskCount');

  list.innerHTML = '';
  countBadge.textContent = tasks.length;

  if (tasks.length === 0) {
    emptyMessage.classList.remove('d-none');
    return;
  }

  emptyMessage.classList.add('d-none');

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `card task-card mb-2 shadow-sm ${task.completed ? 'task-completed' : ''}`;

    card.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <span class="task-title fs-6">${escapeHtml(task.title)}</span>
          ${task.completed
            ? '<span class="badge bg-success ms-2">Completed</span>'
            : '<span class="badge bg-warning text-dark ms-2">Pending</span>'
          }
          <br/>
          <small class="text-muted">${formatDate(task.created_at)}</small>
        </div>
        <div class="d-flex gap-2">
          <button
            class="btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'}"
            onclick="toggleTask(${task.id})"
          >
            ${task.completed ? 'Undo' : '✓ Done'}
          </button>
          <button
            class="btn btn-sm btn-danger"
            onclick="deleteTask(${task.id})"
          >
            Delete
          </button>
        </div>
      </div>
    `;

    list.appendChild(card);
  });
}

async function toggleTask(id) {
  try {
    const res = await fetch(`${API_URL}/${id}/toggle`, { method: 'PUT' });
    if (res.ok) loadTasks();
  } catch (err) {
    alert('Error al actualizar la tarea');
  }
}

async function deleteTask(id) {
  if (!confirm('¿Seguro que quieres eliminar esta tarea?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) loadTasks();
  } catch (err) {
    alert('Error al eliminar la tarea');
  }
}

function showFormError(msg) {
  const errorDiv = document.getElementById('formError');
  errorDiv.textContent = msg;
  errorDiv.classList.remove('d-none');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}
