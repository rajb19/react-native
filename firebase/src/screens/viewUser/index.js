import React from 'react';
import { isEmpty } from "lodash";
import Toast from "react-native-simple-toast";
import { TouchableOpacity, FlatList, View, Text, Image, ActivityIndicator, Alert } from 'react-native';

// custom imports
import styles from "./styles";
import * as routes from "../../navigator/routes";
import { collections, db } from '../../common/common';

class ViewUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.focus = this.props.navigation.addListener('focus', () => {
      this.getUser()
    })
  }

  getUser = () => {
    // using firesore
    // collections.users.get()
    //   .then(snapshot => {
    //     const data = []
    //     snapshot
    //       .forEach(doc => {
    //         const temp = {
    //           id: doc.id,
    //           fname: doc.data().fname,
    //           lname: doc.data().lname,
    //         }
    //         data.push(temp)
    //       });
    //     this.setState({ users: data })
    //   });

    // using database
    db.ref('users').once('value')
      .then(snapshot => {
        const values = Object.values(snapshot.val())
        const keys = Object.keys(snapshot.val())
        const data = []
        values.map((item, index) => {
          const temp = {
            id: keys[index],
            fname: item.fname,
            lname: item.lname,
          }
          data.push(temp)
        })
        this.setState({ users: data })
      });
  }

  handleEdit = (id) => {
    this.props.navigation.navigate(routes.ADDUSER, {
      userId: id,
    });
  }

  handelDelete = (id) => {
    Alert.alert(
      'Delete',
      'Are you sure?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => {

            // using firestore
            // collections.users.doc(id)
            //   .delete()
            //   .then(() => {
            //     Toast.show('user has been deleted successfully!');
            //   });

            // using database
            db.ref(`/users/${id}`)
              .remove()
              .then(() => {
                Toast.show('user has been deleted successfully!');
              });

            // get updated users
            this.getUser()
          }
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    const { users } = this.state;
    return (
      isEmpty(users) ? (
        <View style={[{ alignItems: 'center', marginTop: 20 }]}>
          <Text style={styles.headingText}>No data found!</Text>
        </View>
      ) :
        <View style={styles.safeAreaView}>
          <View style={styles.container} >
            <View style={[{ alignItems: 'center' }]}>
              <Text style={styles.headingText}>List of Users</Text>
            </View>
            <FlatList
              style={{ width: '100%' }}
              data={users}
              extraData={users}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'grey', height: 40, width: '100%', borderRadius: 5, marginVertical: 10, alignItems: 'center' }} >
                  <View style={{ flexDirection: 'row' }} >
                    <Text style={{ marginHorizontal: 10, color: 'white' }} >{item.fname}</Text>
                    <Text style={{ marginHorizontal: 10, color: 'white' }} >{item.lname}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', height: '100%' }} >
                    <TouchableOpacity activeOpacity={0.3} onPress={() => this.handleEdit(item.id)}
                      style={{ marginHorizontal: 2, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
                      <Image style={{ marginHorizontal: 10, height: 20, width: 20, tintColor: 'white' }} source={require('../../../assests/icons/icon_edit.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => this.handelDelete(item.id)}
                      style={{ marginHorizontal: 2, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
                      <Image style={{ marginHorizontal: 10, height: 20, width: 20, tintColor: 'white' }} source={require('../../../assests/icons/icon_delete.png')} />
                    </TouchableOpacity>
                  </View>
                </View>}
              keyExtractor={item => item.id} />
          </View>
        </View>
    );
  }
};

export default ViewUser;
