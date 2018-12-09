import React from 'react';
import PropTypes from 'prop-types';

import { getOptions, getValue } from './utils';
import Option from './Option';

export default class InlineSelectControl extends React.Component {
  isMultiple = () => {
    const { field } = this.props;
    return field.get('multiple') === true;
  };

  getValue = () => {
    const { value, field } = this.props;
    return getValue(value, { field });
  };

  isSelectedOption = itemValue => {
    const value = this.getValue();
    const isMultiple = this.isMultiple();

    if (isMultiple) {
      return !!(value && value.length && value.includes(itemValue));
    }
    return !!(value && value === itemValue);
  };

  onToggleChange = itemValue => {
    const { onChange } = this.props;
    const value = this.getValue();
    const isMultiple = this.isMultiple();
    const isCurrentlySelected = this.isSelectedOption(itemValue);

    if (isMultiple) {
      onChange(
        isCurrentlySelected ? value.filter(item => item !== itemValue) : [...value, itemValue]
      );
    } else {
      onChange(isCurrentlySelected ? undefined : itemValue);
    }
  };

  render() {
    const { field, classNameWrapper } = this.props;
    const options = getOptions({ field });
    const name = field.get('name');

    if (options.length === 0) {
      return <div>Error rendering inline-select control for {name}: No options</div>;
    }

    const isMultiple = this.isMultiple();

    return (
      <div className={classNameWrapper}>
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            word-break: break-all;
          `}
        >
          {options.map(item => (
            <Option
              {...item}
              key={item.value}
              name={name}
              selected={this.isSelectedOption(item.value)}
              onChange={() => this.onToggleChange(item.value)}
              multiple={isMultiple}
            />
          ))}
        </div>
      </div>
    );
  }
}

InlineSelectControl.propTypes = {
  classNameWrapper: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  field: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
};
