import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HomeIcon} from '../../../assets/icons';

function LoginScreen(): React.ReactElement {
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

export default React.memo(LoginScreen);
