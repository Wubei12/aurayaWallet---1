import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInUp,
  StretchInX,
  ZoomInLeft,
  ZoomInUp,
  ZoomOutLeft,
  withSpring,
} from 'react-native-reanimated';
import Svg, {RadialGradient, Stop, Circle} from 'react-native-svg';
import {SharedTransition} from 'react-native-reanimated';

const customTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.circleSize),
    width: withSpring(values.circleSize),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});
const BTCDetail = () => {
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  const SCREEN_WIDTH = Dimensions.get('screen').width;

  const circleSize = Math.sqrt(
    Math.pow(SCREEN_HEIGHT, 2) + Math.pow(SCREEN_WIDTH, 2),
  );
  // console.log('🚀 ~ file: Detail.js:13 ~ Detail ~ circleSize:', circleSize);

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <Animated.View
        entering={ZoomInLeft.delay(100)}
        exiting={ZoomOutLeft}
        sharedTransitionTag="btcTag"
        sharedTransitionStyle={customTransition}
        style={{
          position: 'absolute',
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize,
          backgroundColor: '#E84142',
        }}
      />

      {/* <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1000,
          borderRadius: SCREEN_HEIGHT,
          width: rectangleWidth,
          height: rectangleHeight,
          overflow: 'hidden',
          //   transform: [
          //     {
          //       scale: rippleScale,
          //     },
          //   ],
        }}>
        <Svg
          height={rectangleHeight}
          width={rectangleWidth}
          style={{
            position: 'absolute',
            zIndex: 100,
            borderRadius: SCREEN_HEIGHT,
          }}>
          <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <Stop offset="40%" stopColor="#E84142" stopOpacity="1" />
            <Stop offset="50%" stopColor="black" stopOpacity="0.5" />
          </RadialGradient>
          <Circle
            cx={centerX}
            cy={centerY}
            r={circleRadius}
            fill="url(#grad)"
            stroke="black"
            strokeWidth="5"
          />
        </Svg>
      </Animated.View> */}
    </View>
  );
};

export default BTCDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
