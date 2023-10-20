import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import {AppStyles} from '../../../config';

import SVText from '../../common/SVText';

type PropsType = {
  durationList: string[];
  duration: string;
  target: string;
  estimatedSavings: number;
  handleDuration: (currentDuration: string) => void;
  handleSaveTarget: (currentDuration: string) => void;
};

function ChallengeApplyCard({
  durationList,
  duration,
  target,
  estimatedSavings,
  handleDuration,
  handleSaveTarget,
}: PropsType): React.ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <SVText body04>{'챌린지 진행 기간'}</SVText>
        <View style={styles.durationContainer}>
          {durationList.map((item, index) => {
            const isHighlighted = item === duration;

            return (
              <TouchableOpacity
                key={`${item}-${index}`}
                style={[
                  styles.durationButton,
                  isHighlighted
                    ? {backgroundColor: AppStyles.color.mint05}
                    : {backgroundColor: AppStyles.color.lightGray02},
                ]}
                onPress={() => {
                  handleDuration(item);
                }}
                activeOpacity={0.8}>
                <SVText
                  body07
                  color={
                    isHighlighted
                      ? AppStyles.color.white
                      : AppStyles.color.black
                  }>
                  {item}
                </SVText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.horizontalBar}>
        <SVText body04>{'목표 절약 횟수'}</SVText>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              handleSaveTarget(`${Number(target) - 1}`);
            }}
            activeOpacity={0.5}>
            <SVText body07>{'-'}</SVText>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            defaultValue={`${target}`}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              handleSaveTarget(`${Number(target) + 1}`);
            }}
            activeOpacity={0.8}>
            <SVText body07>{'+'}</SVText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.horizontalBar}>
        <SVText body04>{'1회 인증 시 절약 금액'}</SVText>
        <SVText body04>{`${estimatedSavings.toLocaleString()}원`}</SVText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingVertical: AppStyles.scaleWidth(36),
  },
  barContainer: {
    marginBottom: AppStyles.scaleWidth(40),
  },
  durationContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: AppStyles.scaleWidth(10),
  },
  durationButton: {
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: AppStyles.scaleWidth(10),
    paddingHorizontal: AppStyles.scaleWidth(16),
    paddingVertical: AppStyles.scaleWidth(6),
    borderRadius: AppStyles.scaleWidth(6),
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: AppStyles.scaleWidth(28),
    borderRadius: AppStyles.scaleWidth(4),
    borderWidth: AppStyles.scaleWidth(1),
    borderColor: AppStyles.color.gray02,
  },
  inputButton: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: AppStyles.scaleWidth(16),
  },
  input: {
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    maxHeight: AppStyles.scaleWidth(24),
    paddingVertical: AppStyles.scaleWidth(0),
  },
  horizontalBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppStyles.scaleWidth(40),
  },
});

export default React.memo(ChallengeApplyCard);
