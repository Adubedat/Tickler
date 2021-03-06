import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NavBar from "../index";

describe("<NavBar />", () => {
  test("renders", () => {
    const wrapper = shallow(<NavBar />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});