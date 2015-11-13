import React, { PropTypes } from 'react';

function matchIndex(text, query, caseSensitive) {
  if (caseSensitive) {
    return text.indexOf(query);
  }
  return text.toLowerCase().indexOf(query.toLowerCase());
}

function higlightText(text, query, caseSensitive, textTag, textProps, higlightTag, higlightProps) {
  if (!query || !query.length || matchIndex(text, query, caseSensitive) === -1) {
    return React.createElement(
      textTag,
      textProps,
      text
    );
  }
  const result = [];
  let rest = text;
  let index = matchIndex(rest, query, caseSensitive);
  while (index !== -1) {
    if (index !== 0) {
      result.push(React.createElement(
        textTag,
        {...textProps, key: result.length},
        rest.substr(0, index)
      ));
    }
    result.push(React.createElement(
      higlightTag,
      {...higlightProps, key: result.length},
      rest.substr(index, query.length)
    ));
    rest = rest.substr(index + query.length);
    index = matchIndex(rest, query, caseSensitive);
  }
  if (rest.length) {
    result.push(React.createElement(
      textTag,
      {...textProps, key: result.length},
      rest
    ));
  }
  return result;
}

export default class ReactHighlighted extends React.Component {

  static propTypes = {
    caseSensitive: PropTypes.bool,
    tag: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    textTag: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    textProps: PropTypes.object,
    higlightTag: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    higlightProps: PropTypes.object,
    text: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired
  };

  static defaultProps = {
    caseSensitive: false,
    tag: 'span',
    textTag: 'span',
    textProps: {},
    higlightTag: 'em',
    higlightProps: {}
  };

  render() {
    const { caseSensitive, tag, textTag, textProps, higlightTag, higlightProps, text, query, ...props } = this.props;
    return React.createElement(
      tag,
      props,
      higlightText(text, query, caseSensitive, textTag, textProps, higlightTag, higlightProps)
    );
  }

}
