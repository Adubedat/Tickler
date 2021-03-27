import React from 'react';
import {
  Alignment,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button
} from "@blueprintjs/core";

const MyNavbar = () => {
  return (
      <Navbar className={Classes.DARK} style={{top: 0}}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Tickler</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <NavbarDivider />
          <Button className={Classes.MINIMAL} icon="user" text="Profile" />
        </NavbarGroup>
      </Navbar>
  );
};

export default MyNavbar;