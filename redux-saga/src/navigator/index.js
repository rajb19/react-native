import React from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// list of screen components
import NewsScreen from "../screens/news";
import HomeScreen from "../screens/home";

// custom imports
import * as Routes from "./routes";
import styles from "./styles";

const Stack = createStackNavigator();
const OPTIONS = {
  headerTintColor: '#fff',
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerTitleStyle,
}
class News extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Routes.HOME} >
            <Stack.Screen name={Routes.NEWS} component={NewsScreen} options={OPTIONS} />
            <Stack.Screen name={Routes.HOME} component={HomeScreen} options={OPTIONS} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  }
}

export default News;