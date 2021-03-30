import React, { useState } from 'react';
import { Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { LeftMenuContainer, MenuElement } from './styles';
import { useUserState } from '../../context/User';

interface Props {
  propsSelected?: string;
}

const LeftMenu: React.FunctionComponent<Props> = ({ propsSelected }) => {
  const [selected, setSelected] = useState(propsSelected || 'tickets')
  const user = useUserState();

  const handleClick = (e: { target: HTMLInputElement }) => {
    setSelected(e.target.id);
  }

  const displayStatistics = () => {
    if (user.role === "admin") {
      return (
        <MenuElement id="statistics" selected={selected} onClick={handleClick}>
          <Icon icon={IconNames.CHART} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}} />
          <span style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>Statistics</span>
          <Icon icon={IconNames.CHEVRON_RIGHT} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}}/>
        </MenuElement>
    );
    }
  }

  return (
    <LeftMenuContainer >
      <MenuElement id="tickets" selected={selected} onClick={handleClick}>
        <Icon icon={IconNames.BOOKMARK} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}} />
        <span style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>Tickets</span>
        <Icon icon={IconNames.CHEVRON_RIGHT} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}}/>
      </MenuElement>
      {displayStatistics()}
    </LeftMenuContainer>
  );
};

export default LeftMenu;