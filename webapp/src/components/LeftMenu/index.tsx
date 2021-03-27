import React, { useState } from 'react';
import { Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { LeftMenuContainer, MenuElement } from './styles';

interface Props {
  propsSelected?: string;
}

const LeftMenu: React.FunctionComponent<Props> = ({ propsSelected }) => {
  const [selected, setSelected] = useState(propsSelected || 'tickets')

  const handleClick = (e: { target: HTMLInputElement }) => {
    setSelected(e.target.id);
  }

  return (
    <LeftMenuContainer >
      <MenuElement id="tickets" selected={selected} onClick={handleClick}>
        <Icon icon={IconNames.BOOKMARK} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}} />
        <span style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>Tickets</span>
        <Icon icon={IconNames.CHEVRON_RIGHT} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}}/>
      </MenuElement>
      <MenuElement id="statistics" selected={selected} onClick={handleClick}>
        <Icon icon={IconNames.CHART} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}} />
        <span style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>Statistics</span>
        <Icon icon={IconNames.CHEVRON_RIGHT} iconSize={Icon.SIZE_LARGE} intent={Intent.NONE} style={{display: 'flex', alignItems: 'center'}}/>
      </MenuElement>
    </LeftMenuContainer>
  );
};

export default LeftMenu;