import React from 'react';
import Toast from "react-native-simple-toast";
import auth from '@react-native-firebase/auth';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

// custom imports
import styles from "./styles";
import * as routes from "../../navigator/routes";
import { checkEmpty, validateEmail, checkPasswordLength } from '../../common/utility';

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false
    }

    this.props.navigation.setOptions({
      title: 'Sign Up'
    })
  }

  handleSignUp = async () => {
    const { email, password } = this.state;
    if (!checkEmpty(email)) {
      Toast.show('can not be empty')
    }
    else if (!validateEmail(email)) {
      Toast.show('invalid email')
    }
    else if (!checkEmpty(password)) {
      Toast.show('password can not be empty')
    } else if (!checkPasswordLength(password)) {
      Toast.show('password should be 6 character')
    } else {
      this.setState({ loading: true })
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          Toast.show('Registration Sucessfully!');
          this.setState({ email: '', password: '', loading: false })
        }).catch(error => {
          this.setState({ loading: false })
          console.log('Error: ', error)
          if (error.code === 'auth/email-already-in-use') {
            Toast.show('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            Toast.show('That email address is invalid!');
          }
        });
    }
  }

  render() {
    const { email, password, loading } = this.state;
    return (
      loading ? (
        <ActivityIndicator size="large" color="#0000ff"
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }} />) :
        <View style={styles.safeAreaView}>
          <View style={styles.container} >
            <View style={[styles.inputContainer, { alignItems: 'center' }]}>
              <Text style={styles.headingText}>
                {'Sign Up Here!'}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => { this.setState({ email: text }) }}
                placeholder=' email'
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={email} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => { this.setState({ password: text }) }}
                placeholder=' password'
                secureTextEntry={true}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={password} />
            </View>
            <TouchableOpacity activeOpacity={0.3} onPress={this.handleSignUp}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {'SIGNUP'}
              </Text>
            </TouchableOpacity>
            <View style={styles.signInLinkContainer}>
              <View>
                <Text>Have an account?</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => { this.props.navigation.navigate(routes.SIGNIN) }} >
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
};

export default SignUp;
