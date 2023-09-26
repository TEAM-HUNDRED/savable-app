import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import {AppStyles} from '../../config';
import SVText from '../../components/common/SVText';

type InputPropsType = {
  amount: number;
  negativePoint: string;
  positivePoint: string;
  challengeOpinion: string;
};

type PropsType = {
  inputData: InputPropsType;
  handleInputData: (currentInputData: InputPropsType) => void;
};

function CreateOrderContainer({inputData, handleInputData}: PropsType) {
  const textInputList = [
    {
      index: '좋았던 점',
      value: inputData.positivePoint,
      onChangeText: (text: string) => {
        handleInputData({
          ...inputData,
          positivePoint: text,
        });
      },
    },
    {
      index: '아쉬운 점',
      value: inputData.negativePoint,
      onChangeText: (text: string) => {
        handleInputData({
          ...inputData,
          negativePoint: text,
        });
      },
    },
    {
      index: '추가 됐으면 하는 절약 챌린지를 알려주세요!',
      value: inputData.challengeOpinion,
      onChangeText: (text: string) => {
        handleInputData({
          ...inputData,
          challengeOpinion: text,
        });
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.horizontalBar}>
        <SVText body04>{'개수'}</SVText>
        <View style={styles.numberInputContainer}>
          <TouchableOpacity
            style={styles.numberInputButton}
            onPress={() => {
              handleInputData({...inputData, amount: inputData.amount - 1});
            }}
            activeOpacity={0.5}>
            <SVText body07>{'-'}</SVText>
          </TouchableOpacity>
          <TextInput
            style={styles.numberInput}
            defaultValue={`${inputData.amount}`}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={styles.numberInputButton}
            onPress={() => {
              handleInputData({...inputData, amount: inputData.amount + 1});
            }}
            activeOpacity={0.8}>
            <SVText body07>{'+'}</SVText>
          </TouchableOpacity>
        </View>
      </View>
      {textInputList.map((item, idx) => {
        return (
          <View
            style={styles.stringInputContainer}
            key={`${item.index} - ${idx}`}>
            <SVText body04>{item.index}</SVText>
            <View style={styles.stringInputBox}>
              <TextInput value={item.value} onChangeText={item.onChangeText} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  horizontalBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppStyles.scaleWidth(36),
  },
  numberInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: AppStyles.scaleWidth(28),
    borderRadius: AppStyles.scaleWidth(4),
    borderWidth: AppStyles.scaleWidth(1),
    borderColor: AppStyles.color.gray02,
  },
  numberInputButton: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: AppStyles.scaleWidth(16),
  },
  numberInput: {
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    maxHeight: AppStyles.scaleWidth(24),
    paddingVertical: AppStyles.scaleWidth(0),
  },
  stringInputContainer: {
    marginBottom: AppStyles.scaleWidth(36),
  },
  stringInputBox: {
    width: '100%',
    marginTop: AppStyles.scaleWidth(8),
    height: AppStyles.scaleWidth(38),
    borderColor: AppStyles.color.gray02,
    borderWidth: AppStyles.scaleWidth(1),
    borderRadius: AppStyles.scaleWidth(8),
    paddingHorizontal: AppStyles.scaleWidth(8),
  },
});

export default React.memo(CreateOrderContainer);
