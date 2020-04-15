const socketIOFile = require('socket.io-file');
const Validate = require('./validate');
const Users = require('./users');
const path = require('path');

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
                socket.broadcast.emit('users', [user]);
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
        this.onImage(socket);
    }
    /**
     *  This function catch the 'message' event
     * @param {object} socket The socket connection
     */
    onMessages(socket)
    {
        socket.on('message', (msg) =>{
            this.sendMessage(socket, 'txt', msg.msg);
        });
    }

    sendMessage(socket, type, text)
    {
        let from = this.users.get(socket.id);
        let message = {
            id: Date.now(),
            msg: text,
            from: from,
            type: type
        }
        if(from && this.validate.message(message))
        {
            socket.broadcast.emit('receive messages', message);
            this.debug('Message received');
            this.debug(message);
        }else{
            socket.emit('failed message', message);
        }
    }

    onImage(socket)
    {
        let imgUploader = new socketIOFile(socket, {
            uploadDir: __dirname + '/../public/images',
            maxFileSize: 4194304,
            chunkSize: 10240,
            transmissionDelay: 0,
            overwrite : true,
            rename : (filename, fileinfo) => {
                const file = path.parse(filename);
                const ext = file.ext;
                return Date.now() + ext;
            },
            accepts: ['image/png', 'image/jpeg', 'image/gif']
        });

        imgUploader.on('start', (fileInfo) => {
            this.debug('Start uploading');
            this.debug(fileInfo);
        })

        imgUploader.on('stream', (fileInfo) =>{
            //console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
        })

        imgUploader.on('complete', (fileInfo) => {
            //console.log('Upload Complete.');
            //console.log(fileInfo);
            let type = 'img';
            let text = global.serverAddr + '/images/' + fileInfo.name;
            this.sendMessage(socket, type, text);
            
        });

        imgUploader.on('error', (err) => {
            //console.log('Error!', err);
        });

        imgUploader.on('abort', (fileInfo) => {
            //console.log('Aborted: ', fileInfo);
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
            socket.broadcast.emit('user disconnected', socket.id);
            this.debug('The socket ' + socket.id + ' is disconnected');

        })
    }

    debug(data)
    {
        console.log(data);
    }
}

module.exports = Chat;