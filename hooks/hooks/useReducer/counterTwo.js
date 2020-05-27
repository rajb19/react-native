import React, { useReducer } from "react";
import { View, Text, Button } from "react-native";


const initialState = {
  firstCounter: 0,
  secondCounter: 10
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, firstCounter: state.firstCounter + action.value }
    case 'decrement':
      return { ...state, firstCounter: state.firstCounter - action.value }
    case 'increment2':
      return { ...state, secondCounter: state.secondCounter + action.value }
    case 'decrement2':
      return { ...state, secondCounter: state.secondCounter - action.value }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function CounterTwo() {
  const [count, dispatch] = useReducer(reducer, initialState)

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ width: 150 }}>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text>{count.firstCounter}</Text>
          <Text>{count.secondCounter}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch({ type: 'increment', value: 1 })} title={'Increment'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch({ type: 'decrement', value: 1 })} title={'Decrement'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch({ type: 'increment', value: 5 })} title={'Increment 5'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch({ type: 'decrement', value: 5 })} title={'Decrement 5'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch({ type: 'increment2', value: 1 })} title={'Increment Counert Two'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch({ type: 'decrement2', value: 1 })} title={'Decrement Counert Two'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch({ type: 'reset' })} title={'Reset'} />
        </View>
      </View>
    </View>
  )
}

export default CounterTwo;