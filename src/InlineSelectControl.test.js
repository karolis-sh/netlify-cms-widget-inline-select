import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { render, fireEvent } from '@testing-library/react';
// import 'react-testing-library/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import InlineSelectControl from './InlineSelectControl';

const options = [
  { value: 'Foo', label: 'Foo' },
  { value: 'Bar', label: 'Bar' },
  { value: 'Baz', label: 'Baz' },
];

class InlineSelectController extends React.Component {
  handleOnChange = jest.fn(value => {
    this.setState({ value });
  });

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue, // eslint-disable-line react/prop-types
    };
  }

  componentDidUpdate() {
    const { onStateChange } = this.props;
    onStateChange(this.state);
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;
    return children({ value, handleOnChange: this.handleOnChange });
  }
}

InlineSelectController.propTypes = {
  children: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
};

function setup({ field, defaultValue }) {
  let renderArgs;
  const stateChangeSpy = jest.fn();
  const setActiveSpy = jest.fn();
  const setInactiveSpy = jest.fn();

  const helpers = render(
    <InlineSelectController defaultValue={defaultValue} onStateChange={stateChangeSpy}>
      {({ value, handleOnChange }) => {
        renderArgs = { value, onChangeSpy: handleOnChange };
        return (
          <InlineSelectControl
            field={field}
            value={value}
            onChange={handleOnChange}
            forID="inline-select"
            classNameWrapper=""
            setActiveStyle={setActiveSpy}
            setInactiveStyle={setInactiveSpy}
          />
        );
      }}
    </InlineSelectController>
  );

  return {
    ...helpers,
    ...renderArgs,
    stateChangeSpy,
    setActiveSpy,
    setInactiveSpy,
  };
}

describe('InlineSelectControl', () => {
  describe('radios', () => {
    const expectRadioInput = (element, checked = false) => {
      expect(element).toBeInTheDocument();
      expect(element.type).toEqual('radio');
      expect(element.checked).toBe(checked);
    };

    it('should respect value', () => {
      const field = fromJS({ options, name: 'radio_1' });
      const { getByLabelText } = setup({ field, defaultValue: options[2].value });

      expectRadioInput(getByLabelText('Foo'));
      expectRadioInput(getByLabelText('Bar'));
      expectRadioInput(getByLabelText('Baz'), true);
    });

    it('should call onChange with correct selectedItem', () => {
      const field = fromJS({ options, name: 'radio_1' });
      const { getByLabelText, onChangeSpy } = setup({ field });

      expectRadioInput(getByLabelText('Foo'));
      expectRadioInput(getByLabelText('Bar'));
      expectRadioInput(getByLabelText('Baz'));

      fireEvent.click(getByLabelText('Foo'));

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(options[0].value);
    });
  });

  describe('checkboxes', () => {
    const expectCheckboxInput = (element, checked = false) => {
      expect(element).toBeInTheDocument();
      expect(element.type).toEqual('checkbox');
      expect(element.checked).toBe(checked);
    };

    it('should respect value', () => {
      const field = fromJS({ options, name: 'checkbox_1', multiple: true });
      const { getByLabelText } = setup({
        field,
        defaultValue: fromJS([options[1].value, options[2].value]),
      });

      expectCheckboxInput(getByLabelText('Foo'));
      expectCheckboxInput(getByLabelText('Bar'), true);
      expectCheckboxInput(getByLabelText('Baz'), true);
    });

    it('should call onChange with correct selectedItem', () => {
      const field = fromJS({ options, name: 'checkbox_1', multiple: true });
      const { getByLabelText, onChangeSpy } = setup({ field });

      expectCheckboxInput(getByLabelText('Foo'));
      expectCheckboxInput(getByLabelText('Bar'));
      expectCheckboxInput(getByLabelText('Baz'));

      fireEvent.click(getByLabelText('Foo'));
      fireEvent.click(getByLabelText('Baz'));

      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy).toHaveBeenCalledWith([options[0].value]);
      expect(onChangeSpy).toHaveBeenCalledWith([options[0].value, options[2].value]);
    });
  });
});
