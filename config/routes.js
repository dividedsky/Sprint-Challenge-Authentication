const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: 'user must submit username and password' });
    return null;
  }
  // hash password, then add user to db
  req.body.password = bcrypt.hashSync(req.body.password, 14);
  db('users').insert(req.body)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => {
      res.status(500).json({error: `there was an error updating the db: ${err}`})
    })
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
