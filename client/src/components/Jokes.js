import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import dad from '../img/dad.jpg';

const JokeContainer = styled.div`
  background-image: url(${dad});
  background-size: cover;
  color: white;
  height: 100vh;
  padding-top: 200px;
  font-size: 3rem;

  h2 {
    text-decoration: underline;
  }
`

class Jokes extends React.Component {
  state = {
    jokes: [],
    currentJoke: null,
    error: null,
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
      this.setState({ jokes: res.data}, 
        this.getRandom
      )
    })
      .catch(err => {
        this.setState({error: err.message})
      })
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.jokes.length) {

  //     this.setState({ randomJoke: })
  //   }
  // }

  getRandom = () => {
    const ranNum = Math.floor(Math.random() * this.state.jokes.length);
    this.setState({ currentJoke: this.state.jokes[ranNum] })
    
  }
        // <ul>
        //       {this.state.jokes.map(j => <li key={j.id}>{j.joke}</li>)}
        // </ul>

  render() {
    // const ranNum = this.getRandom();
    
    if (this.state.error) return <h1>{this.state.error}</h1>
    if (!this.state.currentJoke) return <h1>loading</h1>
    return (
      <JokeContainer>
        <h2>Oh, Dad...</h2>
        <h3>{this.state.currentJoke.joke}</h3>
        <button onClick={this.getRandom}>Want another one?</button>
      </JokeContainer>
    );
  }
}

export default Jokes;
