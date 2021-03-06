import "./App-useEffect.css";
import React, { useState, useEffect } from "react";

// USE EFFECT HOOK EXAMPLE 1 NOTES
// Video Tutorial: ?
// Hooks and Class Equivalents: https://medium.com/soluto-engineering/react-class-features-vs-hooks-equivalents-745368dafdb3
// Docs: https://reactjs.org/docs/hooks-intro.html

function App() {
  const [resourceType, setResourceType] = useState("posts");

  // console.log('a');

  const [items, setItems] = useState([]);

  // cb will run everytime App function renders (if no array is passed in)
  useEffect(() => {
    console.log("render");

    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [resourceType]);
  // no array   = cb runs everytime any resource updates
  // []         = componentDidMount  = cb runs once after initial render
  // [resource] = componentDidUpdate = cb runs after initial render,
  //              then runs after everytime specified resource changes

  // console.log('b');

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("users")}>Users</button>
        <button onClick={() => setResourceType("comments")}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
      {items.map((item, i) => (
        <div key={i}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}

export default App;

// NOTES
// 1) useEffect(cb, [])  =>  cb
//    - when you want to render only on mounting, or specific resource changes/updates
//    - similar to componentDidUpdate, or componentDidMount in class components
//    Parameters:
//    - cb = callback
//    - [] = array
//         no array   = cb runs everytime any resource updates
//         []         = componentDidMount  = cb runs once
//         [resource] = componentDidUpdate = cb runs after initil render,
//                      then runs after everytime specified resource changes
//          - if No array passed in, cb runs after EVERYTIME component renders
//          - if Empty array passed in, cb runs only ONCE after component initially renders
//          - if Non empty array passed in, cb runs after initial render,
//            then runs after everytime specified resource changes
//    Returns:
//    - cb = callback that's called whenever the component "unMounts"
//         - or runs everytime before the actual setup code
//         - can think of it as "cleanup", so everytime useEffect is run
//           the cb is run first to "cleanup" the previous code
//         - good for removing event listeners
