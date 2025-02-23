import express, { json } from "express";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FILE_PATH = join(__dirname, "tareas.json");

app.use(json());

const leerTareas = () => {
  if (!existsSync(FILE_PATH)) {
    return [];
  }
  return JSON.parse(readFileSync(FILE_PATH, "utf-8"));
};

// Función para escribir tareas en el archivo JSON
const escribirTareas = (tareas) => {
  writeFileSync(FILE_PATH, JSON.stringify(tareas, null, 2));
};

// Obtener todas las tareas
app.get("/tareas", (req, res) => {
  const tareas = leerTareas();
  res.json(tareas);
});

// Obtener una tarea por ID
app.get("/tareas/:id", (req, res) => {
  const tareas = leerTareas();
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json(tarea);
});

// Crear una nueva tarea
app.post("/tareas", (req, res) => {
  const { titulo, descripcion } = req.body;
  if (!titulo || descripcion.length < 20) {
    return res.status(400).json({
      error:
        "El título es obligatorio y la descripción debe tener al menos 20 caracteres",
    });
  }
  const tareas = leerTareas();
  const nuevaTarea = {
    id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
    titulo,
    descripcion,
    completada: false,
    fecha_creacion: new Date().toISOString(),
  };
  tareas.push(nuevaTarea);
  escribirTareas(tareas);
  res.status(201).json(nuevaTarea);
});

// Actualizar una tarea existente
app.put("/tareas/:id", (req, res) => {
  const { titulo, descripcion, completada } = req.body;
  const tareas = leerTareas();
  const tareaIndex = tareas.findIndex((t) => t.id === parseInt(req.params.id));
  if (tareaIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  tareas[tareaIndex] = {
    ...tareas[tareaIndex],
    titulo: titulo || tareas[tareaIndex].titulo,
    descripcion: descripcion || tareas[tareaIndex].descripcion,
    completada:
      completada !== undefined ? completada : tareas[tareaIndex].completada,
  };
  escribirTareas(tareas);
  res.json(tareas[tareaIndex]);
});

// Eliminar una tarea por ID
app.delete("/tareas/:id", (req, res) => {
  const tareas = leerTareas();
  const nuevaLista = tareas.filter((t) => t.id !== parseInt(req.params.id));
  if (nuevaLista.length === tareas.length) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  escribirTareas(nuevaLista);
  res.json({ mensaje: "Tarea eliminada correctamente" });
});

// Manejar rutas no permitidas
app.all("*", (req, res) => {
  res.status(405).json({ error: "Método no permitido" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
