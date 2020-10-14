const logError = (value) => {
  console.error(`Provided options are not an array - "${JSON.stringify(value)}"`);
};

const mapOptions = (list) =>
  list.map((item) => (typeof item === 'string' ? { label: item, value: item } : item));

export default ({ field }) => {
  const options = field.get('options');

  if (!options) {
    logError(options);
    return [];
  }

  if (typeof options.toJS === 'function') {
    const value = options.toJS();
    if (Array.isArray(value)) return mapOptions(value);
    logError(value);
  }

  if (Array.isArray(options)) return mapOptions(options);

  logError(options);
  return [];
};
