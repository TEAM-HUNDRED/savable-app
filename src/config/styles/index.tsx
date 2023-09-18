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

  lightGray: '#FBFBFB',
  lightGray02: '#EEEEEE',
  deepGray: '#555555',

  gray: '#6F6F6F',
  gray02: '#CCCCCC',
  gray03: '#B4B4B4',
  gray04: '#999999',

  mint01: '#A2EEED',
  mint02: '#60EFDA',
  mint03: '#00ECD8',
  mint04: '#00E4D0',
  mint05: '#36C9BB',
};

type TypographyName =
  | 'logo'
  | 'headline01'
  | 'headline02'
  | 'header01'
  | 'body06'
  | 'caption01';

const typography: Record<TypographyName, TextStyle> = {
  logo: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: scaleFont(24),
    lineHeight: scaleFont(26),
    color: color.mint05,
  },
  headline01: {
    fontFamily: 'NotoSansKR',
    fontSize: scaleFont(32),
    lineHeight: scaleFont(36),
    color: color.black,
  },
  headline02: {
    fontFamily: 'NotoSansKR',
    fontSize: scaleFont(32),
    lineHeight: scaleFont(36),
    color: color.black,
  },
  header01: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: scaleFont(18),
    lineHeight: scaleFont(20),
    color: color.black,
  },
  body06: {
    fontFamily: 'NotoSansKR',
    fontSize: scaleFont(13),
    lineHeight: scaleFont(15),
    color: color.black,
  },
  caption01: {
    fontFamily: 'NotoSansKR',
    fontSize: scaleFont(10),
    lineHeight: scaleFont(12),
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
