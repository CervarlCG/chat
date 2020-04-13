const Validate = require('./validate');
const Users = require('./users');

class Chat
{
    constructor(server)
    {
        this.io = require('socket.io')(server);
        this.validate = new Validate();
        this.users = new Users();
    }

    /**
     * This function init the chat
     */
    start()
    {
        this.io.on('connection', (socket) =>{
            this.onLogin(socket);
        })
    }

    /**
     * This function catch the login event and init all event for the new users
     * @param {object} socket The socket connection 
     */
    onLogin(socket)
    {
        socket.on('login', (data) =>{
            if(data.user && this.validate.user(data.user))
            {
                let user = {
                    nick: data.user,
                    id: socket.id
                }
                this.users.add(user);
                this.initChatEvents(socket);
                socket.emit('success login', user);
                this.io.emit('users', [user]);
                this.debug('Connection established')
                this.debug(user);
            }else{
                socket.emit('failed login');
            }   
        });
    }

    initChatEvents(socket)
    {
        this.onMessages(socket);
        this.onGetUsers(socket);
        this.onDisconnect(socket);
    }
    /**
     *  This function catch the 'message' event
     * @param {object} socket The socket connection
     */
    onMessages(socket)
    {
        socket.on('message', (data) =>{
            this.io.emit('receive messages', data);
            this.debug('Message received');
            this.debug(data);
        });
    }

    /**
     * This function catch the 'get users' event
     * @param {object} socket The socket connection 
     */
    onGetUsers(socket)
    {
        socket.on('get users', () =>{
            socket.emit('users', this.users.get());
        });
    }

    /**
     * This function catch when the user is disconnected
     * @param {object} socket The Socket connection
     */
    onDisconnect(socket)
    {
        socket.on('disconnect', () =>
        {
            this.users.remove(socket.id);
            this.io.emit('user disconnected', socket.id);
            this.debug('The socket ' + socket.id + ' is disconnected');

        })
    }

    debug(data)
    {
        console.log(data);
    }
}

module.exports = Chat;