import React, {useState} from 'react';
import {Text, View, Animated, PanResponder} from 'react-native';

function PanResponderOne() {
  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      // onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 14, lineHeight: 24, fontWeight: 'bold'}}>
        Drag this Circle!
      </Text>
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
            // transform: [{translateX: pan.x}, {translateY: pan.y}],
            transform: pan.getTranslateTransform(),
          },
          // pan.getLayout(),
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}

export default PanResponderOne;
