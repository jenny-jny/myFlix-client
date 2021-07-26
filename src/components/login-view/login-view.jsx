import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function LoginView(props){
  //useState() returns a stateful value and a function to update it
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
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
          <Form>
            <Form.Group controlId = "formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control type = "text" onChange = {e => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId = "formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control type = "text" onChange = {e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant = "primary" type = "submit" onClick = {handleSubmit}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};