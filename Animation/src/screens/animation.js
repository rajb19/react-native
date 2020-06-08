/**
 * reference links:
 * https://youtu.be/K2B0vVIHV_A
 *
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Easing,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

function Animation() {
  const fadeValue = useState(new Animated.Value(0))[0];
  const xValue = useState(new Animated.Value(0))[0];
  const springValue = useState(new Animated.Value(0.3))[0];
  const rotateValue = useState(new Animated.Value(0.3))[0];

  fadeAnimation = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  moveAnimation = () => {
    Animated.timing(xValue, {
      toValue: deviceWidth - 100,
      duration: 1500,
      easing: Easing.linear,
      // easing: Easing.back(),
      // easing: Easing.cubic,
    }).start(() => {
      Animated.timing(xValue, {
        toValue: 0,
        duration: 1500,
        // easing: Easing.back(),
        easing: Easing.linear,
      }).start(() => {
        moveAnimation();
      });
    });
  };

  springAnimation = () => {
    Animated.spring(springValue, {
      toValue: 1.5,
      friction: 1,
    }).start();
  };

  rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(rotateValue, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear,
      }),
      Animated.timing(rotateValue, {
        toValue: 0,
        duration: 0,
      }),
    ]).start(() => {
      rotateAnimation();
    });
  };

  moveAndRotateAnimation = () => {
    Animated.parallel([moveAnimation(), rotateAnimation()]).start();
  };

  const interpolationRotateAnimation = rotateValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '365deg'],
  });

  return (
    <View style={styles.container}>
      {/* <Animated.View
        style={[
          styles.animatedView,
          {
            // opacity: fadeValue,
            // left: xValue,
            transform: [{scale: springValue}],
          },
        ]}></Animated.View> */}
      <Animated.Image
        source={require('../../assets/react-icon.png')}
        style={[
          styles.animatedView,
          {
            left: xValue,
            // transform: [{scale: springValue}],
            transform: [{rotate: interpolationRotateAnimation}],
          },
        ]}></Animated.Image>
      <TouchableOpacity
        onPress={
          // fadeAnimation
          // moveAnimation
          // springAnimation
          // rotateAnimation
          moveAndRotateAnimation
        }
        style={styles.button}>
        <Text style={styles.buttonText}>Animate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  animatedView: {
    height: 100,
    width: 100,
    // backgroundColor: 'skyblue',
  },
  button: {
    height: 45,
    marginTop: 20,
    backgroundColor: 'steelblue',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    padding: 12,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Animation;
