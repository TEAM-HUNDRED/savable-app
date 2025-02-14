import React, {useCallback} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {track} from '@amplitude/analytics-react-native';

import {AppStyles, ROUTER, MainScreenStackPropsList} from '../../../config';
import {ChallengeViewType} from '../../../types/view/challenge';
import SVText from '../../common/SVText';
import {RootState} from '../../../modules/redux/RootReducer';

type PropsType = ChallengeViewType & {};

function ChallengeCard({
  id,
  image,
  title,
  hasDeadline,
}: PropsType): React.ReactElement {
  const userInfo = useSelector((state: RootState) => state.userInfo.value);
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const navigateToExplain = useCallback(() => {
    navigation.navigate(ROUTER.CHALLENGE_EXPLAIN_SCREEN, {
      challengeId: id,
      challengeTitle: title,
    });

    track('CLICK_CHALLENGE_CARD', {
      userName: userInfo.userName,
      phoneNumber: userInfo.userPhoneNumber,
    });
  }, [id, title, navigation, userInfo]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToExplain}
      activeOpacity={0.8}>
      <Image source={{uri: image}} style={styles.image} />
      <SVText body06 style={styles.titleText}>
        {title}
      </SVText>
      <View style={styles.category}>
        <SVText caption01>{hasDeadline ? '' : '상시 모집'}</SVText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: AppStyles.scaleWidth(160),
  },
  image: {
    width: '100%',
    height: AppStyles.scaleWidth(104),
    borderRadius: AppStyles.scaleWidth(10),
  },
  titleText: {
    marginVertical: AppStyles.scaleWidth(4),
  },
  category: {
    backgroundColor: AppStyles.color.lightGray02,
    borderRadius: AppStyles.scaleWidth(4),
    paddingHorizontal: AppStyles.scaleWidth(6),
    marginRight: AppStyles.scaleWidth(6),
    alignSelf: 'flex-start',
  },
});

export default React.memo(ChallengeCard);
