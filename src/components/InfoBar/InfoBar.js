import React from 'react'
import { Icon } from 'semantic-ui-react'
import './InfoBar.css'

const InfoBar = ({ room, username }) => {

    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <h3> <Icon name='caret right' inverted />{room} </h3>
            </div>
            <div className='rightInnerContainer'>
                <a href='/'><Icon name='close' inverted size='large' /></a>
            </div>
        </div>

    )
}
export default InfoBar