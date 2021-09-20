import './App.css';
import React, { useState } from 'react';


function AsyncAwaitPractice() {

  // const [ count, setCount ] = useState(initalizeState());        // will run everytime function renders
  // const [ count, setCount ] = useState(() => initalizeState());  // will run only once! on initial render
  const [ allowance, setAllowance ] = useState(0);  


  const handleClickPurchase = async (e) => {
    
    // let sym1 = await getPrice('BTC');
    let sym1 = await (await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')).json()
    console.log('a');
    console.log(sym1);
    
    // let sym2 = await getPrice('ETH');
    let sym2 = await (await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')).json()
    console.log('b');
    console.log(sym2);
  }


  // const purchaseFunction = async (amount) => {
  //   let usdtAmount = amount * 0.45 * 1000000
  //   let approveAmount = usdtAmount
  //   if (allowance <= 0) {
  //     let approve = await tokenContract.methods.approve(
  //         process.env.REACT_APP_LAUNCH_CONTRACT,
  //         approveAmount
  //       )
  //       .send({
  //         from: address,
  //         gas: 80000,
  //         gasPrice: "75000000000",
  //       });
  //   }

  //   if (approveAmount > allowance) {
  //     let resetApprove = await tokenContract.methods.approve(
  //       process.env.REACT_APP_LAUNCH_CONTRACT,
  //       0
  //     )
  //     .send({
  //       from: address,
  //       gas: 80000,
  //       gasPrice: "75000000000",
  //     });

  //     let newApprove = await tokenContract.methods.approve(
  //       process.env.REACT_APP_LAUNCH_CONTRACT,
  //       approveAmount
  //     )
  //     .send({
  //       from: address,
  //       gas: 80000,
  //       gasPrice: "75000000000",
  //     });
  //   }

  //   let purchaseAmount = web3.utils.toWei(amount.toString());
  //   let purchase = await launchContract.methods.purchase(purchaseAmount).send({
  //     from: address,
  //     gas: 400000,
  //     gasPrice: "75000000000",
  //   });
  // };

  console.log('render');
  return (
    <div className="App">
      <button onClick={handleClickPurchase}>Purchase</button>
    </div>
  );
}

export default AsyncAwaitPractice;

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