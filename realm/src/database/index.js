import Realm from "realm";

export const Tables = {
  USERS: 'users',
}

const UserSchema = {
  name: Tables.USERS,
  primaryKey: 'id',
  properties: {
    id: 'int',    // primary key
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string',
  }
}

export const realm = new Realm({ path: 'demo.realm', schemaVersion: 3, schema: [UserSchema] });

export const getTableData = (tableName = '', params = '') => {
  let result = realm.objects(tableName);
  return result;
}

export const addNewUser = (id, firstname, lastname, email, password) => {
  try {
    realm.write(() => {
      const user = realm.create(Tables.USERS, {
        id: id,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      });
    });
  } catch (e) {
    console.log("Error on creation", e);
    return false
  }
}