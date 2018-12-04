import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { colorsRaw } from 'netlify-cms-ui-default';

export default class Option extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
  }

  render() {
    const { name, value, label, onChange, selected, multiple } = this.props;
    const id = `${this.id}_${value}`;

    return (
      <span
        css={`
          padding: 2px 6px;
          margin: 2px;
          color: ${selected ? 'white' : 'inherit'};
          background-color: ${selected ? colorsRaw.blue : colorsRaw.grayLight};
          border: 2px solid transparent;
          border-radius: 5px;

          :hover {
            border-color: ${selected ? 'transparent' : colorsRaw.blue};
            color: ${selected ? 'white' : colorsRaw.blue};
          }
        `}
      >
        <label
          htmlFor={id}
          css={`
            cursor: pointer;
            padding-right: 2px;
            display: flex;
            align-items: center;

            > input {
              margin-right: 6px;
            }
          `}
        >
          <input
            id={id}
            type={multiple ? 'checkbox' : 'radio'}
            name={name}
            checked={selected}
            onClick={() => onChange()}
          />
          <span>{label}</span>
        </label>
      </span>
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
