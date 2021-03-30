import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Statistics from "../index";

describe("<Statistics />", () => {
  test("renders", () => {
    const wrapper = shallow(<Statistics />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});