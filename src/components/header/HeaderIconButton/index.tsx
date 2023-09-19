import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppStyles} from '../../../config';

type HeaderTextButtonPropsType = {
  icon: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
};

function HeaderIconButton({
  onPress,
  icon,
  color,
}: HeaderTextButtonPropsType): React.ReactElement {
  const iconStyle = StyleSheet.flatten([
    styles.icon,
    color ? {tintColor: color} : {},
  ]);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={icon} style={iconStyle} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: AppStyles.scaleWidth(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: AppStyles.scaleWidth(24),
    height: AppStyles.scaleWidth(24),
  },
});

export default HeaderIconButton;
