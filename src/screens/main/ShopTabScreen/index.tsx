import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function ShopTabScreen(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text>1</Text>
      {/* <HomeIcon /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ShopTabScreen);
