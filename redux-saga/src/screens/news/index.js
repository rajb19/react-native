import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image } from "react-native";

// custom imports
import { getNews } from "../../redux/actions";
import styles from "./styles";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    }
  }

  componentDidMount() {
    this.props.getNews();
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPress={() => { }}
        style={styles.itemContainer}>
        <View style={{ width: '40%' }}>
          {/* <Image source={{ uri: item.urlToImage }} style={styles.itemImage} /> */}
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemAuthor} ellipsizeMode='tail' numberOfLines={1}>{item.author}</Text>
          <Text style={styles.itemTitle} ellipsizeMode='tail' numberOfLines={3}>
            {item.content ? item.content : item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { news } = this.props;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList
          data={news}
          extraData={news}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    news: state.news.news
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNews: bindActionCreators(getNews, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);