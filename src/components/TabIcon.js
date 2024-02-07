/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from '../globalStyles';
import usePayStore from '../store/store';

const TabIcon = ({
  focused,
  icon,
  width,
  height,
  iconStyle,
  label,
  isPay,
  isPayMode,
}) => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const {isPaying, setPaying} = usePayStore();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const scaleInterpolate = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.2, 1],
  });

  const handleLongPress = () => {
    setPaying(!isPaying);
    const toValue = isLongPressed ? 0 : 1;
    Animated.timing(scaleValue, {
      toValue: toValue,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsLongPressed(!isLongPressed);
    });
  };

  const animStyle = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };

  const handleLongPressOut = () => {
    setPaying(!isPaying);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsLongPressed(!isLongPressed);
    });
  };

  if (isPay) {
    return (
      <Animated.View
        style={[
          styles.aurayaBottombarIconOption,
          {
            height: 85,
            width: 83.71,
            right: 8,
            borderRadius: 42.5,
            backgroundColor: '#D9D9D9',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: '#D9D9D9',
          },
          animStyle,
        ]}>
        <Pressable
          onPressIn={() => handleLongPress()}
          onPressOut={() => handleLongPressOut()}
          // onPress={handlePress}
          style={{position: 'absolute', zIndex: 100}}>
          <Animated.Image
            source={icon}
            resizeMode="contain"
            style={[
              {
                width: 46,
                height: 27,
                tintColor: focused ? 'black' : '#282828',
                opacity: 0.91,
                ...iconStyle,
              },
              animStyle,
            ]}
          />
        </Pressable>
      </Animated.View>
    );
  } else {
    return (
      <View style={styles.aurayaBottombarIconOption}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: width,
            height: height,
            tintColor: focused ? 'white' : '#6F6F6F',
            ...iconStyle,
          }}
        />
        <Text
          style={[
            styles.aurayaBottombarOption,
            {color: focused ? 'white' : '#6f6f6f'},
          ]}>
          {label}
        </Text>
      </View>
    );
  }
};

export default TabIcon;
