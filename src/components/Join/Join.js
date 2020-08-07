import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Input, Divider, Button } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import './Join.css';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  return (
    <div className="joinOuterContainer">
      <Card color='green'>
        <Card.Content>
          <h2 className="heading">WHATSAPPN'T</h2>
          <Divider />

          <Input focus autoFocus placeholder="Name" type="text" onChange={(event) => setUsername(event.target.value)} />

          <Input focus placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)} />
          {(!username || !room)
            ? (<Button primary onClick={() => Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Enter a Username and a Room',
            })} >
              Join
              </Button>)
            : (<Button primary as={Link} to={`/chat?username=${username}&room=${room}`} >
              Join
              </Button>)}
        </Card.Content>

      </Card>
    </div >
  );
}