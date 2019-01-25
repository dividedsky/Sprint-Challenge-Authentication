const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

const { authenticate, generateToken } = require('../auth/authenticate');

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

async function login(req, res) {
  // implement user login
  try {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({error: 'please supply a username and password'});
    return null;
  }
  const user = await db('users').where({username: req.body.username}).first();
  console.log((user));
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    
    const token = generateToken(req.body);
    res.status(200).json({message: `welcome back, ${user.username}`, token: token});
  } else {
    res.status(401).json({ error: 'you shall not pass! invalid username or password' });
  }
  } catch(err) {
    res.status(500).json({ error: `we had an error! ${err}` })
  }
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
