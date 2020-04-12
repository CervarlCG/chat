import React, {Component} from 'react';
import {Input, Button} from 'antd';
import './Login.css';

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            user: ''
        }
        this.socket = this.props.socket;
    }
    render()
    {
        return(
        <div className="login-form">
            <Input 
                onChange={this.handleChange} 
                placeholder="Nick name"
                onPressEnter={this.handleLogin}
            />
            <br/>
            <br/>
            <Button 
                onClick={this.handleLogin} 
                type="primary" 
                style={{width: '100%'}}
                >
                    Login
            </Button>
        </div>)
    }

    handleChange = (e) =>
    {
        let user = e.target.value;
        this.setState({
            user: user
        });
    }

    handleLogin = () =>{
        if(this.state.user && this.state.user.trim() !== '')
        {
            let user = this.state.user;
            this.socket.emit('login',{user : user});
            this.socket.on('success login', (data) =>{
                console.log('Loggin sucees : ', data);
                this.props.handleLogin(data);
            });
        }
    }
}

export default Login;