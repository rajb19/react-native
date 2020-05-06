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
import { TouchableOpacity } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { LoginButton, AccessToken, ShareDialog } from 'react-native-fbsdk';
import { View, Text, TextInput } from 'react-native';

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

    // this.shareLinkWithShareDialog()

    GoogleSignin.configure({
      // scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
      // webClientId: "912891888047-ec1nf32boo0eih1gmre0l9pi889s6ctn.apps.googleusercontent.com",
      // offlineAccess: true,
    })

    const getCurrentUser = await GoogleSignin.getCurrentUser();
    console.log("componentDidMount@isSignedIn: ", getCurrentUser);
    const focus = this.props.navigation.addListener("focus", () => {
      this.setState({ email: '', password: '', passwordError: '', emailError: '', });
    })
  }

  // share link with dialog 
  shareLinkWithShareDialog = () => {

    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://facebook.com",
      contentDescription: 'Wow, check out this great site!',
    };

    ShareDialog.canShow(shareLinkContent).then(
      function (canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: '
            + result.postId);
        }
      },
      function (error) {
        console.log('Share fail with error: ' + error);
      }
    );
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

  handleGoogleSigin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      console.log("signIn@userInfo: ", userInfo);
    } catch (error) {
      console.log("signIn@error: ", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  getFacebookProfile = (accessToken) => {
    console.log("getFacebookProfile: ", accessToken);
    fetch('https://graph.facebook.com/v2.5/me?fields=id,first_name,last_name,name,picture.type(large),email,gender,birthday,hometown,friends&access_token=' + accessToken)
      // fetch('https://graph.facebook.com/1510362322477671?fields=birthday,email,hometown&access_token=' + accessToken)
      .then((response) => response.json())
      .then((result) => {
        console.log("result: ", result);
      })
      .catch((error) => {
        console.log("error: ", error);
      })
  }

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

              <View style={{ width: '100%', alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}>

                {/* google sigin in button */}
                <GoogleSigninButton
                  style={{ width: '55%', height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.handleGoogleSigin} />

                {/* facebook sigin button */}
                <LoginButton
                  style={{ width: '44%', height: 40 }}
                  publishPermissions={['publish_actions']}
                  permissions={['public_profile,email,user_hometown,user_birthday,']}
                  onLoginFinished={
                    (error, result) => {
                      console.log("result: ", result);
                      if (error) {
                        console.log("login has error: " + result.error);
                      } else if (result.isCancelled) {
                        console.log("login is cancelled.");
                      } else {
                        AccessToken.getCurrentAccessToken().then(
                          (data) => {
                            console.log("accessToken: ", data.accessToken.toString());
                            this.getFacebookProfile(data.accessToken.toString());
                          }
                        )
                      }
                    }
                  }
                  onLogoutFinished={() => console.log("logout.")} />
              </View>

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
