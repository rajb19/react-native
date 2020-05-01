import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Geolocation from '@react-native-community/geolocation';
import SafeAreaView from 'react-native-safe-area-view';
import MapView from 'react-native-maps';
import { View, Text, TouchableOpacity, Animated, Image, Dimensions } from "react-native";

// custom imports
import { LogoutAction } from '../../redux/actions';
import * as Routes from "../../navigator/routes";
import { Icons } from '../../common/constants';
import styles from "./styles";

const { height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 20;

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={[styles.headerContainer, styles.left]} onPress={this.logout}>
          <Image style={styles.headerIcon} source={Icons.logout} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={[styles.headerContainer, styles.right]}
          onPress={() => this.props.navigation.navigate(Routes.PROFILE)} >
          <Image style={styles.headerIcon} source={Icons.profile} />
        </TouchableOpacity>
      ),
    })

    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.3,
          },
        })
      },
      error => console.error("initialPosition", error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.state = {
      markers: [],
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      search: 'search',
      nearBy: false
    };
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.map = null;
  }

  getnearByPlaces = async (lat, long) => {
    try {
      const response = await fetch(`https://places.demo.api.here.com/places/v1/discover/explore?in=${lat}%2C${long}%3Br%3D10&cat=eat-drink&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`);
      const responseJson = await response.json();
      let data = []
      responseJson.results.items.map((item, index) => {
        let coordinate = {
          latitude: item.position[0] + (Math.random() - 0.5) * (0.4 / 2),
          longitude: item.position[1] + + (Math.random() - 0.5) * (0.5 / 2),
        }
        let object = {
          coordinate,
          title: item.title,
          description: item.address.street,
          image: item.icon
        }
        data.push(object)
      })
      this.setState({ markers: data })
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    const focus = this.props.navigation.addListener("focus", () => {
      const params = this.props.route && this.props.route.params

      if (params && params.screen === 'places') {
        this.getnearByPlaces(params.place.position[0], params.place.position[1])
        this.setState({
          region: {
            latitude: params.place.position[0],
            longitude: params.place.position[1],
            latitudeDelta: 0.2,
            longitudeDelta: 0.3,
          },
          search: params.place.title,
          nearBy: true
        })
      }
    });

    const { markers, region } = this.state;
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  logout = async () => {
    await this.props.logoutAction();
  }

  render() {
    const { markers, search, region, nearBy } = this.state

    const interpolations = markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [0.7, 1, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    // return <SafeAreaView>
    //   <Text>Home</Text>
    // </SafeAreaView>

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.searchBarTouchable}
            onPress={() => { this.props.navigation.navigate(Routes.GOOGLEPLACES) }}>
            <View>
              <Image source={Icons.search} style={styles.searchIcon} />
            </View>
            <View style={{ marginLeft: 4 }} >
              <Text style={{ color: 'grey' }}>{search}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <MapView
          ref={map => this.map = map}
          initialRegion={region}
          region={region}
          style={styles.container}>
          {!nearBy && <MapView.Marker coordinate={region} />}
          {markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.Image style={[styles.markerIcon, scaleStyle]} source={Icons.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        {<Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {
            // markers[0] && markers[0].title && 
            markers.map((marker, index) => (
              <View style={styles.card} key={index}>
                <Image
                  source={{ uri: marker.image }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.description}
                  </Text>
                </View>
              </View>
            ))}
        </Animated.ScrollView>}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: bindActionCreators(LogoutAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);