import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Button} from 'react-bootstrap';


export function GenreView(props){
  return (
    <Container>
      <Row className = "justify-content-md-center">
        <Col md = {8}>{props.genre.Name}</Col>
      </Row>
      <Row className = "justify-content-md-center">
        <Col md = {8}>{props.genre.Description}</Col>
      </Row>
    </Container>
  );
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};