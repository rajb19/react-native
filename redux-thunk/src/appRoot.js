/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigator from './navigator';
import Indicator from './component/indicator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

class AppRoot extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <SafeAreaProvider>
        <AppNavigator />
        {loading && <Indicator />}
      </SafeAreaProvider>
    );
  }
}

const mapStateToProps = (state) => (
  console.log("state: ", state.auth),
  {
    loading: state.auth.loading,
  });

export default connect(mapStateToProps, null)(AppRoot);
