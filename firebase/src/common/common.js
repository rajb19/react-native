import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

// database reference
export const db = database();

// all collection list
export const collections = {
  users: firestore().collection('users')
}