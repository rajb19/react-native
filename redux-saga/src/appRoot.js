import React from "react";
import { connect } from 'react-redux';
import { SafeAreaView } from "react-native";

// custom imports
import Navigator from "./navigator";
import Indicator from "./components/indicator";

class AppRoot extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <SafeAreaView>
        <Navigator />
        {loading && <Indicator />}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  console.log("appRoot state: ", state);
  return {
    loading: state.news.loading
  }
}

export default connect(mapStateToProps, null)(AppRoot);