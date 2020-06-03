/**
 * string constants
 */
export const Constants = {
  PASSWORD: 'Password',
  EMAIL: 'Email',
  LOGIN: 'SIGN IN',
  REGISTER: 'SIGN UP',
  INVALIDEMAIL: 'invalid email',
  BLANKNOTALLOWD: 'can not be empty',
  SOMETHING_WENT_WRONG: 'something went wrong',
  SEND: 'SEND',
  UPDATE: 'UPDATE',
  RESET: 'RESET',
  PASSWORDMISMATCH: 'confirm password mismatch',
  LOGINSUCCESS: "Login Successful",
  INVALIDUSERPASSWORD: 'Invalid Username or Password',
  LOGOUTSUCCESS: 'Logout Successful',
  REGISTRATIONSUCESS: 'Registration Successful',
  SENDLINKSUCCESS: 'link send successfully',
  EMIALNOTEXISTS: "email doesn't exists",
  PASSWORDCHANGESUCESS: 'password has been updated.',
  PROFILEUPDATESUCESS: 'Profile Update Successfully',
};

/**
 * color constants
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0.6)',
  WHITE: '#fff',
  BLACK: '#OOO',
  TOMATO: 'tomato',
}

/**
 * icon constants
 */
export const Icons = {
  logout: require('../../assets/logout.png'),
  profile: require('../../assets/profile.png'),
  search: require('../../assets/search.png'),
  marker: require('../../assets/marker.png'),
}

const markerImages = [
  { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdtRVSolhQhM5VwxP3scgqA_sHKA4K4I36ZiUCxXsrzVf5CRTl&s" },
  { uri: "https://restaurantengine.com/wp-content/uploads/2015/05/startup-restaurants-typically-overspend.jpg" },
  { uri: "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  { uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }
]

export const staticMarkers = [
  {
    coordinate: {
      latitude: 45.524548,
      longitude: -122.6749817,
    },
    title: "The Grand Thakar",
    description: "Gujrati, Punjabi",
    image: markerImages[0],
  },
  {
    coordinate: {
      latitude: 45.524698,
      longitude: -122.6655507,
    },
    title: "TGT",
    description: "Special Gujarti, Punjabi",
    image: markerImages[1],
  },
  {
    coordinate: {
      latitude: 45.5230786,
      longitude: -122.6701034,
    },
    title: "Honest",
    description: "Punjabi, South Indian",
    image: markerImages[2],
  },
  {
    coordinate: {
      latitude: 45.521016,
      longitude: -122.6561917,
    },
    title: "Gujrati Restaurant",
    description: "Kathiyawadi, Gujarati",
    image: markerImages[3],
  },
];