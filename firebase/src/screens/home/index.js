import React from 'react';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native';

// custom imports
import styles from "./styles";
import * as routes from '../../navigator/routes';

class Home extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ marginVertical: 20, alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: 20 }} onPress={() => { this.props.navigation.navigate(routes.VIEWUSER) }} >
            <Text style={{ textDecorationLine: 'underline', color: 'blue', fontSize: 18 }}>View Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20 }} onPress={() => { this.props.navigation.navigate(routes.ADDUSER) }}>
            <Text style={{ textDecorationLine: 'underline', color: 'blue', fontSize: 18 }}>Add Users</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default Home;