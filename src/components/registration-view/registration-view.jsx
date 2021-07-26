import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props){
  //useState() returns a stateful value and a function to update it
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    //send a request to the server for authentication
    //THEN call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };
  return (
    <Form>
      <Form.Group controlId = "formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control type = "text" onChange = {e => setUsername(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId = "formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type = "text" onChange = {e => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId = "formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control type = "text" onChange = {e => setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId = "formBirthday">
        <Form.Label>Username: </Form.Label>
        <Form.Control type = "text" onChange = {e => setBirthday(e.target.value)}/>
      </Form.Group>
      <Button variant = "primary" type = "submit" onClick = {handleSubmit}>Submit</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};