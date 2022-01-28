module.exports.PASSWORD_MIN_LENGTH = 6;
module.exports.PASSWORD_MAX_LENGTH = 256;

const isNonEmptyString = val => {
  return typeof val === 'string' && val.trim().length > 0;
};

module.exports.required = value => {
  if (typeof value === 'undefined' || value === null) {
    // undefined or null values are invalid
    return false;
  }
  if (typeof value === 'string') {
    // string must be nonempty when trimmed
    return isNonEmptyString(value);
  }
  return true;
};

module.exports.minLength = (value, minimumLength) => {
  const hasLength = value && typeof value.length === 'number';
  return hasLength && value.length >= minimumLength;
};

module.exports.maxLength = (value, maximumLength) => {
  if (!value) {
    return VALID;
  }
  const hasLength = value && typeof value.length === 'number';
  return hasLength && value.length <= maximumLength;
};

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

module.exports.emailFormatValid = value => {
  return value && EMAIL_RE.test(value);
};


