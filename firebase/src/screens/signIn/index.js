import React from 'react';
import Toast from "react-native-simple-toast";
import auth from '@react-native-firebase/auth';
import { TouchableOpacity, TextInput, View, Text, ActivityIndicator } from 'react-native';

// custom imports
import styles from "./styles";
import * as routes from "../../navigator/routes";
import { checkEmpty, validateEmail, checkPasswordLength } from '../../common/utility';

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false
    }

    this.props.navigation.setOptions({
      title: 'Sign In'
    })
  }

  componentDidMount() {
    const focus = this.props.navigation.addListener('focus', () => {
      this.setState({ email: '', password: '', loading: false })
    });
  }

  handleSignIn = async () => {
    const { email, password } = this.state;
    if (!checkEmpty(email)) {
      Toast.show('can not be empty')
    } else if (!validateEmail(email)) {
      Toast.show('invalid email')
    } else if (!checkEmpty(password)) {
      Toast.show('password can not be empty')
    } else if (!checkPasswordLength(password)) {
      Toast.show('password should be 6 character')
    } else {
      this.setState({ loading: true })
      await auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('res : ', res)
          Toast.show('SignIn Sucessfully');
          this.setState({ loading: false })
          this.props.navigation.navigate(routes.HOME);
        }).catch((e) => {
          this.setState({ loading: false, password: '' })
          Toast.show('There is no user record corresponding to this identifier');
          console.log('Error: ', e)
        })
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
                {'Sign In Here!'}
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
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry={true}
                value={password} />
            </View>
            <TouchableOpacity activeOpacity={0.3} onPress={this.handleSignIn}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {'SIGN IN'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3}
              onPress={() => { this.props.navigation.navigate(routes.MOBILEVERIFICATION) }}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {'SIGNIN WITH MOBILE'}
              </Text>
            </TouchableOpacity>
            <View style={styles.signUpLinkContainer}>
              <View>
                <Text>New Here?</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => { this.props.navigation.navigate(routes.SIGNUP) }} >
                <Text style={styles.signUpLink}>Sign Up Instead</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
};

export default SignIn;