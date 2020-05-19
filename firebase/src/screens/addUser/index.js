import React from 'react';
import Toast from "react-native-simple-toast";
import { SafeAreaView, TouchableOpacity, TextInput, View, Text } from 'react-native';

// custom imports
import styles from "./styles";
import * as routes from '../../navigator/routes';
import { db, collections } from '../../common/common';

class AddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      userId: ''
    }

    this.props.navigation.setOptions({
      title: this.props.route && this.props.route.params && this.props.route && this.props.route.params.userId ?
        'Edit User' : 'Add User'
    })

  }

  componentDidMount() {
    const focus = this.props.navigation.addListener('focus', () => {
      if (this.props.route && this.props.route.params) {
        const { userId } = this.props.route.params;
        this.setState({ userId })
        this.getUser(userId)
      }
    });
  }

  getUser = async (userId) => {
    // using firestore
    // const test = await collections.users.doc(userId).get();
    // this.setState({ firstname: test.data().fname, lastname: test.data().lname })

    // using database
    db.ref(`users/${userId}`)
      .once('value')
      .then(snapshot => {
        const values = snapshot.val()
        this.setState({ firstname: values.fname, lastname: values.lname })
      });
  }

  handleAddUser = async () => {
    const { firstname, lastname, userId } = this.state;
    const data = {
      fname: firstname,
      lname: lastname
    }
    if (userId) {
      // using firestore
      // collections.users.doc(userId)
      //   .update(data)
      //   .then(() => {
      //     Toast.show('user has been updated successfully!');
      //   })

      // using database
      await db.ref(`/users/${userId}`)
        .update(data)
        .then(() => Toast.show('user has been updated successfully!'));
    } else {

      // using firestore
      // await collections.users.add(data).then(() => {
      //   Toast.show('user has been added successfully!');
      // });

      // using database
      const newReference = db.ref('/users').push();
      await newReference
        .set(data)
        .then(() => {
          Toast.show('user has been added successfully!')
          this.setState({ firstname: '', lastname: '' })
        });
    }
    this.props.navigation.navigate(routes.VIEWUSER)
  }

  render() {
    const { firstname, lastname, userId } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container} >
          <View style={[styles.inputContainer, { alignItems: 'center' }]}>
            <Text style={styles.headingText}>
              {userId ? 'Edit User' : 'Add New User'}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => { this.setState({ firstname: text }) }}
              placeholder=' first name'
              value={firstname} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => { this.setState({ lastname: text }) }}
              placeholder=' last name'
              value={lastname} />
          </View>
          <TouchableOpacity activeOpacity={0.3} onPress={this.handleAddUser}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {userId ? 'UPDATE' : 'ADD'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default AddUser;