export const checkEmpty = (value) => {
  if (value.trim() !== '') {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.trim() !== '') {
    return regex.test(email);
  } else {
    return false;
  }
};
