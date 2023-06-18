const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
  { id: 1, description: 'Hacer la compra', completed: false },
  { id: 2, description: 'Lavar el coche', completed: true },
  { id: 3, description: 'Hacer ejercicio', completed: false }
];

// Ruta GET para obtener la lista de tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Ruta GET para obtener una tarea específica por su ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    res.json(task);
  }
});

// Ruta POST para crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { description } = req.body;

  if (!description) {
    res.status(400).json({ error: 'La descripción de la tarea es requerida' });
  } else {
    const newTask = {
      id: tasks.length + 1,
      description,
      completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
  }
});

// Ruta PUT para actualizar una tarea existente
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { description, completed } = req.body;

  let task = tasks.find(task => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    res.json(task);
  }
});

// Ruta DELETE para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask[0]);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
