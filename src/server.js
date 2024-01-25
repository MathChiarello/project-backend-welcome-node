const app = require('./app');
// const readJsonData = require('./utils/fs/readJsonData');

app.listen(3001, console.log('Rodando com sucesso!'));

app.get('/', (_req, res) => {
  res.send();
});

// readJsonData('src/movies.json');