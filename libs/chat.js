class Chat
{
    constructor(server)
    {
        this.io = require('socket.io')(server);
        this.connectedUsers = [];
        
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
            let user = {
                nick: data.user,
                id: socket.id
            }
            this.addUser(user);
            this.onMessages(socket);
            this.onGetUsers(socket);
            this.onDisconnect(socket);
            socket.emit('success login', user);
            this.io.emit('users', [user]);
            this.debug('Connection established')
            this.debug(user);
        });
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
            socket.emit('users', this.connectedUsers);
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
            this.removeUser(socket.id);
            this.io.emit('user disconnected', socket.id);
            this.debug('The socket ' + socket.id + ' is disconnected');

        })
    }

    addUser(user)
    {
        this.connectedUsers.push(user);
    }

    removeUser(id)
    {
        this.connectedUsers = this.connectedUsers.filter(element => element.id !== id);
    }

    debug(data)
    {
        console.log(data);
    }
}

module.exports = Chat;