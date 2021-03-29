import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Register } from "../index";
import { createMemoryHistory } from 'history';

describe("<Register />", () => {
  test("renders", () => {
    const historyMock = createMemoryHistory();
    const wrapper = shallow(<Register history={historyMock}/>);

    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });
});