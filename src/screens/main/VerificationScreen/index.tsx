import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {AppStyles, MainScreenStackPropsList} from '../../../config';

function VerificationScreen() {
  const cameraRef = useRef<Camera>(null);

  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePhoto();
      const fetchResult = await fetch(`file://${result.path}`);
      const data = await fetchResult.blob();

      console.log(data);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);

  if (device == null) return <View />;
  // <NoCameraErrorView />;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        photo
      />
      <TouchableOpacity
        style={styles.takeButton}
        onPress={() => {
          takePhoto();
        }}>
        <View style={styles.circle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: AppStyles.color.black,
    paddingVertical: AppStyles.scaleWidth(80),
  },
  takeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: AppStyles.scaleWidth(40),
    width: AppStyles.scaleWidth(80),
    height: AppStyles.scaleWidth(80),
    borderRadius: AppStyles.scaleWidth(40),
    backgroundColor: AppStyles.color.white,
  },
  circle: {
    borderWidth: AppStyles.scaleWidth(2),
    width: AppStyles.scaleWidth(70),
    height: AppStyles.scaleWidth(70),
    borderRadius: AppStyles.scaleWidth(35),
  },
});

export default React.memo(VerificationScreen);
