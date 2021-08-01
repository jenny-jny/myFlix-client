import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Button} from 'react-bootstrap';


export function DirectorView(props){
  return (
    <Container>
      <Row>
        <Col md = {8}>
          <Button onClick = {() => props.onBackClick()}>Back</Button>
        </Col>
      </Row>
      <Row className = "justify-content-md-center">
        <Col md = {8}>{props.director.Name}</Col>
      </Row>
      <Row className = "justify-content-md-center">
        <Col md = {8}>{props.director.Bio}</Col>
      </Row>
      <Row className = "justify-content-md-center">
        <Col md = {8}>
          <div className = "director-birth">
            <span className = "label">Born in </span>
            <span className = "value">{props.director.Birth}</span>
          </div>
        </Col>
      </Row>
      <Row className = "justify-content-md-center">
        <Col md = {8}>
          <div className = "director-death">
            <span className = "label">Died in </span>
            <span className = "value">{props.director.Death}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};