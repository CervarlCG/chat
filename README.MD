# Basic global chat with Socket.IO

This is a basic backend chat for a global room where the users can send a receive messages.

Current features:
1. Basic login based on runtime (Not storage)
2. Send and receive text messages. (Not storage)

## Usage

```
npm install
```
The main lib is in /lib/chat.js


The first event that the chat listen is 'connection', this event is called when the user do a connection, the next event that the chat listen is 'login', this event expect a object with the next format:

{
    
    user : 'String value'
}

This event return a event to the client called 'success login' if the login was success with the next data:

{

    user : 'String with the username'
    id: 'String with the runtime id of the user'
} 

If the login was failed, then the server return the event 'failed login' without data.

### client events
Now the client is ready to listening the next events 

#### 'receive messages' event
Receive a object with a message with the next format:

{

    id: 'id of the message',
    msg: 'String with the message',
    from: {
        nick : 'user that send the message'
        id: 'String with the runtime id of the user'
    },
    type : 'txt | img'

}

if the type is img then the msg content is the url to the image, only accept jpeg, png and gif.

The image sended to the server is managment by socket-io-file-client, it's a npm module

### 'failed message' event
This event receive the msg that can't be process by the server because it has a bad structure


#### 'users' event
This event receive a a array of new users connected with the next format:

[
    
    {
        user : 'String with the username'
        id: 'String with the runtime id of the user'
    },
    ...
]
#### 'user disconnected'
This event receive a string with the id of the user disconnected.

### Server side
After the login, the backend server is listening the next events:

#### 'message' event 
This event receive a object with the next format

{
    msg: 'String with the message'
}

#### 'get users' event
This event not receive any data, but return a array of objects of all users connected with the next format:

[
    
    {
        user : 'String with the username'
        id: 'String with the runtime id of the user'
    },
    ...
]

#### 'disconnect' event
This event is called when the user close the socket connection

## Client example
for a client example you can found a folder called "client", it is a react application.