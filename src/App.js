import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <User />
      </header>
    </div>
  );
}

class User extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
      users: []
    };
  }

  componentDidUpdate() {

  }

  dismissError = () => {
    this.setState({ error: '' });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

  handleUserChange = (evt) => {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange = (evt) => {
    this.setState({
      password: evt.target.value,
    });
  }

  createUser = async () => {

    //event.preventDefault();

    let username = this.state.username;
    let password = this.state.password;

    await fetch("http://localhost:4000/users/create", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Created User");

  }

  updateUser = async () => {

    //event.preventDefault();

    let username = this.state.username;

    let password = this.state.password

    await fetch("http://localhost:4000/users/update", {
      method: "PUT",
      mode: 'cors',
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Updated User Password");

  }

  deleteUser = async () => {

    //event.preventDefault();

    let username = this.state.username;

    await fetch("http://localhost:4000/users/delete/" + username, {
      method: "DELETE",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Deleted User");

  }

  getUsers = async () => {
    //event.preventDefault();
    let userFetch = await fetch("http://localhost:4000/users/getAll");

    let userData = await userFetch.json();

    this.setState({ 
      users: userData.users 
    });

  }

  render() {
    return (
      <div className="Login">
        <h2>User CRUD</h2>
        <br></br>
        <h3>Add User</h3>
        <form>
          <label>User Name</label>
          <input type="text" value={this.state.username} onChange={this.handleUserChange} />

          <label>Password</label>
          <input type="password" value={this.state.password} onChange={this.handlePassChange} />

          <input type="button" value="Create User" onClick={this.createUser} />
        </form>

        <h3>Update User</h3>
        <form>
          <label>User Name</label>
          <input type="text" value={this.state.username} onChange={this.handleUserChange} />

          <label>Password</label>
          <input type="password" value={this.state.password} onChange={this.handlePassChange} />

          <input type="button" value="Update User" onClick={this.updateUser} />
        </form>

        <h3>Delete User</h3>
        <form >
          <label>User Name</label>
          <input type="text" value={this.state.username} onChange={this.handleUserChange} />

          <input type="button" value="Delete User" onClick={this.deleteUser} />
        </form>

        <h3>Get Users</h3>
        <form>

          <input type="button" value="Get Users" onClick={this.getUsers} />
        </form>
        <div className="UserData">
          <ul>
            {this.state.users.map((user) => (
              <li key={user.username}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
