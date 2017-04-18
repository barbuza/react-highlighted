import * as React from "react";

function matchIndex(text: string, query: string, sensitive?: boolean) {
  if (sensitive) {
    return text.indexOf(query);
  }
  return text.toLowerCase().indexOf(query.toLowerCase());
}

export type IFactory = (value: string) => React.ReactElement<any>;

export function higlight(text: string, query: string, textFactory: IFactory, highlightFactory: IFactory, sensitive?: boolean): React.ReactFragment {
  if (!query.length || matchIndex(text, query, sensitive) === -1) {
    return textFactory(text);
  }

  const result: Array<React.ReactElement<any>> = [];
  function push(el: React.ReactElement<any>) {
    result.push(React.cloneElement(el, { key: result.length }));
  }

  let rest = text;
  let index = matchIndex(rest, query, sensitive);
  while (index !== -1) {
    if (index !== 0) {
      push(textFactory(rest.substr(0, index)));
    }
    push(highlightFactory(rest.substr(index, query.length)));
    rest = rest.substr(index + query.length);
    index = matchIndex(rest, query, sensitive);
  }
  if (rest.length) {
    push(textFactory(rest));
  }
  return result;
}
