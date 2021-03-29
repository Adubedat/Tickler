import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LeftMenu from "../index";

describe("<LeftMenu />", () => {
  test("renders", () => {
    const wrapper = shallow(<LeftMenu />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});