import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const CustomButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.handelLogOut}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/google.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Log Out</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 220,
    height: 40,
    borderRadius: 4,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#4885ed',
    marginVertical: 4,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  image: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 5,
    backgroundColor: '#4885ed',
    justifyContent: 'center',
    borderRadius: 2,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 14,
  },
});
