import React from 'react';
import {Dropdown, Button, Container, Row, Col} from 'react-bootstrap';
import './Menu.css';
import {algorithmSpeed} from '../PathfindingVisualizer/PathfindingVisualizer';
import Legend from './Legend/Legend';

//descriptions for algorithm
const AlgorithmDescription = {
  djikstra:
    "Djikstra's algorithm is a WEIGHTED algorithm and gauruntees the shortest path!",
  depthFirstSearch:
    'Depth First Search is an UNWEIGHTED algorithm and does not gauruntee the shortest path',
  breadthFirstSearch:
    'Breadth First Search is an UNWEIGHTED algorithm and gauruntees the shortest path',
};

const Menu = props => {
  let algorithmSelected = props.algorithmSelected;
  let algorithmDescription = null;

  if (algorithmSelected === 'djikstra') {
    algorithmDescription = AlgorithmDescription.djikstra;
  } else if (algorithmSelected === 'depthFirstSearch') {
    algorithmDescription = AlgorithmDescription.depthFirstSearch;
  } else if (algorithmSelected === 'breadthFirstSearch') {
    algorithmDescription = AlgorithmDescription.breadthFirstSearch;
  } else if (algorithmSelected === null) {
    algorithmDescription = 'Please choose an algorithm to visualize!';
  }

  return (
    <React.Fragment>
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
                  Choose Graph Algorithm
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
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Generate Maze
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => props.generateMaze()}>
                    Recursive Division Algorithm
                  </Dropdown.Item>
                  <Dropdown.Item>###########</Dropdown.Item>
                  <Dropdown.Item>###########</Dropdown.Item>
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
                onClick={() =>
                  props.visualizeAlgorithm(props.algorithmSelected)
                }
                disabled={props.algorithmInProgress}
                variant="success"
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
                  <Dropdown.Item onClick={() => props.setWall('normal')}>
                    Normal
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => props.setWall('2x')}
                    disabled={!props.algorithmWeighted}
                  >
                    Weighted
                  </Dropdown.Item>
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
          <div className="algorithmDescription">
            <strong>{algorithmDescription}</strong>
          </div>
        </Container>
      </div>
      <Legend className="legend"></Legend>
    </React.Fragment>
  );
};

export default Menu;
