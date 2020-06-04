import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import SafeAreaView from 'react-native-safe-area-view';
import MapView from 'react-native-maps';
import Toast from 'react-native-simple-toast';

import {View, Text, TouchableOpacity, Image} from 'react-native';

// custom imports
import {LogoutAction} from '../../redux/actions';
import * as Routes from '../../navigator/routes';
import {Icons} from '../../common/constants';
import styles from './styles';

const Home = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [search, setSearch] = useState('search');
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  props.navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={[styles.headerContainer, styles.left]}
        onPress={logout}>
        <Image style={styles.headerIcon} source={Icons.logout} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={[styles.headerContainer, styles.right]}
        onPress={() => props.navigation.navigate(Routes.PROFILE)}>
        <Image style={styles.headerIcon} source={Icons.profile} />
      </TouchableOpacity>
    ),
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.warn('position ', position);
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.3,
        });
      },
      (error) => console.error('initialPosition', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    const focus = props.navigation.addListener('focus', () => {
      const params = props.route && props.route.params;
      if (params && params.screen === 'places') {
        setRegion({
          latitude: params.place.position[0],
          longitude: params.place.position[1],
          latitudeDelta: 0.2,
          longitudeDelta: 0.3,
        });
        setSearch(params.place.title);
      }
    });
  }, []);

  useEffect(() => {
    if (auth.success) Toast.show(auth.success);
  }, [showToast]);

  logout = async () => {
    await dispatch(LogoutAction());
    setShowToast(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.searchBarTouchable}
          onPress={() => {
            props.navigation.navigate(Routes.GOOGLEPLACES);
          }}>
          <View>
            <Image source={Icons.search} style={styles.searchIcon} />
          </View>
          <View style={{marginLeft: 4}}>
            <Text style={{color: 'grey'}}>{search}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <MapView
        ref={(map) => (map = map)}
        initialRegion={region}
        region={region}
        style={styles.container}>
        <MapView.Marker coordinate={region} />
      </MapView>
    </SafeAreaView>
  );
};

export default Home;
