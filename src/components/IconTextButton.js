import {StyleSheet, Text, Pressable, Image} from 'react-native';
import React from 'react';
import usePayStore from '../store/store';

const IconTextButton = ({
  label,
  icon,
  containerStyle,
  onPress,
  onLongPress,
  onPressOut,
  width,
  height,
  isPayin,
  textStyle,
  tintStyle,
}) => {
  const {highlightedSection} = usePayStore();
  if (isPayin) {
    return (
      <Pressable
        style={[styles.payIconTextButton, containerStyle]}
        onLongPress={onLongPress}
        onPress={onPress}
        onPressOut={onPressOut}>
        <Image
          source={icon}
          resizeMode="contain"
          style={[
            {
              width: width,
              height: height,
            },
          ]}
        />
      </Pressable>
    );
  } else {
    return (
      <Pressable
        style={[styles.iconTextButton, containerStyle]}
        onPress={onPress}>
        <Image
          source={icon}
          resizeMode="contain"
          style={[{width: width, height: height}, tintStyle]}
        />
        <Text
          style={[
            {
              fontSize: 10,
              opacity: 0.6,
              marginTop: 12,
              fontFamily: 'SF-Pro-Text-Bold',
            },
            textStyle,
          ]}>
          {label}
        </Text>
      </Pressable>
    );
  }
};

export default IconTextButton;

const styles = StyleSheet.create({
  iconTextButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0.5,
  },
  payIconTextButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
