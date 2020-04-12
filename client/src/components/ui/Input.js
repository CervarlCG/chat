import React, {Component} from 'react';
import './Input.css'

class Input extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            value: ''
        }
    }
    render()
    {
        return(
            <div className="input-entry" style={this.props.style}>
                <input className="input" 
                    type={this.props.type}
                    onChange={this.handleChange} 
                    value={this.state.value}
                    onKeyUp={this.handleEnter}
                    placeholder={this.props.placeholder}
                    />
                {/*
                    this.props.icon ?
                        this.props.icon.map(icon =>{
                             return <i className={icon.name + " icon"} 
                            onClick={() => icon.callback(this.state.value)}>
                            </i>
                        })
                    
                    :
                    null
                    */}
                
            </div>
        )
    }

    handleEnter = (e) =>
    {
        if(e.keyCode === 13 && this.props.handleEnter)
        {
            this.props.handleEnter(this.state.value);
            this.setState({
                value: ''
            })
        }
    }

    handleChange = (e) =>{
        let value = e.target.value;
        this.setState({
            value: value
        }, () =>{
            if(this.props.handleChange)
                this.props.handleChange(this.state.value);
        });
    }
}

export default Input;