import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { CountContext } from "../../../App";

function ComponentA() {
  const countContext = useContext(CountContext)
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Component A, Count {countContext.countState}</Text>
      <Button onPress={() => countContext.countDispatch({ type: 'increment' })} title={'Increment'} />
      <Button onPress={() => countContext.countDispatch({ type: 'decrement' })} title={'Decrement'} />
      <Button onPress={() => countContext.countDispatch({ type: 'reset' })} title={'Reset'} />
    </View>
  )
}

export default ComponentA;