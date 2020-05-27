import React, { useContext } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { PostContext } from "./dataFetchingTwo";

function DemoReducer() {
  const postContext = useContext(PostContext);
  console.log("postContext: ", postContext);
  return (
    <SafeAreaView>
      <Text>Hi</Text>
    </SafeAreaView>
  )
}

export default DemoReducer