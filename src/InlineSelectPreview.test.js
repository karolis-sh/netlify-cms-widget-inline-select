import React from 'react';
import { fromJS } from 'immutable';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import InlineSelectPreview from './InlineSelectPreview';

const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
  { value: 'baz', label: 'Baz' },
];

describe('InlineSelectPreview', () => {
  it('should render 1 value', () => {
    const { getByText, queryByText } = render(
      <InlineSelectPreview value="foo" field={fromJS({ options, name: 'radio_1' })} />
    );

    expect(getByText('Foo')).toBeInTheDocument();
    expect(queryByText('Bar')).not.toBeInTheDocument();
    expect(queryByText('Baz')).not.toBeInTheDocument();
  });

  it('should render list of values', () => {
    const { getByText, queryByText } = render(
      <InlineSelectPreview value={['foo', 'baz']} field={fromJS({ options, name: 'radio_1' })} />
    );

    expect(getByText('Foo')).toBeInTheDocument();
    expect(queryByText('Bar')).not.toBeInTheDocument();
    expect(getByText('Baz')).toBeInTheDocument();
  });
});
