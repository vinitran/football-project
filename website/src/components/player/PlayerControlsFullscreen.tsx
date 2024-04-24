import React from 'react';
import styled from 'styled-components';
import { usePlayer } from './PlayerProvider';
import { controlsTransition } from '../../assets/css/player';
import { IconMaximize } from '../../assets/icon/IconMaximize';
import { square } from '../../assets/css/helper';
import { IconMinimize } from '../../assets/icon/IconMinimize';
import { useAppSelector } from '../../stores/store';

const FullscreenButton = styled.button`
  display: flex;
  ${controlsTransition};
`;

const Maximize = styled(IconMaximize)`
  ${square('4rem')};
`;

const Minimize = styled(IconMinimize)`
  ${square('4rem')};
`;

export const PlayerControlsFullscreen: React.FC = () => {
  const fullscreen = useAppSelector((state) => state.player.fullscreen);
  const { toggleFullscreen } = usePlayer();

  return (
    <FullscreenButton type="button" onClick={toggleFullscreen}>
      {fullscreen ? <Minimize /> : <Maximize />}
    </FullscreenButton>
  );
};
