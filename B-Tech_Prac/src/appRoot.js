import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';

// custom imports
import { Colors } from './common/constants';
import Indicator from './components/indicator';
import Home from './screens/home';

class AppRoot extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Home />
        {loading && <Indicator />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  }
})

const mapStateToProps = (state) => ({
  loading: state.app.loading,
});

export default connect(mapStateToProps, null)(AppRoot);