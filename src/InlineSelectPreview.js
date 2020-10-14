import React from 'react';
import PropTypes from 'prop-types';
import { fonts, colorsRaw, WidgetPreviewContainer } from 'netlify-cms-ui-default';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { getOptions, getValue } from './utils';

export default function InlineSelectPreview({ value: rawValue, field }) {
  const options = getOptions({ field });
  const value = getValue(rawValue, { field });
  const values = Array.isArray(value) ? value : [value];
  const items = options.filter((optionsItem) => values.find((item) => item === optionsItem.value));
  const name = field.get('name');

  if (options.length === 0) {
    return <div>Error rendering inline-select control for {name}: No options</div>;
  }

  return (
    <WidgetPreviewContainer>
      <div
        className="netlify-cms-widget-inline-select-preview"
        style={{
          fontFamily: fonts.primary,
          margin: '0 -2px',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {items.map((item) => (
          <span
            key={item.value}
            className="netlify-cms-widget-inline-select-preview__badge"
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
    </WidgetPreviewContainer>
  );
}

InlineSelectPreview.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    ImmutablePropTypes.listOf(PropTypes.string),
  ]),
  field: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
};
