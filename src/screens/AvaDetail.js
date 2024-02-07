import {View, Text, Pressable} from 'react-native';
import React from 'react';

const AvaDetail = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable
        style={{
          width: 200,
          height: 50,
          backgroundColor: '#696969',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
        }}>
        <Text style={{color: '#fff'}}>AvaDetail</Text>
      </Pressable>
    </View>
  );
};

export default AvaDetail;
