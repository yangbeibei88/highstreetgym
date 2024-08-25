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
    if (!value.match(re)) {
      return `Please enter a valid email address.`;
    }
    if (value.length > 254) {
      return `${name} must not exceed 254 characters.`;
    }
  }
  return null;
};

// validate phone number
export const validatePhoneNumber = (name, value, required = true) => {};
