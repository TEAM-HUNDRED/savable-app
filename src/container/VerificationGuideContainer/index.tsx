import React, {useCallback, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CloseIcon} from '../../assets/icons';
import ChallengeGuideCard from '../../components/card/ChallengeGuideCard';
import VerificationGuideCard from '../../components/card/VerificationGuideCard';
import SVButton from '../../components/common/SVButton';
import SVText from '../../components/common/SVText';

import {AppStyles} from '../../config';
import {CHALLENGE_GUIDE_CONFIG} from '../../config/base';
import {ChallengeGuideViewType} from '../../types/view';

const maxHeightOfBottomSheet = AppStyles.scaleWidth(500);
const minHeightOfBottomSheet = AppStyles.scaleWidth(60);

type PropsType = {
  challengeGuideInfo: ChallengeGuideViewType[];
};

function VerificationGuideContainer({challengeGuideInfo}: PropsType) {
  const bottomSheetHeight = React.useRef(
    new Animated.Value(AppStyles.scaleWidth(60)),
  ).current;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const animateToOpenGuide = useCallback(() => {
    setIsOpen(true);
    Animated.timing(bottomSheetHeight, {
      toValue: maxHeightOfBottomSheet,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setIsOpen(true);
    });
  }, [bottomSheetHeight]);

  const animateToCloseGuide = useCallback(() => {
    setIsOpen(false);

    Animated.timing(bottomSheetHeight, {
      toValue: minHeightOfBottomSheet,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [bottomSheetHeight]);

  return (
    <Animated.View style={{...styles.container, height: bottomSheetHeight}}>
      {!isOpen ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.titleContainer}
          hitSlop={10}
          onPress={animateToOpenGuide}>
          <SVText body03 style={styles.titleText}>
            {'인증 방법 보러 가기'}
          </SVText>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.contentTitleContainer}>
            <View style={styles.iconContainer} />
            <SVText body03 style={styles.titleText}>
              {'인증 방법'}
            </SVText>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={animateToCloseGuide}
              hitSlop={10}
              style={styles.iconContainer}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View>
              <VerificationGuideCard
                titleShown={false}
                flatListData={challengeGuideInfo}
              />
            </View>
            <View style={styles.defaultHorizontal}>
              <ChallengeGuideCard {...CHALLENGE_GUIDE_CONFIG[1]} />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <SVButton
              borderRadius={AppStyles.scaleWidth(8)}
              onPress={animateToCloseGuide}>
              {'확인'}
            </SVButton>
          </View>
        </>
      )}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    width: AppStyles.width,
    backgroundColor: AppStyles.color.white,
    borderTopStartRadius: AppStyles.scaleWidth(20),
    borderTopEndRadius: AppStyles.scaleWidth(20),
  },
  titleContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    marginVertical: AppStyles.scaleWidth(18),
  },
  contentTitleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    top: AppStyles.scaleWidth(0),
    backgroundColor: AppStyles.color.white,
    borderTopStartRadius: AppStyles.scaleWidth(20),
    borderTopEndRadius: AppStyles.scaleWidth(20),
    paddingHorizontal: AppStyles.scaleWidth(24),
    zIndex: 2,
  },
  iconContainer: {
    width: AppStyles.scaleWidth(24),
    height: AppStyles.scaleWidth(24),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginVertical: AppStyles.scaleWidth(40),
    paddingBottom: AppStyles.scaleWidth(120),
  },
  defaultHorizontal: {
    marginHorizontal: AppStyles.scaleWidth(24),
  },
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: AppStyles.scaleWidth(50),
    paddingHorizontal: AppStyles.scaleWidth(24),
    bottom: AppStyles.scaleWidth(24),
  },
});

export default React.memo(VerificationGuideContainer);
