import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../index";

describe("<App />", () => {
  test("renders", () => {
    const wrapper = shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});