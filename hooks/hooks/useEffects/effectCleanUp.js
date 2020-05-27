import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

function App() {
  const [count, setCount] = useState(0)

  const tick = () => {
    setCount(prevCount => prevCount + 1)
  }

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ marginTop: 100 }}>
        <Text>{count}</Text>
      </View>
    </View>
  )
}

export default App;