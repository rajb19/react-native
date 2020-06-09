import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Modal from 'react-native-modal';
import Toast from "react-native-simple-toast";
import moment from "moment";
import { isEmpty, filter, orderBy } from "lodash";
import { View, Text, FlatList, Linking, TouchableOpacity, Image, Dimensions } from "react-native";

// custom imports
import styles from "./styles";
import PostDialog from "./components/dialogBox";
import SearchBar from "../../components/searchBar";
import { capitalize } from "../../common/utility";
import { Icons, Strings, Colors } from "../../common/constants";
import { LoadingAction, FetchPosts } from "../../redux/actions";

const deviceWidth = Dimensions.get('window').height;
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      post: {},
      posts: [],
      searchTerm: '',
      isRefresh: false,
      filterModalShow: false,
      showPostDialog: false,
      lastUpdatedPosts: [],
      sortby: '',
      error: '',
    }
  }

  componentDidMount() {
    this.getPosts();
    setInterval(() => {
      const { searchTerm } = this.state;
      if (searchTerm.trim() === '')
        this.getPosts()
    }, 3000);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.error !== prevState.error) {
      return {
        error: nextProps.error,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.error !== prevProps.error) {
      if (this.props.error) Toast.show(this.props.error);
    }
  }

  getPosts = async () => {
    const { posts, page, isRefresh } = this.state;
    page === 1 && isRefresh === false && this.props.loadingAction(true);
    await this.props.fetchPosts(tags = 'story', page);
    if (!isEmpty(this.props.posts.hits)) {
      if (posts.length >= this.props.posts.nbHits)
        this.setState({ isEndApiCall: true });
      else
        this.setState({
          posts: page === 1 ? this.props.posts.hits : [...posts, ...this.props.posts.hits],
          page: page + 1
        }, () => { this.setState({ lastUpdatedPosts: posts }) })
    }
    this.setState({ isRefresh: false })
    this.props.loadingAction(false);
  }

  onRefresh = () => {
    this.setState({ isRefresh: true, page: 1 },
      () => {
        this.getPosts();
      })
  }

  handleFilterOpen = () => {
    this.setState({ filterModalShow: true })
  }

  handleFilterClose = () => {
    this.setState({ filterModalShow: false })
  }

  handleDialogClose = () => {
    this.setState({ showPostDialog: false })
  }

  handleFilter = (sortby) => {
    const { lastUpdatedPosts } = this.state;
    let sortedPosts = orderBy(lastUpdatedPosts, ['created_at'], [sortby]);
    this.setState({ filterModalShow: false, posts: sortedPosts, sortby })
  }

  handleSearch = (searchTerm) => {
    const { lastUpdatedPosts } = this.state;
    this.setState({ searchTerm })
    const filteredPosts = filter(lastUpdatedPosts, (o) => {
      return o.title.toLowerCase().indexOf(searchTerm) > -1 || o.author.toLowerCase().indexOf(searchTerm) > -1
    });
    this.setState({ posts: filteredPosts })
  }

  renderFilterModal = () => {
    const { sortby } = this.state;
    return (
      <Modal deviceWidth={deviceWidth} isVisible={true} style={styles.modalContainer}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalHeaderContainer}>
            <TouchableOpacity onPress={this.handleFilterClose} style={styles.iconCloseContainer}>
              <Image source={Icons.CLOSE} style={styles.iconClose} />
            </TouchableOpacity>
            <Text>{Strings.FILTER}</Text>
          </View>
          <View style={styles.modalContentContainer}>
            <TouchableOpacity onPress={() => this.handleFilter('asc')} style={styles.padding}>
              <Text style={{ color: sortby == 'asc' ? Colors.BLACK : Colors.GREY }}>{Strings.FILTER_BY_ASC}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilter('desc')} style={styles.padding}>
              <Text style={{ color: sortby == 'desc' ? Colors.BLACK : Colors.GREY }}>{Strings.FILTER_BY_DESC}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  emptyData = () => {
    const { loading } = this.props;
    return (
      loading ? <View /> : <View style={{ alignItems: 'center' }}>
        <Text>{Strings.EMPTY_DATA}</Text>
      </View>
    )
  }

  renderItem = (item, index) => {
    return (
      <TouchableOpacity key={index} activeOpacity={0.6}
        style={styles.itemContainer} onPress={() => { this.setState({ showPostDialog: true, post: item }) }}>
        {/* show first letter of author */}
        <View style={styles.itemIconContainer}>
          <Text style={styles.iconPlaceholder}>{capitalize(item.author.charAt(0))}</Text>
        </View>

        <View style={styles.itemContentContainer}>
          <View style={{ marginVertical: 2 }}>
            <Text style={styles.itemTitle} ellipsizeMode={'tail'} numberOfLines={1}>{item.title}</Text>
          </View>
          {item.url && <TouchableOpacity activeOpacity={0.6} onPress={() => { Linking.openURL(item.url); }}>
            <Text style={styles.itemUrl} ellipsizeMode={'tail'} numberOfLines={1}>{item.url}</Text>
          </TouchableOpacity>}
          <View style={styles.itemContent}>
            <Text>{capitalize(item.author)}</Text>
            <Text>{moment(item.created_at).format("DD-MM-YYYY hh:mm:ss")}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { post, posts, searchTerm, isRefresh, filterModalShow, showPostDialog } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* show search bar */}
          <SearchBar
            searchTerm={searchTerm}
            onChangeSearchTerm={term => { this.handleSearch(term) }} />

          {/* show filter button */}
          <TouchableOpacity
            onPress={this.handleFilterOpen}
            style={styles.filterContainer}>
            <Text style={{ color: 'grey' }}>{Strings.FILTER}</Text>
            <View activeOpacity={0.6} style={{ paddingHorizontal: 10 }}>
              <Image source={Icons.FILTER} style={styles.filterIcon} />
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          extraData={posts}
          contentContainerStyle={[styles.contentContainer, { marginBottom: 30 }]}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10} // controls the amount of items rendered per batch
          removeClippedSubviews={true}
          refreshing={isRefresh}
          onRefresh={() => this.onRefresh()}
          ListEmptyComponent={this.emptyData}
        />

        {/* Post Item Dialog */}
        {showPostDialog &&
          <PostDialog post={post} onClose={this.handleDialogClose} />}

        {/* filter modal */}
        {filterModalShow && this.renderFilterModal()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.app.loading,
    error: state.app.error,
    posts: state.app.posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadingAction: bindActionCreators(LoadingAction, dispatch),
    fetchPosts: bindActionCreators(FetchPosts, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);