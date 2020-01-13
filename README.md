# VisuallyGraphic
A web application created using React that visually demonstrates graph traversal algorithms. **View the application [here](https://franksu1996.github.io/VisuallyGraphic/)**
Currently includes:
* [Djikstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) - a weighted graph traversal algorithm used to find the shortest path between nodes
* [Depth First Search](https://en.wikipedia.org/wiki/Depth-first_search) - non-weighted graph traversal algorithm that does not gauruntee the shortest path
* [Breadth First Search](https://en.wikipedia.org/wiki/Breadth-first_search) - a non-weighted graph traversal algorithm that gauruntees the shortest path

## Tutorial
When the application loads, click and drag the arrow/bullseye to set the starting/finish nodes. To Place walls that block the traversal of the algorithms, first select the type of wall (normal, weighted), then click and drag through any nodes on the screen. Finally, select an algorithm, choose the speed at which the algorithm will run at, and click the visualize button. Sit back, and enjoy the magic!

**Note**: In order to select weighted walls, you must select a weighted algorithm (Djikstra). 

Known bugs: 
  1. There is currently a small bug regarding wall placements and start/finish node placements. Sometimes, even when the left-mouse click is released, the onMouseUp() event listener is not firing properly. If this happens, simply click once anywhere. To avoid this, simply perform drag-and-drop operations slowly. Not sure why this is happening :(
  2. Although The Recursive Division Maze algorithm looks like it's working, the implementation is not quite 100% correct, as there are some unreachable parts sometimes. Will try and fix in the future!
