const convertValue = (value) => {
  if (!value) return value;

  if (typeof value.toJS === 'function') {
    return value.toJS();
  }

  return value;
};

export default (rawValue, { field }) => {
  const isMultiple = field.get('multiple') === true;
  const value = convertValue(rawValue);

  if (isMultiple) {
    if (value == null) return [];
    return Array.isArray(value) ? value : [value];
  }

  return value;
};
