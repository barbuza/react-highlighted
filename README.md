# react-higlighted

highlight matching text with react components

## usage

```tsx
import { highlight } from "react-higlighted";

const span = (text: string) => <span>{text}</span>;
const em = (text: string) => <em>{text}</em>;

function SearchResult(props: { text: string, query: string }) {
  return (
    <div className="result">
      {highlight(props.text, props.query, span, em)}
    </div>
  );
}
```

see more examples in [tests](/src/__tests__/highlight-test.tsx)
