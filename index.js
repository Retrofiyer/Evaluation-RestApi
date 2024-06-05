const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send("Hello World")
});

const readData = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, './db.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error to read file:', error);
    return { movies: [] };
  }
};

app.get('/movies', async (req, res) => {
  const movies = await readData();
  res.json(movies.movies);
});

app.get('/movies/:id', async (req, res) => {
  const data = await readData();
  const id = parseInt(req.params.id);
  const movie = data.movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not find' });
  }
});

app.listen(port, () => {
    console.log(`Server listen in ${port}...`);
  });