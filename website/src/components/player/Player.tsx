import React from 'react';
import styled from 'styled-components';
import { usePlayer, withPlayer } from './PlayerProvider';
import { PlayerControls } from './PlayerControls';
import { fillParent, square } from '../../assets/css/helper';
import { IconArrowLeft } from '../../assets/icon/IconArrowLeft';
import { VideoDetail } from '../../interfaces/entites/video';
import { controlsTransition } from '../../assets/css/player';

const PlayerOverlay = styled.div`
  ${fillParent};
`;

const PlayerControlsWrapper = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const PlayerBack = styled.button`
  position: absolute;
  z-index: 1;
  top: 2rem;
  left: 2rem;

  ${(p) => p.theme.breakpoints.min('m')} {
    top: 4rem;
    left: 4rem;
  }
`;

const IconBack = styled(IconArrowLeft)`
  ${square('4rem')};
  ${controlsTransition};
`;

export interface PlayerProps {
  show: VideoDetail;
  fullscreenContainer: React.MutableRefObject<HTMLElement | null>;
}

export const Player = withPlayer(() => {
  const { controlsActive, togglePlay } = usePlayer();

  return (
    <React.Fragment>
      <PlayerOverlay onClick={togglePlay} />
      {controlsActive && (
        <React.Fragment>
          <PlayerBack onClick={() => {}}>
            <IconBack />
          </PlayerBack>
          <PlayerControlsWrapper>
            <PlayerControls />
          </PlayerControlsWrapper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
});
