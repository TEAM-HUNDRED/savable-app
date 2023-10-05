import React, {useMemo} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {AppStyles} from '../../../config';
import SVText from '../SVText';

type PropsType = {
  children: string;
  onPress?: (event: GestureResponderEvent) => void;
  outline?: boolean;
  color?: string;
  textColor?: string;
  borderRadius?: number;
  disabled?: boolean;
};

function SVButton({
  children,
  onPress,
  outline = false,
  color = AppStyles.color.mint04,
  textColor = AppStyles.color.white,
  borderRadius = 0,
  disabled = false,
}: PropsType) {
  const _styles = useMemo(
    () => ({
      container: {
        width: '100%',
        backgroundColor: color,
        borderRadius,
      } as StyleProp<ViewStyle>,
      outlineContainer: {
        width: '100%',
        borderColor: color,
        borderWidth: AppStyles.scaleWidth(1),
        borderRadius,
      } as StyleProp<ViewStyle>,
      disabledContainer: {
        backgroundColor: AppStyles.color.lightGray,
        borderRadius,
      } as StyleProp<ViewStyle>,
    }),
    [color, borderRadius],
  );

  const _textColor = useMemo(() => {
    if (disabled) return AppStyles.color.white;
    if (outline) return color;
    return textColor;
  }, [outline, textColor, disabled, color]);

  const buttonContainerColor = useMemo(() => {
    if (disabled) return _styles.disabledContainer;
    if (outline) return _styles.outlineContainer;
    return _styles.container;
  }, [disabled, outline, _styles]);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <View style={[styles.defaultContainer, buttonContainerColor]}>
        <SVText body01 color={_textColor}>
          {children}
        </SVText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(SVButton);
