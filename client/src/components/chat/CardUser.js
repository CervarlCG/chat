import React, {Component} from 'react';
import {UserOutlined} from '@ant-design/icons';
import './CardUser.css';

class CardUser extends Component
{
    render()
    {
        return(
            <div className="card-user">
                <UserOutlined style={{fontSize: '16px'}}/> {this.props.nick}
            </div>
        )
    }
}

export default CardUser;