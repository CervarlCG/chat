import React from 'react';
import logo from './logo.svg';
import Chat from './components/chat/Chat';
import Login from './components/auth/Login';
import IO from 'socket.io-client';

import './App.css';

class App extends React.Component{
  
  constructor(props)
  {
    super(props)
    this.state = {
      user : null
    }

    this.socket = IO('http://localhost:3500');
  }

  render()
  {
    return(
    <div className="App">
      {
        this.state.user ? 
          <Chat socket={this.socket} user={this.state.user}/>
        :
          <Login socket={this.socket} handleLogin={this.handleLogin}/>
      }
      
    </div>);
  }

  handleLogin = (data) =>{
    this.setState({
      user: data
    })
  }
}
export default App;
