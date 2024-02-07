import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Animated, {ZoomIn} from 'react-native-reanimated';

const LoginForm = () => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
      }}>
      <Animated.View
        entering={ZoomIn.springify().delay(200)}
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'left',
            color: '#696969',
            fontSize: 16,
            fontFamily: 'SF-Pro-Text-Bold',
            width: '80%',
            marginBottom: 12,
            paddingHorizontal: 5,
          }}>
          Email
        </Text>
        <TextInput
          style={{
            backgroundColor: '#141414',
            width: '80%',
            height: 60,
            borderRadius: 12,
            borderWidth: 0.5,
            borderColor: '#696969',
            marginBottom: 30,
          }}
        />
      </Animated.View>
      <Animated.View
        entering={ZoomIn.springify().delay(300)}
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'left',
            color: '#696969',
            fontSize: 16,
            fontFamily: 'SF-Pro-Text-Bold',
            width: '80%',
            marginBottom: 12,
            paddingHorizontal: 5,
          }}>
          Password
        </Text>
        <TextInput
          style={{
            backgroundColor: '#141414',
            width: '80%',
            height: 60,
            borderRadius: 12,
            borderWidth: 0.5,
            borderColor: '#696969',
            marginBottom: 30,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default LoginForm;
