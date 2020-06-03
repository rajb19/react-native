import React from 'react';
import {AppProvider} from './src/redux/store';
import AppNavigator from './src/navigator';

function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
