import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";

function App() {

  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    console.log(`You clicked ${count} times`)
  }, [count])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TextInput
        value={name.firstname}
        onChangeText={(text) => setName(text)}
        style={{ marginTop: 40, borderWidth: 1, width: 240, height: 40, borderRadius: 5 }} />
      <View style={{ marginTop: 20 }}>
        <Button onPress={() => { setCount(prevCount => prevCount + 1) }} title={`Clicked ${count} times`} />
      </View>
    </View>
  )
}

export default App;