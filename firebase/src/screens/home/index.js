import React from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, Button, Image, Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

// custom imports
import styles from "./styles";
import * as routes from '../../navigator/routes';

class Home extends React.Component {

  async componentDidMount() {
    /**
     * Firebase Analytics
     */
    // analytics().setCurrentScreen('TestScreen', 'TestScreen');
    // analytics().setUserId('101');
    // analytics().setUserProperties({ 'username': 'Rahul Bhogayata' });
    // analytics().logSelectContent({
    //   item_id: 'abcd',
    //   content_type: 'clothing',
    // })

    /**
     * Firebase Crashlytics
     */
    crashlytics().log('App mounted.');
    await Promise.all([
      crashlytics().setUserId("101"),
      crashlytics().setUserName("Rahul Bhogayata"),
      crashlytics().setUserEmail("rahulb@topsinfosolutions.com"),
      crashlytics().setAttribute('credits', String("Test")),
      crashlytics().setAttributes({
        role: 'admin',
        followers: '130001245044',
      }),
    ]);
  }

  render() {

    const iconEdit = Platform.select({
      ios: { uri: 'edit' },
      android: { uri: 'asset:/images/edit.png' }
    })
    const iconDelete = Platform.select({
      ios: { uri: 'delete' },
      android: { uri: 'asset:/images/delete.png' }
    })

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ marginVertical: 20, alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: 20 }} onPress={() => { this.props.navigation.navigate(routes.VIEWUSER) }}>
            <Text style={{ textDecorationLine: 'underline', color: 'blue', fontSize: 18 }}>View Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20 }} onPress={() => { this.props.navigation.navigate(routes.ADDUSER) }}>
            <Text style={{ textDecorationLine: 'underline', color: 'blue', fontSize: 18 }}>Add Users</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Add Tracking Event"
          onPress={() =>
            analytics().logEvent('Test_Event', {
              event_id: '12',
              event_title: 'First Event',
              event_description: 'My First Event',
            })
          } />
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 20, }} >
          <Image source={iconEdit} style={{ marginHorizontal: 20, height: 20, width: 20 }} />
          <Image source={iconDelete} style={{ marginHorizontal: 20, height: 20, width: 20 }} />
        </View>
      </SafeAreaView>
    );
  }
};

export default Home;