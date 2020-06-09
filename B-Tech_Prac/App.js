import React from 'react';
import { Provider } from 'react-redux';

// custom imports
import store from "./src/redux/store";
import AppRoot from './src/appRoot';

const App = () => {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
};

export default App;