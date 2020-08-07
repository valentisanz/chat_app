import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

import './Chat.css'
let socket
const Chat = ({ location }) => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'https://whatsappnt.herokuapp.com/'

    useEffect(() => {
        const { username, room } = queryString.parse(location.search)
        socket = io(ENDPOINT)
        document.title = `'${room}' Room`
        setUsername(username)
        setRoom(room)

        socket.emit('join', { username, room }, () => {

        })

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', (users) => {
            setUsers(users);
        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [messages])
    const sendMessage = (event) => {
        event.preventDefault()
        if (message) socket.emit('sendMessage', message, () => setMessage(''))
    }
    console.log(users)
    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} />
                <Messages messages={messages} username={username} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            {/* <TextContainer users={users} /> */}
        </div>

    )
}
export default Chat