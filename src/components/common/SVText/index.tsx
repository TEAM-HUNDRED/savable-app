import React, {useMemo} from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';

import {AppStyles} from '../../../config';

interface IProps extends TextProps {
  children: string | string[] | number | number[] | JSX.Element[] | JSX.Element;
  headline01?: boolean;
  headline02?: boolean;
  header01?: boolean;
  header02?: boolean;
  header03?: boolean;
  header04?: boolean;
  header05?: boolean;
  body01?: boolean;
  body02?: boolean;
  body03?: boolean;
  body04?: boolean;
  body05?: boolean;
  body06?: boolean;
  body07?: boolean;
  body08?: boolean;
  caption01?: boolean;
  caption02?: boolean;
  caption03?: boolean;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const PMText: React.FC<IProps> = ({
  children,
  headline01,
  headline02,

  center,
  left,
  right,
  style,
  color,
  ...rest
}) => {
  const textTypeStyle: StyleProp<TextStyle> = useMemo(() => {
    if (headline01) return AppStyles.typography.headline01;
    if (headline02) return AppStyles.typography.headline02;

    return {};
  }, [headline01, headline02]);

  const textAlightStyle: StyleProp<TextStyle> = useMemo(() => {
    if (left) return {textAlign: 'left'} as StyleProp<TextStyle>;
    if (right) return {textAlign: 'right'} as StyleProp<TextStyle>;
    if (center) return {textAlign: 'center'} as StyleProp<TextStyle>;
    return {textAlign: 'left'} as StyleProp<TextStyle>;
  }, [center, right, left]);

  const textColor = useMemo(() => (color ? {color} : {}), [color]);

  return (
    <Text style={[textTypeStyle, textAlightStyle, textColor, style]} {...rest}>
      {children}
    </Text>
  );
};

export default React.memo(PMText);
