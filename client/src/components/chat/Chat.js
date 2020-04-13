import React, {Component} from 'react';
import Message from './Message';
import InputMessage from './InputMessage';
import CardUser from './CardUser';
import {Layout} from 'antd';
import {Typography, message} from 'antd';
import './Chat.css';

const {Header, Footer, Sider, Content} = Layout;
const {Title} = Typography;
class Chat extends Component{
    
    constructor(props)
    {
        super(props);
        this.socket = this.props.socket;
        this.user = this.props.user;
        this.state = {
            messages: [],
            chatName: 'Chat',
            users: []
        }
    }
    
    render()
    {
        return (
            <Layout style={{height: '100vh'}}>
                    <Sider className="panel">
                            <Title level={4}>Users</Title>
                            {
                                this.state.users.map((element) =>{
                                    if(element.id === this.user.id) return null;
                                    return (
                                        <CardUser nick={element.nick} key={element.id}/>
                                    );
                                })
                            }
                    </Sider>
                    <Layout style={{backgroundColor: '#fff'}}>
                    <Header style={{padding: '0px'}}>
                        <div className="chat-header">
                            <Title level={2}>{this.state.chatName}</Title>
                        </div>
                    </Header>
                    <Content className="chat-content">
                        <div className="chat-body">
                            {/* Container with all messages  */}
                            <div className="chat-messages">
                                {
                                    this.state.messages.map((element) =>{
                                        let type = element.from.id === this.user.id? 'primary' : 'secondary';
                                        let showUserName = element.from.id !== this.user.id;
                                        let message = {
                                            type : type,
                                            msg : element.msg,
                                            from : element.from
                                        }
                                        return <Message message={message} showUserName={showUserName} key={element.id}/>
                                    })
                                }
                            </div>
                        </div>
                        {/* The input where the user write the messages */}
                            <InputMessage handleSend={this.send}/>
                    </Content>
                    </Layout>
            </Layout>
            
        )
    }

    componentDidMount()
    {
        //Init the events on the socket
        this.socket.on('receive messages', this.onReceiveMessages);
        this.socket.on('users', this.onUsers);        
        this.socket.on('user disconnected', this.onUserDisconnected);
        this.socket.on('failed message', this.onFailedMessage);
        //Requesting all users in the chat
        this.socket.emit('get users');
    }

    /**
     * This function send the menssage to the server
     * @value message to send
     */
    send = (value) =>{
        if(this.socket && value.trim() !== '')
        {
            let msg = {
                id : Date.now(),
                msg : value,
                from : this.user
            }
            this.setState({
                messages: [...this.state.messages, msg],
                send: ''
            })
            this.socket.emit('message', {msg: value});
        }
    }

    /**
     * This function receive a new message 
     * @data is the objest than contain the message
     */
    onReceiveMessages = (message) =>
    {
        if(message.from.id !== this.user.id)
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    /**
     * This function receive a array of the new users connected
     * @users Array than contain all the new users
     */
    onUsers = (users) =>
    {
        this.setState({
            users: [...this.state.users, ...users]
        })
    }

    /**
     * This function receive the data of a user that was disconnected
     * @userID object than contain information of the user
     */
    onUserDisconnected = (userID) =>
    {
        let newUsers = this.state.users.filter(element => element.id !== userID);
        this.setState({
            users: newUsers
        })
    }
    /**
     * This function catch if the server was a error processing the message
     * @param {object} msg the object sended to the server
     */
    onFailedMessage = (msg) =>
    {
        message.error('Failed to send message');
    }
}

export default Chat;