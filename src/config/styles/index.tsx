import memoize from 'lodash/memoize';
import {Dimensions, PixelRatio, TextStyle} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const standardWidth = Math.min(width, height);
const widthScaleRatio = standardWidth / 375;

const scaleFont = memoize((dp: number) =>
  PixelRatio.roundToNearestPixel(dp * widthScaleRatio),
);
const scaleWidth = memoize((dp: number) =>
  PixelRatio.roundToNearestPixel(dp * widthScaleRatio),
);

const color = {
  white: '#FFFFFF',

  black: '#000000',
};

type TypographyName = 'headline01' | 'headline02' | 'body06';

const typography: Record<TypographyName, TextStyle> = {
  headline01: {
    fontFamily: 'NotoSansKR-Black',
    fontSize: scaleFont(32),
    lineHeight: scaleFont(36),
    color: color.black,
  },
  headline02: {
    fontFamily: 'NotoSansKR-Black',
    fontSize: scaleFont(32),
    lineHeight: scaleFont(36),
    color: color.black,
  },
  body06: {
    fontFamily: 'NotoSansKR-Black',
    fontSize: scaleFont(13),
    lineHeight: scaleFont(15),
    color: color.black,
  },
};

export default {
  width,
  height,

  scaleFont,
  scaleWidth,

  typography,
  color,
};
