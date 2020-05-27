import React, { useState } from "react";
import { View, Text, Button } from "react-native";

function App() {
  const [count, setCount] = useState(0);

  const incrementFive = () => {
    // with prevCount example
    for (let index = 0; index < 5; index++) {
      setCount(prevCount => prevCount + 1)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }} >
      <View style={{ width: 100 }}>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text>{count}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => { setCount(prevCount => prevCount + 1) }} title={'Increment'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => { setCount(prevCount => prevCount - 1) }} title={'Decrement'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => { setCount(0) }} title={'Reset'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={incrementFive} title={'Five'} />
        </View>
      </View>
    </View>
  )
}

export default App;