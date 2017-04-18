import { shallow } from "enzyme";
import * as React from "react";
import { higlight } from "../highlight";

const span = (text: string) => <span>{text}</span>;
const em = (text: string) => <em>{text}</em>;
const high = (text: string, query: string, sensitive?: boolean) => higlight(text, query, span, em, sensitive);

describe("hightlight", () => {

  it("renders no matches", () => {
    const res = shallow(<div>{high("foo bar spam", "eggs")}</div>);
    expect(res.equals(
      <div>
        <span>foo bar spam</span>
      </div>,
    )).toBeTruthy();
  });

  it("renders one match", () => {
    const res = shallow(<div>{high("foo bar spam", "bar")}</div>);
    expect(res.equals(
      <div>
        <span>foo </span>
        <em>bar</em>
        <span> spam</span>
      </div>,
    )).toBeTruthy();
  });

  it("renders two matches", () => {
    const res = shallow(<div>{high("foo bar spam", "a")}</div>);

    expect(res.equals(
      <div>
        <span>foo b</span>
        <em>a</em>
        <span>r sp</span>
        <em>a</em>
        <span>m</span>
      </div>,
    )).toBeTruthy();
  });

  it("works in case sensitive mode", () => {
    const res = shallow(<div>{high("Foo bar spam", "Foo", true)}</div>);

    expect(res.equals(
      <div>
        <em>Foo</em>
        <span> bar spam</span>
      </div>,
    )).toBeTruthy();

    const res2 = shallow(<div>{high("foo bar spam", "Foo", true)}</div>);

    expect(res2.equals(
      <div>
        <span>foo bar spam</span>
      </div>,
    )).toBeTruthy();
  });

});
