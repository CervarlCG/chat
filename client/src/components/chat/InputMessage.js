import React, {Component} from 'react'
import {Input, Button} from 'antd';
import {SendOutlined} from '@ant-design/icons';
import './InputMessage.css';
class InputMessage extends Component
{

    constructor(props)
    {
        super(props);
        this.socket = this.props.socket;
        this.state = {
            text: ''
        }
    }

    render()
    {
        return(
            <div className="input-message">
                <Input className="input-message-input" 
                    onPressEnter={this.handleSend} 
                    value={this.state.text}
                    onChange={this.handleChange}
                    maxLength={255}
                    placeholder="Type a message..."/>
                    {
                        this.state.text !== ''?
                        <Button shape="circle-outline" icon={<SendOutlined />} onClick={this.handleSend}></Button>
                        :
                        null
                    }
                
            </div>
        )
    }

    handleSend = () =>
    {
        if(this.props.handleSend)
        {
            this.props.handleSend(this.state.text);
            this.setState({
                text : ''
            })
        }
    }

    handleChange = (e) =>
    {
        let value = e.target.value;
        this.setState({text: value});
    }
}

export default InputMessage;