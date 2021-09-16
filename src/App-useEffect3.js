import "./App-useEffect.css";
import React, { useState, useEffect } from "react";

// USE EFFECT HOOK EXAMPLE 2 NOTES
// Video Tutorial: ?
// Hooks and Class Equivalents: https://medium.com/soluto-engineering/react-class-features-vs-hooks-equivalents-745368dafdb3
// Docs: https://reactjs.org/docs/hooks-intro.html

function App() {
  // window.innerWidth => int pixels interior width of browser window
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // note order of console logs on render/window resize: 'a', 'b', 'c', 'a', d', 'b', e' !!
  // console.log('a');

  const handleResize = () => {
    // console.log('d');
    setWindowWidth(window.innerWidth);
    // console.log('e');
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // console.log('c');

    // callback runs everytime component is "unMounted" or before useEffect runs again (doesn't run for initial 1st run)
    return () => {
      console.log("f"); // doesn't show up on window resize, because useEffect only runs once on mount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log('b');

  return <div className="App">{windowWidth}</div>;
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

// 2) note order of console logs 'a', 'b', 'c', 'a', d', 'b', e' !!!
