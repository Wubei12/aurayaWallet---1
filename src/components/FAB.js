import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  Text,
  PanResponder,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {IconTextButton} from '../components';
import {icons} from '../../constants';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  useDerivedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  startMapper,
  runOnJS,
} from 'react-native-reanimated';
import {useNavigation, useRoute} from '@react-navigation/native';
import {LinearGradient} from 'react-native-linear-gradient';
import {Toast} from 'react-native-toast-notifications';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import usePayStore from '../store/store';
import {scale} from '@shopify/react-native-skia';

const ActionBtn = ({
  icon,
  width,
  iconStyle,
  height,
  style,
  onPress,
  label,
  textStyle,
}) => {
  return (
    <Animated.View style={[styles.actionBtn, style]}>
      <Pressable onPress={onPress}>
        <Image
          source={icon}
          resizeMode="contain"
          style={[
            {
              width: width,
              height: height,
              marginBottom: 3,
            },
            iconStyle,
          ]}
        />
        <Text
          style={[
            {
              fontSize: 8,
              fontFamily: 'SF-Pro-Text-Bold',
            },
            textStyle,
          ]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const FAB = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [open, toggle] = useReducer(s => !s, false);
  const rotation = useSharedValue(0);

  const [allowPan, setAllowPan] = useState(false);
  const [higlighted, setHiglighted] = useState('left');

  const progress = useDerivedValue(() => {
    return open ? withSpring(1) : withSpring(0);
  });
  const scalingStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 1]);
    return {
      transform: [{scale}],
    };
  });

  useEffect(() => {
    if (open) {
      setAllowPan(true);
    } else {
      setAllowPan(false);
    }
  }, [setAllowPan, open]);

  const gapStyles = useAnimatedStyle(() => {
    const gap = interpolate(progress.value, [0, 1], [30, 85]);
    return {
      gap: gap,
    };
  });

  const TranslationStyles = (x, y, valueX, valueY) =>
    useAnimatedStyle(() => {
      const translate = interpolate(progress.value, [0, 1], [0, valueX], {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      });
      const translateY = interpolate(progress.value, [0, 1], [0, valueY], {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      });
      if (x && y) {
        return {
          transform: [{translateX: translate}, {translateY: translateY}],
        };
      } else if (x) {
        return {
          transform: [{translateX: translate}],
        };
      } else {
        return {
          transform: [{translateY: translateY}],
        };
      }
    });

  const {setHighlightedSection} = usePayStore();

  const pan = Gesture.Pan()
    .enabled(allowPan)
    .onUpdate(e => {
      const moveY = e.y;
      const moveX = e.x;

      const angle = Math.atan2(224 - moveY, 224 - moveX) * (180 / Math.PI);

      function isBetween(number, lowerBound, upperBound) {
        return number >= lowerBound && number <= upperBound;
      }

      if (isBetween(angle, 0, 12)) {
        rotation.value = 0;
        runOnJS(setHiglighted)('left');
      } else if (isBetween(angle, 12.01, 24)) {
        rotation.value = 0.89;
        runOnJS(setHiglighted)('top left');
      } else if (isBetween(angle, 24.01, 35)) {
        rotation.value = 1.75;
        runOnJS(setHiglighted)('top');
      } else if (isBetween(angle, 35.01, 40)) {
        rotation.value = 2.56;
        runOnJS(setHiglighted)('top right');
      } else if (isBetween(angle, 40.01, 60)) {
        rotation.value = 3.4;
        runOnJS(setHiglighted)('right');
      }
    })
    .onEnd(() => {
      if (rotation.value == 0) {
        runOnJS(navigation.navigate)('Sell');
      } else if (rotation.value == 0.89) {
        runOnJS(navigation.navigate)('Send');
      } else if (rotation.value == 1.75) {
        runOnJS(navigation.navigate)('Pay');
      } else if (rotation.value == 2.56) {
        runOnJS(navigation.navigate)('Swap');
      } else if (rotation.value == 3.4) {
        runOnJS(navigation.navigate)('Receive');
      }

      runOnJS(setHiglighted)('left');
      rotation.value = 0;
    });

  const rotatedAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: withTiming(`${(rotation.value / Math.PI) * 180}deg`),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.FABContainer, gapStyles]}>
      <IconTextButton
        label={'Portfolio'}
        icon={icons.portfolio}
        width={25}
        height={25}
        textStyle={{
          color: route.name === 'Portfolio' ? '#ffffff' : '#6F6F6F',
        }}
        onPress={() => {
          navigation.navigate('Portfolio');
        }}
        tintStyle={{
          tintColor: route.name === 'Portfolio' ? '#ffffff' : '#6F6F6F',
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
        }}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={
              allowPan
                ? [styles.circleStyle, scalingStyles, rotatedAnimStyle]
                : [styles.circleStyle, scalingStyles]
            }>
            <Animated.View style={[styles.indicator]} entering={FadeIn}>
              <View
                style={{
                  height: 19.8,
                  width: 55,
                  backgroundColor: '#D9D9D9',
                  borderWidth: 2,
                  borderColor: '#D9D9D9',
                  position: 'absolute',
                  top: 89.38179397499,
                  left: -28,
                }}
              />
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderBottomLeftRadius: 30,
                  backgroundColor: '#D9D9D9',
                  position: 'absolute',
                  top: 89.5,
                  right: 24.6,
                }}
              />
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderBottomRightRadius: 30,
                  backgroundColor: '#D9D9D9',
                  position: 'absolute',
                  top: 89.6,
                  left: 24.637,
                }}
              />
            </Animated.View>
            <LinearGradient
              colors={[
                'rgba(217, 217, 217, 0.19)',
                'rgba(217, 217, 217, 0.07)',
              ]}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 200,
                zIndex: -1,
                backgroundColor: 'rgba(217, 217, 217, 0.07)',
              }}
            />
          </Animated.View>
        </GestureDetector>
        <IconTextButton
          isPayin={true}
          icon={icons.aurayaLogo}
          width={46}
          height={27}
          containerStyle={styles.isPayinStyle}
          onLongPress={toggle}
          onPress={() => navigation.navigate('Home')}
        />
        <ActionBtn
          style={TranslationStyles(true, true, -80, 10)}
          icon={icons.funds}
          iconStyle={{
            tintColor:
              higlighted === 'left' ? '#000' : 'rgba(111, 111, 111, 1)',
          }}
          width={24}
          height={24}
          label={'Sell'}
          textStyle={{
            color: higlighted === 'left' ? '#000' : 'rgba(255, 255, 255, 0.64)',
          }}
          onPress={() => navigation.navigate('Sell')}
        />
        <ActionBtn
          style={TranslationStyles(true, true, -65, -55)}
          icon={icons.send}
          iconStyle={{
            tintColor:
              higlighted === 'top left' ? '#000' : 'rgba(111, 111, 111, 1)',
          }}
          width={24}
          height={24}
          label={'Send'}
          textStyle={{
            color:
              higlighted === 'top left' ? '#000' : 'rgba(255, 255, 255, 0.64)',
          }}
          onPress={() => navigation.navigate('Send')}
        />
        <ActionBtn
          style={TranslationStyles(false, true, 0, -75)}
          icon={icons.pay}
          iconStyle={{
            tintColor: higlighted === 'top' ? '#000' : 'rgba(111, 111, 111, 1)',
          }}
          width={24}
          height={24}
          label={'Pay'}
          textStyle={{
            color: higlighted === 'top' ? '#000' : 'rgba(255, 255, 255, 0.64)',
          }}
          onPress={() => navigation.navigate('Pay')}
        />
        <ActionBtn
          style={TranslationStyles(true, true, 65, -55)}
          icon={icons.swap}
          iconStyle={{
            tintColor:
              higlighted === 'top right' ? '#000' : 'rgba(111, 111, 111, 1)',
          }}
          width={24}
          height={24}
          label={'Swap'}
          textStyle={{
            color:
              higlighted === 'top right' ? '#000' : 'rgba(255, 255, 255, 0.64)',
          }}
          onPress={() => navigation.navigate('Swap')}
        />
        <ActionBtn
          style={TranslationStyles(true, true, 80, 10)}
          icon={icons.recieve}
          iconStyle={{
            tintColor:
              higlighted === 'right' ? '#000' : 'rgba(111, 111, 111, 1)',
          }}
          width={24}
          height={24}
          label={'Receive'}
          textStyle={{
            color:
              higlighted === 'right' ? '#000' : 'rgba(255, 255, 255, 0.64)',
          }}
          onPress={() => navigation.navigate('Receive')}
        />
      </View>
      <IconTextButton
        label={'Transactions'}
        icon={icons.trnsxns}
        width={25}
        height={25}
        textStyle={{
          color: route.name === 'Transactions' ? '#ffffff' : '#6F6F6F',
        }}
        onPress={() => navigation.navigate('Transactions')}
        tintStyle={{
          tintColor: route.name === 'Transactions' ? '#ffffff' : '#6F6F6F',
        }}
      />
    </Animated.View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  FABContainer: {
    height: 134,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 85,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  isPayinStyle: {
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    width: 85,
    borderRadius: 43,
    elevation: 10,
    zIndex: 2,
  },
  circleStyle: {
    position: 'absolute',
    width: 224,
    height: 224,
    borderRadius: 112,
    zIndex: 1,
  },
  actionBtn: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  indicator: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 45,
    borderRightWidth: 45,
    borderBottomWidth: 90,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    right: 115,
    top: 77,
    borderBottomColor: '#D9D9D9',
    transform: [{rotate: '80deg'}],
    position: 'absolute',
    zIndex: 0.5,
  },
});
