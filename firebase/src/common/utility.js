export const checkEmpty = (value) => {
  if (value.trim() !== '') {
    return true;
  } else {
    return false;
  }
};

export const checkPasswordLength = (value) => {
  if (value.length >= 6) {
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

export const validatePhoneNumber = (mobile) => {
  var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
  return regexp.test(mobile)
}

export const validateVerificationCode = (value) => {
  if (value.length === 6) {
    return true;
  } else {
    return false;
  }
}