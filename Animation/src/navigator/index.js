import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import TextInput from '../screens/textInput';
import MoveObjectOne from '../screens/moveObjectOne';
import MoveObjectTwo from '../screens/moveObjectTwo';
import PanResponderOne from '../screens/panResponderOne';
import ScrollableHeader from '../screens/scrollableHeader';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'ScrollableHeader'} headerMode="none">
        <Stack.Screen name="TextInput" component={TextInput} />
        <Stack.Screen name="MoveObjectOne" component={MoveObjectOne} />
        <Stack.Screen name="MoveObjectTwo" component={MoveObjectTwo} />
        <Stack.Screen name="PanResponderOne" component={PanResponderOne} />
        <Stack.Screen name="ScrollableHeader" component={ScrollableHeader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
