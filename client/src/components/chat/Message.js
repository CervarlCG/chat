import React, {Component} from 'react';
import './Message.css';
class Message extends Component
{
    constructor(props)
    {
        super(props);
        this.style = {}
        this.style.backgroundColor = (this.props.message.type === 'primary' ? '#03A9F4' : '#78909C');
        this.style.float = (this.props.message.type === 'primary' ? 'right' : 'left');
    }
    render()
    {
        return(
            <div className="chat-msg">
                <div className="chat-msg-content" style={this.style}>
                    {
                        this.props.showUserName ?
                            <React.Fragment>
                                <span className="chat-msg-from">{this.props.message.from.nick}</span>
                                <br/>
                            </React.Fragment>
                            :
                            null
                    }
                    {this.props.message.msg}
                </div>
            </div>
        )
    }
}

export default Message;