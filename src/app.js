const express = require('express');
const readJsonData = require('./utils/fs/readJsonData');

const app = express();
app.use(express.json());

const movies = [
  {
    id: 1,
    movie: 'Avatar',
    price: 5,
  },
  {
    id: 2,
    movie: 'Gente Grande',
    price: 2,
  },
  {
    id: 3,
    movie: 'O Jogo',
    price: 3,
  },
  {
    id: 4,
    movie: 'Quebrando a Banca',
    price: 5,
  },
  {
    id: 5,
    movie: 'Lilo & Stitch',
    price: 2,
  },
  {
    id: 6,
    movie: 'Os Fantasmas se Divertem',
    price: 2,
  },
  {
    id: 7,
    movie: 'Meninas Malvadas',
    price: 3,
  },
];

// Lista todos os filmes
app.get('/movies', async (req, res) => {
  const moviesA = await readJsonData('src/movies.json');
  res.status(200).json(moviesA);
});

// Lista apenas o filme do ID solicitado
app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const movieById = movies.find((movie) => Number(id) === movie.id);

  if (!movieById) return res.status(404).json({ message: 'Filme não encontrado' });
  res.status(200).json(movieById);
});

// Cadastra um filme com POST
app.post('/movies', async (req, res) => {
  const { movie, price } = req.body;
  const newMovie = { id: movies.length + 1, movie, price };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Edita um filme com PUT
app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const { movie, price } = { ...req.body };

  const updatedMovie = movies.find((movieId) => Number(id) === movieId.id);
  if (!updatedMovie) return res.status(404).json({ message: 'Filme não encontrado' });

  updatedMovie.movie = movie;
  updatedMovie.price = price;

  res.status(200).json(updatedMovie);
});

// Deleta um filme com DELETE
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const deletedMovieIndex = movies.findIndex((movieId) => Number(id) === movieId.id);
  if (!deletedMovieIndex) return res.status(404).json({ message: 'Filme não encontrado' });  

  movies.splice(deletedMovieIndex, 1);

  res.status(200).json({ message: 'Filme deletado com sucesso' });
});

module.exports = app;