import React, { useReducer } from "react";
import { View, Text, Button } from "react-native";

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1;
    case 'reset':
      return initialState
    default:
      return state
  }
}

function CounterOne() {
  const [count, dispatch] = useReducer(reducer, initialState)

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ width: 100 }}>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text>{count}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch('increment')} title={'Increment'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch('decrement')} title={'Decrement'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => dispatch('reset')} title={'Reset'} />
        </View>
      </View>
    </View>
  )
}

export default CounterOne;