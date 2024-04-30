import React from 'react';
import styled from 'styled-components';
import { usePlayer } from './PlayerProvider';
import { IconPlay } from '../../assets/icon/IconPlay';
import { IconPause } from '../../assets/icon/IconPause';
import { square } from '../../assets/css/helper';
import { controlsTransition } from '../../assets/css/player';
import { useAppSelector } from '../../stores/store';

const PlayButton = styled.button`
  display: flex;
  ${controlsTransition};
`;

const PlayIcon = styled(IconPlay)`
  ${square('4rem')};
`;

const PauseIcon = styled(IconPause)`
  ${square('4rem')};
`;

export const PlayerControlsPlay: React.FC = () => {
  const playing = useAppSelector((state) => state.player.playing);
  const { togglePlay } = usePlayer();

  return (
    <PlayButton type="button" onClick={togglePlay}>
      {playing ? <PauseIcon /> : <PlayIcon />}
    </PlayButton>
  );
};
