/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Toast from "react-native-simple-toast";
import auth from '@react-native-firebase/auth';
import { isEmpty } from "lodash";
import { SafeAreaView, TouchableOpacity, TextInput, View, Text, ActivityIndicator, Alert } from 'react-native';

// custom imports
import styles from "./styles";
import { validatePhoneNumber, validateVerificationCode } from '../../common/utility';

class MobileVerification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: '',
      confirmation: null,
      code: '',
      loading: false
    }

    this.props.navigation.setOptions({
      title: 'Mobile Verification'
    })
  }

  handleSendCode = async () => {
    const { mobile } = this.state;
    if (validatePhoneNumber(mobile)) {
      await auth().signInWithPhoneNumber(mobile)
        .then((confirmation) => {
          console.log('confirmation : ', confirmation)
          Toast.show("code has been sent")
          this.setState({ confirmation })
        }).catch((e) => {
          Toast.show(e.message)
          console.log('Error: ', e.message)
        })
    } else {
      Toast.show('invalid mobile number')
    }

    //   this.setState({ loading: true })
    //   await firebase.auth().signInWithPhoneNumber(mobile, firebase.auth.ApplicationVerifier)
    //     .then((res) => {
    //       console.log('res : ', res)
    //       Toast.show('verification code send sucessfully');
    //       this.setState({ loading: false })
    //     }).catch((e) => {
    //       this.setState({ loading: false })
    //       console.log('Error: ', e)
    //     })
  }

  verifyCode = async () => {
    const { code, confirmation } = this.state;
    if (validateVerificationCode(code) && confirmation) {
      confirmation.confirm(code).then((result) => {
        if (!isEmpty(result)) {
          Alert.alert('code verified')
          this.setState({ mobile: '', code: '' })
        }
      }).catch((error) => {
        Toast.show(error.message)
        console.log('Error: ', error);
      });
    } else {
      Toast.show('invalid code')
    }

    // try {
    //   const credential = auth.PhoneAuthProvider.credential(confirmation._verificationId, code)
    //   console.log('credential', credential);
    //   firebase.auth().signInWithCredential(credential)
    //     .then((res) => {
    //       console.log('res', res);
    //     })
    //     .catch((e) => {
    //       console.log('err: ', e);
    //     })
    //   // await confirmation.confirm(code);
    // } catch (error) {
    //   console.log('Invalid code.', error);
    // }
  }

  render() {
    const { mobile, code, loading } = this.state;
    return (
      loading ? (<ActivityIndicator size="large" color="#0000ff"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }} />) :
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container} >
            <View style={[styles.inputContainer, { alignItems: 'center' }]}>
              <Text style={styles.headingText}>
                {'Mobile Registration'}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => { this.setState({ mobile: text }) }}
                placeholder=' +91 9876543210'
                keyboardType={'phone-pad'}
                value={mobile} />
            </View>
            <TouchableOpacity activeOpacity={0.3} onPress={this.handleSendCode}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {'SEND CODE'}
              </Text>
            </TouchableOpacity>
            <View style={[styles.inputContainer, { marginTop: 60 }]}>
              <TextInput
                editable={mobile ? true : false}
                style={styles.input}
                onChangeText={(text) => { this.setState({ code: text }) }}
                placeholder=' verification code'
                keyboardType={'phone-pad'}
                value={code} />
            </View>
            <TouchableOpacity activeOpacity={0.3} onPress={this.verifyCode}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {'VERIFY'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
  }
};

export default MobileVerification;