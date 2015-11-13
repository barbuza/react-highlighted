jest.dontMock('../src/ReactHighlighted');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const ReactHighlighted = require('../src/ReactHighlighted');

function getResult(component) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(component);
  return shallowRenderer.getRenderOutput();
}

describe('ReactHighlighted', () => {

  it('renders no matches', () => {
    const result = getResult(<ReactHighlighted text='foo bar spam' query='eggs' />);

    expect(result.props.children).toEqual(
      <span>foo bar spam</span>
    );
  });

  it('renders one match', () => {
    const result = getResult(<ReactHighlighted text='foo bar spam' query='bar'/>);

    expect(result.props.children).toEqual([
      <span key={0}>foo </span>,
      <em key={1}>bar</em>,
      <span key={2}> spam</span>
    ]);
  });

  it('renders two matches', () => {
    const result = getResult(<ReactHighlighted text='foo bar spam' query='a'/>);

    expect(result.props.children).toEqual([
      <span key={0}>foo b</span>,
      <em key={1}>a</em>,
      <span key={2}>r sp</span>,
      <em key={3}>a</em>,
      <span key={4}>m</span>
    ]);
  });

  it('works in case sensitive mode', () => {
    const noMatch = getResult(<ReactHighlighted text='foo bar spam' query='Foo' caseSensitive/>);

    expect(noMatch.props.children).toEqual(
      <span>foo bar spam</span>
    );

    const match = getResult(<ReactHighlighted text='Foo bar spam' query='Foo' caseSensitive/>);

    expect(match.props.children).toEqual([
      <em key={0}>Foo</em>,
      <span key={1}> bar spam</span>
    ]);
  });

  it('works with custom tags and props', () => {
    const result = getResult(
      <ReactHighlighted tag='div' textTag='div' textProps={{className: 'text'}}
                        higlightTag='div' higlightProps={{className: 'highlight'}}
                        text='foo bar' query='foo' className='container'/>
    );

    expect(result.type).toBe('div');
    expect(result.props.className).toBe('container');
    expect(result.props.children).toEqual([
      <div key={0} className='highlight'>foo</div>,
      <div key={1} className='text'> bar</div>
    ]);
  });

});
