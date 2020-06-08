import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
function MoveObjectTwo() {
  const leftValue = useState(new Animated.Value(0))[0];
  const [isAnimated, setAnimated] = useState(false);

  function moveBall() {
    Animated.timing(leftValue, {
      toValue: !isAnimated ? deviceWidth - 120 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setAnimated(!isAnimated);
    });
  }

  return (
    <Animated.View
      style={{
        // paddingLeft: leftValue, // marginLeft & PaddingLeft is not supported by native animated module(useNativeDriver: true)
        transform: [{translateX: leftValue}],
        marginHorizontal: 10,
      }}>
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 100 / 2,
          backgroundColor: 'red',
        }}
      />
      <TouchableOpacity onPress={moveBall}>
        <Text style={{paddingLeft: !isAnimated ? 16 : 20}}>
          {!isAnimated ? 'Move Right' : 'Move Left'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default MoveObjectTwo;
