import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Animated} from 'react-native';

function TextInputLabel() {
  const [isValid, setValid] = useState(null);
  const [name, setName] = useState('');
  const animation = useState(new Animated.Value(0))[0];

  function onChangeText(text) {
    setName(text);
    if (text.length > 0) setValid(true);
    else setValid(false);
  }

  function onFocus() {
    Animated.timing(animation, {
      toValue: 100,
      duration: 200,
    }).start();
  }

  function onBlur() {
    if (name.length > 0) return;

    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
    }).start();
  }

  let interpolateLabelPosition = animation.interpolate({
    inputRange: [0, 100],
    outputRange: [35, 0],
  });

  let interpolateLabelSize = animation.interpolate({
    inputRange: [0, 100],
    outputRange: [24, 14],
  });

  let borderColor =
    isValid === null ? '#999' : isValid === true ? 'green' : '#F00';
  let color = isValid === null ? '#999' : isValid === true ? 'green' : '#F00';

  return (
    <View style={[styles.container, {borderColor: borderColor}]}>
      <Animated.Text
        style={{
          fontSize: interpolateLabelSize,
          top: interpolateLabelPosition,
          color: color,
        }}>
        Name
      </Animated.Text>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.textInput}
        value={name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginVertical: 20,
    alignSelf: 'center',
    height: 70,
    width: 350,
  },
  textInput: {
    height: 60,
    fontSize: 24,
  },
});

export default TextInputLabel;
