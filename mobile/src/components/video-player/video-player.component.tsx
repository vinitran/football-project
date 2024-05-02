import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BaseVideoPlayer from 'react-native-media-console';
import { useTheme } from '../../hook/theme.hook';
import { AppTheme } from '../../theme/theme';
import { VIDEO, isIos, isTablet } from './video-player.const';
import Orientation from 'react-native-orientation-locker';
import { useAnimations } from '@react-native-media-console/reanimated';
import useBackbuttonHandler from './utils';
import { Icon } from '../icon/icon.component';
import { useNavigation } from '@react-navigation/native';

interface VideoPlayerProps {
  uri?: string;
  isLive?: boolean;
}

export const VideoPlayer = ({ uri, isLive = false }: VideoPlayerProps) => {
  const { setOptions } = useNavigation();
  const theme = useTheme();
  const styles = initStyles(theme, isTablet());

  const [fullScreenTapEnabled, setFullScreenTapEnabled] = useState(false);
  const [videoDisplayMode, setVideoDisplayMode] = useState<'portrait' | 'landscape'>(
    VIDEO.videoDisplayModes.portrait
  );

  const videoRef = useRef<any>();

  const isPortrait = useMemo(() => {
    return videoDisplayMode === VIDEO.videoDisplayModes.portrait;
  }, [videoDisplayMode]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFullScreenTapEnabled(true);
    }, 0); //this is workaround for https://github.com/LunatiqueCoder/react-native-media-console/issues/76 issue.
    return () => {
      clearTimeout(delay);
    }; // Clear the timeout when the effect unmounts
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      videoDisplayMode === VIDEO.videoDisplayModes.portrait
        ? Orientation.lockToPortrait()
        : Orientation.lockToLandscape();
    }, 0);
    return () => {
      clearTimeout(delay);
    }; // Clear the timeout when the effect unmounts
  }, [videoDisplayMode]);

  const switchToPortrait = () => {
    setOptions({
      headerShown: true,
    });
    setVideoDisplayMode(VIDEO.videoDisplayModes.portrait);
    if (!isIos()) {
      videoRef?.current?.dismissFullscreenPlayer();
    }
  };

  const switchToLandscape = () => {
    setOptions({
      headerShown: false,
    });
    setVideoDisplayMode(VIDEO.videoDisplayModes.landscape);
    if (!isIos()) {
      videoRef?.current?.presentFullscreenPlayer();
    }
  };

  const onFullScreenIconToggle = () => {
    if (fullScreenTapEnabled) {
      if (isPortrait) {
        switchToLandscape();
      } else {
        switchToPortrait();
      }
    }
  };

  useBackbuttonHandler(!isPortrait ? switchToPortrait : undefined);

  const handleError = (errorObj: any) => {
    console.log(errorObj);
    if (errorObj?.error?.errorCode === 'INVALID_URL') {
      return;
    }

    if (
      errorObj &&
      errorObj.error &&
      (errorObj.error.localizedDescription || errorObj.error.localizedFailureReason)
    ) {
      let errorMessage = `${errorObj.error.code ? `${errorObj.error.code} : ` : ''} ${
        errorObj.error.localizedFailureReason
          ? errorObj.error.localizedFailureReason
          : errorObj.error.localizedDescription
          ? errorObj.error.localizedDescription
          : ''
      }`;
      Alert.alert('Error!', errorMessage, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      Alert.alert('Error!', 'An error occured while playing the video.' + uri, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  return (
    <View style={isPortrait ? styles.portraitVideoContainer : styles.landscapeVideoContainer}>
      <BaseVideoPlayer
        source={{
          uri: uri,
          type: 'm3u8',
        }}
        showOnStart={false}
        disableBack={isPortrait}
        repeat
        disableDisconnectError={true}
        controlAnimationTiming={VIDEO.controlAnimationTiming}
        controlTimeoutDelay={VIDEO.controlTimeoutDelay}
        rewindTime={VIDEO.rewindTime}
        resizeMode={VIDEO.resizeMode}
        videoRef={videoRef}
        useAnimations={useAnimations}
        videoStyle={{ backgroundColor: '#000000' }}
        onEnterFullscreen={onFullScreenIconToggle}
        onExitFullscreen={onFullScreenIconToggle}
        onBack={switchToPortrait}
        onError={handleError}
        pictureInPicture={true}
        playWhenInactive={true}
        disableTimer={isLive}
        disableSeekbar={isLive}
      />
      {isLive ? (
        <View style={styles.liveWrapper}>
          <Icon name="red-dot" style={styles.redDot}></Icon>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const initStyles = (theme: AppTheme, isTablet: boolean) => {
  return StyleSheet.create({
    portraitVideoContainer: {
      width: '100%',
      height: isTablet ? 350 : 222,
    },
    landscapeVideoContainer: {
      width: '100%',
      height: theme.fullWidth,
    },
    redDot: {},
    liveText: {
      color: theme.textContrastColor,
      fontSize: theme.fontS,
    },
    liveWrapper: {
      position: 'absolute',
      left: theme.spaceMS,
      bottom: theme.spaceM,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};
