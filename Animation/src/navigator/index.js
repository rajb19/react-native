import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import TextInput from '../screens/textInput';
import MoveObjectOne from '../screens/moveObjectOne';
import MoveObjectTwo from '../screens/moveObjectTwo';
import PanResponderOne from '../screens/panResponderOne';
import ScrollableHeader from '../screens/scrollableHeader';
import Animation from '../screens/animation';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Animation'} headerMode="none">
        <Stack.Screen name="TextInput" component={TextInput} />
        <Stack.Screen name="MoveObjectOne" component={MoveObjectOne} />
        <Stack.Screen name="MoveObjectTwo" component={MoveObjectTwo} />
        <Stack.Screen name="PanResponderOne" component={PanResponderOne} />
        <Stack.Screen name="ScrollableHeader" component={ScrollableHeader} />
        <Stack.Screen name="Animation" component={Animation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
