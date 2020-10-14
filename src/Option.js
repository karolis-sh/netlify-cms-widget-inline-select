import React from 'react';
import PropTypes from 'prop-types';

import { colorsRaw } from 'netlify-cms-ui-default';

import { NAME } from './constants';
import { getGUID } from './utils';

export default class Option extends React.Component {
  constructor(props) {
    super(props);
    this.id = getGUID();
  }

  render() {
    const { name, value, label, onChange, selected, multiple } = this.props;
    const id = `${this.id}_${value}`;

    return (
      <>
        <style>{`.${NAME}__option:hover { filter: invert(15%); }`}</style>
        <span
          className={`${NAME}__option`}
          style={{
            padding: '2px 6px',
            margin: 2,
            color: selected ? 'white' : 'inherit',
            backgroundColor: selected ? colorsRaw.blue : colorsRaw.grayLight,
            border: '2px solid transparent',
            borderRadius: 5,
          }}
        >
          <label
            htmlFor={id}
            style={{
              cursor: 'pointer',
              paddingRight: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              id={id}
              style={{
                marginRight: 6,
              }}
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              checked={selected}
              onChange={() => null}
              onClick={() => onChange()}
            />
            <span>{label}</span>
          </label>
        </span>
      </>
    );
  }
}

Option.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  multiple: PropTypes.bool,
};
