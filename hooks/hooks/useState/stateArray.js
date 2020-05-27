import React, { useState } from "react";
import { View, Text, Button } from "react-native";

function App() {
  const [items, setItems] = useState([])

  const addNumber = () => {
    setItems([
      ...items, {
        id: items.length,
        value: Math.floor(Math.random() * 10) + 1
      }
    ])
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ marginVertical: 40 }} >
        <Button title='Add Number' onPress={addNumber} />
      </View>
      {
        items.map((item) => {
          return <Text key={item.id}>{item.value}</Text>
        })
      }
    </View>
  )
}

export default App;