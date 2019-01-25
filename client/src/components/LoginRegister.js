import React from 'react';
import axios from 'axios';

class LoginRegister extends React.Component {
  state = {
    username: '',
    password: '',
  };

  clearForm = () => this.setState({username: '', password: ''})
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const ax = axios.create({
      withCredentials: true,
      headers: {
        authorization: localStorage.getItem('jwt'),
      },
      baseURL: 'http://localhost:3300/api/',
    });
    let url;
    if (this.props.login) url = 'login';
    else url = 'register';

    ax.post(url, this.state).then(res => {
      console.log(res.data.token);
      localStorage.setItem('jwt', res.data.token);
    });

    console.log('submit');
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginRegister;
