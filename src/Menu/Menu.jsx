import React from 'react';
import {Dropdown, Button, Container, Row, Col} from 'react-bootstrap';
import './Menu.css';
import {algorithmSpeed} from '../PathfindingVisualizer/PathfindingVisualizer';

const Menu = props => {
  return (
    <div className="menu">
      <img
        src="https://images.cooltext.com/5368723.png"
        width="524"
        height="90"
        alt="Graph Visualz"
        className="title"
      />
      <Container>
        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Choose Algorithm
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => props.setAlgorithm('djikstra')}>
                  Djikstra
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setAlgorithm('depthFirstSearch')}
                >
                  Depth First Search
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setAlgorithm('breadthFirstSearch')}
                >
                  Breadth First Search
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Button
              onClick={() => props.resetGrid()}
              disabled={props.algorithmInProgress}
            >
              Reset Grid
            </Button>
          </Col>
          <Col>
            <Button
              className="button"
              onClick={() => props.visualizeAlgorithm(props.algorithmSelected)}
              disabled={props.algorithmInProgress}
              variant="success"
              size="lg"
            >
              Visualize {props.algorithmSelected}
            </Button>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Wall
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Normal</Dropdown.Item>
                <Dropdown.Item>2x Weighted</Dropdown.Item>
                <Dropdown.Item>3x Weighted</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Speed
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => props.setSpeed(algorithmSpeed.SLOW)}
                >
                  Slow
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setSpeed(algorithmSpeed.MEDIUM)}
                >
                  Medium
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setSpeed(algorithmSpeed.FAST)}
                >
                  Fast
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Menu;
