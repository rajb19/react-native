import React, {useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import {View, Text, TouchableOpacity, Image} from 'react-native';

// custom imports
import * as Routes from '../../navigator/routes';
import {Icons} from '../../common/constants';
import styles from './styles';

const Home = (props) => {
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState([]);

  getPlaces = async (text) => {
    setSearch(text);
    try {
      const response = await fetch(
        `https://places.ls.hereapi.com/places/v1/discover/search?apiKey=5-VjKZB9SExxpURJw-CRrFTdxtE58ktSvbsvDv2KUnw&at=52.531,13.384&q=${text}`,
      );
      const responseJson = await response.json();
      setPlaces(responseJson.results.items);
    } catch (error) {
      console.error(error);
    }
  };

  handlePressPlace = (place) => {
    props.navigation.push(Routes.HOME, {place, screen: 'places'});
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TextInput
        style={styles.input}
        placeholder={'search'}
        onChangeText={(text) => getPlaces(text)}
        autoFocus
        value={search}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        {places.map((place, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => handlePressPlace(place)}
              style={styles.listContainer}>
              <View style={{width: '90%'}}>
                <Text>{place.title}</Text>
              </View>
              <View style={styles.listImageContainer}>
                <Image source={Icons.marker} style={styles.listItemIcon} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
