import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Login } from "../index";
import { createMemoryHistory } from 'history';

describe("<Login />", () => {
  test("renders", () => {
    const historyMock = createMemoryHistory();
    const wrapper = shallow(<Login history={historyMock}/>);

    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });
});