import React from 'react';
import { View, TextInput, Image } from 'react-native';

// custom imports
import styles from "./styles";
import { Icons, Colors } from '../../common/constants';

class SearchBar extends React.Component {
  render() {
    const { onChangeSearchTerm, searchTerm, customStyle } = this.props;
    return (
      <View style={[styles.container, customStyle]}>
        <View style={styles.searchIconContainer}>
          <Image source={Icons.SEARCH} style={styles.iconSearch} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={onChangeSearchTerm}
            style={styles.inputContainer}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholderTextColor={Colors.GREY}
            placeholder="search"
            value={searchTerm} />
        </View>
      </View>
    );
  }
}

export default SearchBar;