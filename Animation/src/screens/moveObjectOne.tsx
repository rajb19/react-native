import React, {useState} from 'react';
import {View, Text, Animated, Dimensions, Button} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
function MoveObjectOne() {
  const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];

  function moveBall() {
    Animated.timing(value, {
      toValue: {x: deviceWidth / 2 - 50, y: deviceHeight / 2 - 100},
      duration: 1000,
      useNativeDriver: false,
    }).start(({finished}) => {
      console.warn('finished ', finished);
    });
  }

  return (
    <View>
      <Animated.View style={value.getLayout()}>
        <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'red',
            borderRadius: 100 / 2,
          }}
        />
      </Animated.View>
      <Button title={'Click me to animation!'} onPress={moveBall} />
    </View>
  );
}

export default MoveObjectOne;
