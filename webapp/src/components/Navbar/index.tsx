import React, { MouseEvent } from 'react';
import {
  Alignment,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button
} from "@blueprintjs/core";
import { useUserDispatch, useUserState } from '../../context/User';
import { disconnectUser } from '../../context/User/actions';

const MyNavbar = () => {
  const dispatch = useUserDispatch();
  const user = useUserState();
  console.log(user);
  const handleLogout = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    disconnectUser(dispatch);
  }

  return (
      <Navbar className={Classes.DARK} style={{top: 0}}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Tickler</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <NavbarDivider />
          <Button className={Classes.MINIMAL} icon="user" text="Profile" />
          <Button className={Classes.MINIMAL} icon="log-out" text="" onClick={handleLogout}/>
        </NavbarGroup>
      </Navbar>
  );
};

export default MyNavbar;