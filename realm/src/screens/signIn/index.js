/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, View, TouchableOpacity, Text, TextInput } from 'react-native';

// custom imports
import { validateEmail, checkEmpty } from '../../common/utility';
import { Constants } from '../../common/constants';
import { LoginAction } from '../../redux/actions';
import * as Routes from '../../navigator/routes';
import styles from "./styles";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordError: '',
      emailError: '',
      password: '',
      email: '',
    };
  }

  async componentDidMount() {
    const focus = this.props.navigation.addListener("focus", () => {
      this.setState({ email: '', password: '', passwordError: '', emailError: '', });
    })
  }

  handleLoginAction = async () => {
    const { email, password } = this.state;
    if (!checkEmpty(email)) {
      this.setState({ emailError: Constants.BLANKNOTALLOWD, passwordError: '' });
      return false;
    } else if (!validateEmail(email)) {
      this.setState({ emailError: Constants.INVALIDEMAIL, passwordError: '' });
      return false;
    } else if (!checkEmpty(password)) {
      this.setState({ emailError: '', passwordError: Constants.BLANKNOTALLOWD });
      return false;
    } else {
      this.setState({ emailError: '', passwordError: '' });
      await this.props.loginAction(email, password, this.props.users);
      if (this.props.error !== '') {
        Toast.show(this.props.error);
        this.setState({ password: '' });
      } else {
        Toast.show(this.props.success);
      }
    }
  };

  renderError = (error) => {
    return (
      <View>
        <Text style={[styles.commonPadding, styles.errorText]}>{error}</Text>
      </View>
    );
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Hello There,</Text>
              <Text style={styles.headingText}>Welcome back</Text>
            </View>
            <View style={{ flex: 3 }}>
              {/* textinput container for email */}
              <View>
                <TextInput ref={input => { this.email = input; }}
                  onChangeText={text => { this.setState({ email: text }) }}
                  onSubmitEditing={() => { this.password.focus(); }}
                  onFocus={() => { this.setState({ isFocus: 'email' }) }}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  autoCorrect={false}
                  placeholder={'email'}
                  placeholderTextColor={'grey'}
                  style={[styles.textInput, { borderBottomColor: emailError ? 'red' : 'black' }]}
                  value={email} />
                {emailError ? this.renderError(emailError) : null}
              </View>

              {/* textinput container for password */}
              <View style={styles.passwordContainer}>
                <TextInput
                  ref={input => { this.password = input; }}
                  onChangeText={text => { this.setState({ password: text }) }}
                  onSubmitEditing={this.handleLoginAction}
                  onFocus={() => { this.setState({ isFocus: 'password' }) }}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                  placeholder={'password'}
                  placeholderTextColor={'grey'}
                  autoCorrect={false}
                  secureTextEntry={true}
                  style={[styles.textInput, { borderBottomColor: passwordError ? 'red' : 'black' }]}
                  value={password} />
                {passwordError ? this.renderError(passwordError) : null}
              </View>

              <View style={styles.forgotLinkContainer}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  onPress={() => { this.props.navigation.navigate(Routes.FORGOTPASSWORD) }}
                  style={styles.touchbleArea} >
                  <Text style={{ textDecorationLine: "underline" }}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.signUpLinkContainer}>
                <View>
                  <Text>New Here?</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.3}
                  onPress={() => { this.props.navigation.navigate(Routes.SIGNUP) }}>
                  <Text style={styles.signUpLink}>Sign Up Instead</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.loginBtn}
                onPress={this.handleLoginAction}>
                <Text style={styles.loginText}>{Constants.LOGIN}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  success: state.auth.success,
  error: state.auth.error,
  users: state.auth.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: bindActionCreators(LoginAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
