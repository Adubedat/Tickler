import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { PageNotFound } from "../index";

describe("<PageNotFound />", () => {
  test("renders", () => {
    const wrapper = shallow(<PageNotFound />);

    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });
});