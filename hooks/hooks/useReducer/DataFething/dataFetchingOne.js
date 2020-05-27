import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Axios from 'axios';

function DataFetching() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [post, setPost] = useState({})

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then((res) => {
        setLoading(false)
        setPost(res.data)
        setError('')
      })
      .catch(() => {
        setLoading(false)
        setPost({})
        setError('Something went wrong', error)
      })
  })

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }} >
      {loading ? <Text>{'Loading...'}</Text> : <Text>{post.title}</Text>}
      {error ? <Text>{error}</Text> : null}
    </SafeAreaView>
  )
}

export default DataFetching;