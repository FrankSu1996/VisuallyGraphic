import React from 'react';
import {Dropdown, Button, Container, Row, Col} from 'react-bootstrap';

const Menu = props => {
  return (
    <Container>
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
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
            onClick={() => props.visualizeAlgorithm(props.algorithmSelected)}
            disabled={props.algorithmInProgress}
          >
            Visualize {props.algorithmSelected}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => props.resetGrid()}
            disabled={props.algorithmInProgress}
          >
            Reset Grid
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
