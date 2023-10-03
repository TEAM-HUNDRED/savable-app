import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

function VerificationScreen() {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    requestPermission();
  }, []);

  if (device == null) return <View />;
  // <NoCameraErrorView />;

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(VerificationScreen);
