import React, { useEffect, useReducer } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Axios from 'axios';

const initialState = {
  loading: true,
  error: '',
  post: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        post: action.payload,
        error: ''
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        post: {},
        error: 'Something went wrong!'
      }
    default:
      state
  }
}

export const PostContext = React.createContext()

function DataFetching() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then((res) => {
        console.log("res:", res.data);
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
      })
      .catch((error) => {
        console.log("error:", error);
        dispatch({ type: 'FETCH_ERROR' })
      })
  }, [])

  return (
    <PostContext.Provider value={{ postState: state.post, postDispatch: dispatch }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        {console.log("state.post.title:", state.post.title)}
        {state.loading ? <Text>{'Loading...'}</Text> : <Text>{state.post.title}</Text>}
        {state.error ? <Text>{state.error}</Text> : null}
      </SafeAreaView>
    </PostContext.Provider>
  )
}

export default DataFetching;