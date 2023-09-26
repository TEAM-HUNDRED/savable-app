import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {AppStyles} from '../../../config';
import SVText from '../../common/SVText';

type PropsType = {
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  price: number;
};

function ShopCategoryCard({setPrice, price}: PropsType) {
  const categoryList = [
    {title: '전체', minValue: 0},
    {title: '1천원대', minValue: 1000},
    {title: '2천원대', minValue: 2000},
    {title: '3천원대', minValue: 3000},
    {title: '4천원대', minValue: 4000},
    {title: '5천원대', minValue: 5000},
  ];

  const handlePrice = useCallback(
    (currentPrice: number) => {
      setPrice(currentPrice);
    },
    [setPrice],
  );

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {categoryList.slice(0, 3).map((item, idx) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              key={`${item.title}-${idx}`}
              onPress={() => {
                handlePrice(item.minValue);
              }}>
              <SVText
                body04
                style={
                  !(item.minValue === price)
                    ? styles.categoryText
                    : styles.highlightCategoryText
                }>
                {item.title}
              </SVText>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.barContainer}>
        {categoryList.slice(3).map((item, idx) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              key={`${item.title}-${idx}`}
              onPress={() => {
                handlePrice(item.minValue);
              }}>
              <SVText
                body04
                style={
                  !(item.minValue === price)
                    ? styles.categoryText
                    : styles.highlightCategoryText
                }>
                {item.title}
              </SVText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: AppStyles.scaleWidth(16),
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: AppStyles.scaleWidth(8),
  },
  categoryText: {
    color: AppStyles.color.gray03,
    fontWeight: 'bold',
  },
  highlightCategoryText: {
    fontWeight: 'bold',
  },
});

export default React.memo(ShopCategoryCard);
