import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// custom imports
import styles from './styles';

class Indicator extends React.Component {
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size={'small'} color={'blue'} />
      </View>
    );
  }
}

export default Indicator;