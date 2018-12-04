import React from 'react';
import PropTypes from 'prop-types';
import { fonts, colorsRaw } from 'netlify-cms-ui-default';

import { getOptions } from './utils';

export default function InlineSelectPreview({ value, field }) {
  const options = getOptions({ field });
  const values = Array.isArray(value) ? value : [value];
  const items = options.filter(optionsItem => values.find(item => item === optionsItem.value));
  const name = field.get('name');

  if (options.length === 0) {
    return <div>Error rendering inline-select control for {name}: No options</div>;
  }

  return (
    <div
      style={{
        fontFamily: fonts.primary,
        padding: '4px 2px',
        margin: '2px -4px',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {items.map(item => (
        <span
          key={item.value}
          style={{
            padding: '4px 8px',
            margin: '2px',
            background: colorsRaw.grayLight,
            borderRadius: '5px',
            color: colorsRaw.grayDark,
          }}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

InlineSelectPreview.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  field: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
};
