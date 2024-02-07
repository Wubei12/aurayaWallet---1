import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const NFCReader = () => {
  return (
    <View>
      <Text style={styles.NFCReaderContainer}>NFCReader</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  NFCReaderContainer: {
    color: 'white',
  },
});
export default NFCReader;
