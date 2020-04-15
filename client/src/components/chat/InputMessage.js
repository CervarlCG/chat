import React, {Component} from 'react'
import {Input, Button} from 'antd';
import {SendOutlined, FileImageOutlined} from '@ant-design/icons';
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
                    <Button shape="circle-outline" icon={<FileImageOutlined />} className="input-message-icon" onClick={this.callFile}></Button>
                    {
                        this.state.text !== ''?
                        <Button shape="circle-outline" icon={<SendOutlined />} className="input-message-icon" onClick={this.handleSend}></Button>
                        :
                        null
                    }
                    <input type="file" id="img" onChange={this.sendIMG} style={{display: 'none'}}
                    accept="image/gif, image/png, image/jpeg"
                    />
                
            </div>
        )
    }

    callFile = () =>
    {
        document.getElementById('img').click();
    }
    sendIMG = () =>{
        let img = document.getElementById('img');
        this.props.socketIMG.upload(img, {})
        let reader = new FileReader();

        reader.onloadend = () =>{
            this.props.handleSend(reader.result, 'img');
        }

        reader.readAsDataURL(img.files[0]);
        
    }

    handleSend = () =>
    {
        if(this.props.handleSend)
        {
            this.props.handleSend(this.state.text, 'txt');
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