import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-simple-toast';
import { SafeAreaView, View, Alert, Text, TouchableOpacity, Image, FlatList } from "react-native";

// custom imports
import { LogoutAction } from '../../redux/actions';
import * as Routes from "../../navigator/routes";
import { Icons } from '../../common/constants';
import styles from "./styles";
import { getTableData, Tables, realm } from '../../database';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={[styles.headerContainer, styles.left]} onPress={this.logout}>
          <Image style={styles.icon} source={Icons.logout} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={[styles.headerContainer, styles.right]}
          onPress={() => this.props.navigation.navigate(Routes.PROFILE)} >
          <Image style={styles.icon} source={Icons.profile} />
        </TouchableOpacity>
      ),
    })

    this.state = {
      users: []
    }
  }

  logout = async () => {
    await this.props.logoutAction();
  }

  componentDidMount() {
    const focus = this.props.navigation.addListener('focus', () => {
      const users = getTableData(Tables.USERS)
      this.setState({ users });
    });

  }

  handleEdit = (user) => {
    this.props.navigation.navigate(Routes.PROFILE, { user });
  }

  handleDelete = (user) => {
    Alert.alert(
      "Delete User",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            try {
              realm.write(() => {
                realm.delete(user)
                const users = getTableData(Tables.USERS)
                this.setState({ users });
                Toast.show('User Deleted Successfully');
              })
            } catch (error) {
              console.log("Error: ", error);
              Toast.show('Somthing went wrong!');
            }
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { users } = this.state;
    return (
      <SafeAreaView>
        <FlatList
          data={users}
          extraData={users}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, alignItems: 'center', marginVertical: 40 }}>
                <Text style={{}} >{'No data found!'} </Text>
              </View>
            )
          }}
          renderItem={({ item, index }) =>
            <TouchableOpacity key={index.toString()} activeOpacity={0.6}
              style={{ backgroundColor: 'grey', margin: 10, borderRadius: 6, flexDirection: 'row' }}>
              <View style={{ flex: 3 }}>
                <Text style={{ padding: 10, color: 'white' }} >{`${item.firstName} ${item.lastName}`} </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }} >
                <TouchableOpacity onPress={() => this.handleEdit(item)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                  <Image style={[styles.icon, { tintColor: "green" }]} source={Icons.edit} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleDelete(item)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                  <Image style={[styles.icon, { tintColor: "red" }]} source={Icons.trash} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          } />
      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: bindActionCreators(LogoutAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Home);