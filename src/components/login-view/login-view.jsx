import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

export function LoginView(props){
  //useState() returns a stateful value and a function to update it
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false){
      //??????????????????????????????????????????????????????????
    }
    console.log(username, password);
    setValidated(true);
    //send a request to the server for authentication
    axios.post('https://jny-myflix.herokuapp.com/login', {
      Username: username,
      Password: password
    }).then(response => {
      const data = response.data;
      //THEN call props.onLoggedIn(username)
      props.onLoggedIn(data);
    }).catch(() => {
      console.log('no such user');
    });
  };

  return (
    <Container>
      <Row className = "justify-content-md-center">
        <Col md = {8}>
          <Form noValidate validated = {validated} onSubmit = {handleSubmit}>
            <Form.Group controlId = "formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control type = "text" isInvalid = {/[^0-9a-zA-Z]/.test(username) || username.length < 5} onChange = {e => setUsername(e.target.value)} required/>
              <Form.Control.Feedback type = "invalid">Please enter a username</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId = "formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control type = "password" onChange = {e => setPassword(e.target.value)} required/>
              <Form.Control.Feedback type = "invalid">Please enter a password</Form.Control.Feedback>
            </Form.Group>
            <Button variant = "primary" type = "submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};