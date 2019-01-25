import React from 'react';
import axios from 'axios';

class Jokes extends React.Component {
  state = {
    jokes: [],
  };

  componentDidMount() {
    const ax = axios.create({
      withCredentials: true,
      headers: {
        authorization: localStorage.getItem('jwt'),
      },
      baseURL: 'http://localhost:3300/api/jokes',
    });
    ax.get('/').then(res => {
      console.log(res);
      
      this.setState({ jokes: res.data });
    });
  }
  render() {
    return (
      <div>
        <h2>Oh, Dad...</h2>
        <ul>
              {this.state.jokes.map(j => <li key={j.id}>{j.joke}</li>)}
        </ul>
      </div>
    );
  }
}

export default Jokes;
