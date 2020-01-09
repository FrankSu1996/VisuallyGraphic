import React from 'react';
import {Dropdown, Button, Container, Row, Col} from 'react-bootstrap';
import '../../PathfindingVisualizer/Node/Node.css';
import Node from '../../PathfindingVisualizer/Node/Node';

const Legend = () => {
  return (
    <Container>
      <Row>
        <Col>
          <strong>Start Node </strong>
          <Node isStart="true"></Node>
        </Col>
        <Col>
          <strong>End Node </strong>
          <Node isFinish="true"></Node>
        </Col>
        <Col>
          <strong>Unvisited Node </strong>
          <Node></Node>
        </Col>
        <Col>
          <strong>Visited Node </strong>
          <Node isVisited="true"></Node>
        </Col>
        <Col>
          <strong>Wall Node </strong>
          <Node isWall="true"></Node>
        </Col>
        <Col>
          <strong>Weight Node </strong>
          <Node is2xWall="true"></Node>
        </Col>
      </Row>
    </Container>
  );
};

export default Legend;
