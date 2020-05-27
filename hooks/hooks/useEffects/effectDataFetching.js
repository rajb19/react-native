import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import Axios from "axios";

function App() {
  const [post, setPost] = useState([])
  const [id, setId] = useState(1)
  const [idFromClicked, setIdFromClicked] = useState(1)

  const handleClick = () => {
    setIdFromClicked(id)
  }

  useEffect(() => {
    Axios.get(`https://jsonplaceholder.typicode.com/posts/${idFromClicked}`)
      .then((res => {
        console.log(res)
        setPost(res.data)
      })).catch((error) => {
        console.log(error)
      })
  }, [idFromClicked])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TextInput
        value={id}
        onChangeText={(text) => setId(text)}
        style={{ marginVertical: 40, borderWidth: 1, width: 240, height: 40, borderRadius: 5 }} />
      <Button title={'Click'} onPress={handleClick} />

      {/* for single data */}
      <Text key={post.id} style={{ marginVertical: 40, }}>{post.title}</Text>

      {/* for multiple data */}
      {/* {
        posts.map((post) => {
          return (
            <Text key={post.id}>{post.title}</Text>
          )
        })
      } */}
    </View>
  )
}

export default App;