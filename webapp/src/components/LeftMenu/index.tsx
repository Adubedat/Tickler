import React from 'react';
import { Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { LeftMenuContainer, MenuElement } from './styles';
import { useUserState } from '../../context/User';

interface Props {
  selectedComponent: string;
  setSelectedComponent: (selected: string) => void;
}

const LeftMenu: React.FunctionComponent<Props> = ({ selectedComponent, setSelectedComponent }) => {
  const user = useUserState();

  const handleClick = (e: { target: HTMLInputElement }) => {
    if (!e.target.id) return;
    setSelectedComponent(e.target.id);
  }

  const displayStatistics = () => {
    if (user.role === "admin") {
      return (
        <MenuElement id="statistics" selected={selectedComponent} onClick={handleClick}>
          <Icon icon={IconNames.CHART} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}} />
          <span style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>Statistics</span>
          <Icon icon={IconNames.CHEVRON_RIGHT} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}}/>
        </MenuElement>
    );
    }
  }

  return (
    <LeftMenuContainer >
      <MenuElement id="tickets" selected={selectedComponent} onClick={handleClick}>
        <Icon icon={IconNames.BOOKMARK} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}} />
        <span style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>Tickets</span>
        <Icon icon={IconNames.CHEVRON_RIGHT} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}}/>
      </MenuElement>
      {displayStatistics()}
    </LeftMenuContainer>
  );
};

export default LeftMenu;