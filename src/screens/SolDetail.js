import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  SlideInUp,
  StretchInX,
  ZoomIn,
  ZoomInEasyUp,
  ZoomInLeft,
  ZoomInRight,
  ZoomInUp,
  ZoomOutLeft,
  withSpring,
} from 'react-native-reanimated';
import Svg, {RadialGradient, Stop, Circle} from 'react-native-svg';
import {SharedTransition} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import {icons} from '../../constants';

const customTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.circleSize),
    width: withSpring(values.circleSize),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

const letterAnimation = {
  0: {opacity: 0, translateY: -42},
  1: {opacity: 1, translateY: 0},
};

const SolDetail = () => {
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  const SCREEN_WIDTH = Dimensions.get('screen').width;

  const circleSize = Math.sqrt(
    Math.pow(SCREEN_HEIGHT, 2) + Math.pow(SCREEN_WIDTH, 2),
  );
  // console.log('🚀 ~ file: Detail.js:13 ~ Detail ~ circleSize:', circleSize);
  const title = 'Avalanche(AVAX)';
  const rate = '235,116.60';

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <Animated.View
        entering={ZoomInRight.delay(100).easing(Easing.circle)}
        exiting={ZoomOutLeft}
        sharedTransitionTag="solTag"
        sharedTransitionStyle={customTransition}
        style={{
          position: 'absolute',
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize,
          backgroundColor: '#E84142',
          borderWidth: 10,
          borderColor: 'rgba(0,0,0,0.7)',
        }}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <Image
            source={icons.up}
            style={{width: 23, height: 13.85, tintColor: '#00FFA3'}}
          />
          <Text
            style={{
              color: '#00FFA3',
              fontFamily: 'SF-Pro-Text-Bold',
              fontSize: 25,
            }}>
            3.54%
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            overflow: 'hidden',
            alignSelf: 'center',
          }}>
          {title.split('').map((letter, index) => {
            return (
              <Animatable.Text
                key={`${letter}-${index}`}
                useNativeDriver
                animation={letterAnimation}
                delay={200 + index * 50}
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontFamily: 'SF-Pro-Text-Bold',
                }}>
                {letter}
              </Animatable.Text>
            );
          })}
        </View>
        <View style={{flexDirection: 'row', overflow: 'hidden'}}>
          {rate.split('').map((letter, index) => {
            return (
              <Animatable.Text
                key={`${letter}-${index}`}
                useNativeDriver
                animation={letterAnimation}
                delay={200 + index * 50}
                style={{
                  fontSize: 54,
                  color: 'white',
                  fontFamily: 'SF-Pro-Text-Bold',
                }}>
                {letter}
              </Animatable.Text>
            );
          })}
        </View>
        <Animatable.Text
          useNativeDriver
          animation="fadeInRight"
          delay={200}
          style={{
            fontSize: 16,
            color: 'white',
            fontFamily: 'SF-Pro-Text-Bold',
            alignSelf: 'center',
          }}>
          ≈ 2,065.58
        </Animatable.Text>
        <Animatable.Text
          useNativeDriver
          animation="fadeInLeft"
          delay={200}
          style={{
            fontSize: 16,
            color: 'white',
            fontFamily: 'SF-Pro-Text-Bold',
            alignSelf: 'center',
          }}>
          Daily PNL +$335.56
        </Animatable.Text>
      </View>
    </View>
  );
};

export default SolDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
