import React, { useRef } from 'react';
import { useAxios } from '../hooks/use-axios';
import { useNavigate } from 'react-router-dom';
import { usePlayer, withPlayer } from '../components/player/PlayerProvider';
import { useAppSelector } from '../stores/store';
import VideoPlayer from '../components/video-player';

type Props = {
  // show: Api.TVDetails;
};

export const Test2Page = (props: Props) => {
  // const [{ data, loading, error }, refetch] = useAxios('/users?delay=1');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waiting = useAppSelector((state) => state.player.waiting);
  return (
    // <>
    //   Calling axios: {loading ? 'loading' : 'loaded'}
    //   <button onClick={() => refetch}>refetch</button>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </>
    <>
      <div>
        {/* <div ref={containerRef}>
      {waiting && (
        <>loading...</>
      )}
      <Player show={props.show} fullscreenContainer={containerRef} />
    </div> */}
        <VideoPlayer src="https://stream.vinitran1245612.workers.dev?apiurl=https://hl.thapcam.link/hls/2light/bda/fullmatch/rma-cad-5524.mp4/playlist.m3u8&is_m3u8=true" />
      </div>
    </>
  );
};

export const Player = withPlayer(() => {
  const navigate = useNavigate();
  const { controlsActive, togglePlay } = usePlayer();

  return (
    <React.Fragment>
      {/* <PlayerOverlay onClick={togglePlay} /> */}
      {controlsActive && (
        <React.Fragment>
          {/* <PlayerBack onClick={() => navigate(-1)}> */}
          {/* <IconBack /> */}
          {/* </PlayerBack> */}
          {/* <PlayerControlsWrapper> */}
          {/* <PlayerControls /> */}
          {/* </PlayerControlsWrapper> */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
});

// export const PlayerControls: React.FC = () => {
//   return (
//     <ControlsWrapper>
//       <PlayerControlsPlay />
//       <ProgressWrapper>
//         <PlayerControlsProgress />
//       </ProgressWrapper>
//       <PlayerControlsFullscreen />
//     </ControlsWrapper>
//   );
// };
