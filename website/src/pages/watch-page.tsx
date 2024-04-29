import React, { useRef } from 'react';
import styled from 'styled-components';
import { Spinner } from '../components/shared/Spinner';
// import { fillParent } from "@css/helper";
// import { Content } from "@css/helper/content";
import { Player } from '../components/player/Player';
import { useAppSelector } from '../stores/store';

const PlayerWrapper = styled.div``;

const SpinnerWrapper = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 50%;
  left: 50%;
`;

interface WatchProps {
  show: Api.TVDetails;
  browserCompatible: boolean;
}

// const PlayerIncompatible = styled.div`
//     ${fillParent};
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
// `;

export const WatchPage: React.FC<WatchProps> = ({ show }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waiting = useAppSelector((state) => state.player.waiting);

  // if (!browserCompatible)
  //     return (
  //         <PlayerIncompatible>
  //             <Content>
  //                 Your device/browser seems to be incompatible. Please download our app for the
  //                 best experience!
  //             </Content>
  //         </PlayerIncompatible>
  //     );

  return (
    <PlayerWrapper ref={containerRef}>
      {waiting && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      <Player show={show} fullscreenContainer={containerRef} />
    </PlayerWrapper>
  );
};
