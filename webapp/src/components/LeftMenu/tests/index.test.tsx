import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LeftMenu from "../index";

describe("<LeftMenu />", () => {
  test("renders", () => {
    const selectedComponent = 'tickets';
    const setSelectedComponent = jest.fn();
    const wrapper = shallow(<LeftMenu selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});