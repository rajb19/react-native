import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

function App() {
  const [name, setName] = useState({ firstname: '', lastname: '' })

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TextInput
        value={name.firstname}
        onChangeText={(text) => setName({ ...name, firstname: text })}
        style={{ marginTop: 40, borderWidth: 1, width: 240, height: 40, borderRadius: 5 }} />
      <TextInput
        value={name.lastname}
        onChangeText={(text) => setName({ ...name, lastname: text })}
        style={{ marginTop: 20, borderWidth: 1, width: 240, height: 40, borderRadius: 5 }} />
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text>{`Your Firstname is: ${name.firstname}`}</Text>
        <Text>{`Your Lastname is: ${name.lastname}`}</Text>
        {/* <Text>{JSON.stringify(name)}</Text> */}
      </View>
    </View>
  )
}

export default App;