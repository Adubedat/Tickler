import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Tickets from "../index";

describe("<Tickets />", () => {
  test("renders", () => {
    const wrapper = shallow(<Tickets />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});