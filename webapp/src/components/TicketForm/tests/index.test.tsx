import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TicketsForm from "../index";

describe("<TicketsForm />", () => {
  test("renders", () => {
    const props = {
      toggleOverlay: () => {},
      createTicket: () => {},
      updateTicket: () => {},
      ticket: {
        _id: "",
        creator_id: "",
        title: "",
        description: "",
        priority: "Normal",
        severity: "Normal",
        status: "Open",
        number: 0,
        modified: "",
      },
      type: "Create"
    }
    const wrapper = shallow(<TicketsForm {...props}/>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});