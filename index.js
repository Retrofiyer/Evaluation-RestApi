const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send("Hola mundo")
});

const readData = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, './db.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error para leer el JSON:', error);
    return { usuario: [] };
  }
};

app.get('/pelis', async (req, res) => {
  const peliculas = await readData();
  res.json(peliculas.peliculas);
});

app.get('/pelis/:id', async (req, res) => {
  const data = await readData();
  const id = parseInt(req.params.id);
  const peli = data.usuario.find((peli) => peli.id === id);
  if (peli) {
    res.json(peli);
  } else {
    res.status(404).json({ message: 'Pelicula no encontrada' });
  }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}...`);
  });