import './App.css';
import React, { useState } from 'react';

// USE STATE HOOK NOTES
// Video Tutorial: https://www.youtube.com/watch?v=O6P86uwfdR0&t=665s
// Hooks and Class Equivalents: https://medium.com/soluto-engineering/react-class-features-vs-hooks-equivalents-745368dafdb3
// Docs: https://reactjs.org/docs/hooks-intro.html

function App() {
  // - destructuring array/create two variables called count and setCount
  //   set them equal to values inside of array that's returned by useState
  // - useState always returns array with two values
  // const [ count, setCount ] = useState(0);      // useState(initialState)
  function countInitial() {
    console.log('count initial');
    return 0;
  }

  // const [ count, setCount ] = useState(countInitial());        // will run everytime function renders
  // const [ count, setCount ] = useState(() => countInitial());  // will run only once! on initial render

  const [ state, setState ] = useState({count:4, theme:'blue'});  
  const { count, theme } = state;


  function decrementCount() {
    // even though two setCounts, we're only decreasing by 1
    // setCount(count - 1);                     // can work, but wrong!! (like how this.setState takes in a cb)
    // setCount(count - 1);                     // the count value is the value when we render our function
    // setCount(prevCount => prevCount - 1);

    // setState hook does NOT merge objects like classical components setState
    // setState(prevState => { return {count: prevState.count - 1} });   // WRONG
    setState(prevState => { return {...prevState, count: prevState.count - 1} });   
  }

  function incrementCount() {
    // setCount(prevCount => prevCount + 1);
    setState(prevState => { return {...prevState, count: prevState.count + 1} });   
  }

  return (
    <div className="App">
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <span>{theme}</span>
      <button onClick={incrementCount}>+</button>
    </div>
  );
}

export default App;

// NOTES
// 1) REACT HOOKS
// - functions that let you use / "hook into" React state and lifecycle methods from
//   function components (without writing classes)
// - can only use hooks inside function components (NOT class components)

// 2) USE STATE HOOK
// - use state hooks must always run in the same order!
//   Will get an error if you put then in if statements, loops, other functions
// - similar to this.state in class components
// - unlike this.state = {}, useState argument doesn't have to be an object
// 
// - useState(defaultState) => [ currentState, updateFunction ]
//   - returns array with two values:
//     - currentState
//     - updateFunction() = function that allows you to update current state. 
//       Similar to this.setState() in a class

// 3) USE STATE HOOK (more efficent way to run)
// - logic of defaultState will run everytime function is run, which could slow
//   our app down if logic is heavy. What if we only want it to run once on component mounting?
//  
// - useState(cb)   => [ currentState, updateFunction ]
//   cb = callback function that's only run once when the component first mounts/renders

// 4) USE STATE HOOKS with OBJECTS
// - setState hook does NOT merge objects like classical components setState
// - setState hook overwrites state
// - need to use spread ... operator to spread out previous state
// Ex 1. setState(prevState => { return {...prevState, count: prevState.count + 1} });   
// 
// - usually you have multiple useStates hooks (becomes easier to manage/change instead of ...)
// Ex 2.
// const [ count, setCount ] = useState(0)
// const [ theme, setTheme ] = useState('blue')
// // Instead of Ex 2. above