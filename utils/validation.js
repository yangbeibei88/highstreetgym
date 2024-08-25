// validate a string
export const validateText = (
  name,
  value,
  min = 0,
  max = 254,
  required = true,
) => {
  value = value.trim();
  if (required && value.length === 0) {
    return `${name} is required.`;
  }
  if (value.length > 0 && value.length < min) {
    return `${name} is too short, should be more than ${min} characters.`;
  }
  if (value.length > max) {
    return `${name} is too long, should not exceed ${max} characters.`;
  }
  return null;
};

// validate an email address
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
export const validateEmail = (name, value, required = true) => {
  value = value.trim().toLowerCase();
  if (required && value.length === 0) {
    return `${name} is required.`;
  }
  if (value.length > 0) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)) {
      return `Invalid email address.`;
    }
    if (value.length > 254) {
      return `${name} must not exceed 254 characters.`;
    }
  }
  return null;
};

// validate phone number
// https://en.wikipedia.org/wiki/Telephone_numbers_in_Australia#:~:text=Australia%20or%20internationally.-,Mobile%20phones,XXX%20for%20an%20international%20audience.
export const validatePhoneNumber = (name, value, required = true) => {
  value = value.trim();
  if (required && value.length === 0) {
    return `${name} is required.`;
  }
  if (value.length > 0) {
    const re = /^0[2-478]\d{8}$/;
    if (!re.test(value)) {
      return `Invalid phone number. Your phone number must be 10 digits without any spaces, parentheses, or non-numeric characters`;
    }
  }
  return null;
};

// Validate password
export const validatePassword = (name, value, required = true) => {
  value = value.trim();
  if (required && value.length === 0) {
    return `${name} is required.`;
  }
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!re.test(value)) {
    return `Invalid password. Your password must be at least 8 characters long, containing uppercase(s), lowercase(s), number(s) and special chars.`;
  }

  return null;
};

// compare password
export const compareString = (name, str1, str2) => {
  str1 = str1.trim();
  str2 = str2.trim();

  if (str1.length > 0 || str2.length > 0) {
    if (str1 !== str2) {
      return `${name} do not match.`;
    }
    return null;
  }
};
