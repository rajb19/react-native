import React, { useReducer } from "react";
import { SafeAreaView, Text } from "react-native";
// import DataFetchingOne from "./hooks/useReducer/DataFething/dataFetchingOne";
import DataFetchingTwo from "./hooks/useReducer/DataFething/dataFetchingTwo";
import DemoReducer from "./hooks/useReducer/DataFething/useContext";

function App() {
  return (
    <>
      {/* <DataFetchingOne /> */}
      <DataFetchingTwo />
      <DemoReducer />
    </>
  )
}

// useReducer with useContext
// import ComponentA from './hooks/useReducer/withEffect/ComponentA';
// import ComponentB from './hooks/useReducer/withEffect/ComponentB';
// import ComponentC from './hooks/useReducer/withEffect/ComponentC';
// const initialState = 0
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'increment':
//       return state + 1
//     case 'decrement':
//       return state - 1
//     case 'reset':
//       return initialState
//     default:
//       return state
//   }
// }

// export const CountContext = React.createContext()

// function App() {
//   const [count, dispatch] = useReducer(reducer, initialState);
//   return (
//     <CountContext.Provider value={{ countState: count, countDispatch: dispatch }}>
//       <SafeAreaView style={{ flex: 1 }} >
//         <Text>Count: {count}</Text>
//         <ComponentA />
//         <ComponentB />
//         <ComponentC />
//       </SafeAreaView>
//     </CountContext.Provider>
//   )
// }

/**
 * useEffect example
 */

// import ComponentC from "./hooks/useContext/ComponentC";
// export const UserContext = React.createContext();
// export const ChannelContext = React.createContext();
// function App() {
//   return (
//     <UserContext.Provider value='Rahul'>
//       <ChannelContext.Provider value='Hooks Practice'>
//         <ComponentC />
//       </ChannelContext.Provider>
//     </UserContext.Provider>
//   )
// }

export default App;