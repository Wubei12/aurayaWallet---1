import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-notifications';
import {IconTextButton, CircularSector} from '.';
import {icons} from '../../constants';
import {LinearGradient} from 'react-native-linear-gradient';
import usePayStore from '../store/store';

const CircularMenuTab = () => {
  const {isPaying, setPaying, highlightedSection, setHighlightedSection} =
    usePayStore();

  const navigation = useNavigation();
  const rotation = useRef(new Animated.Value(150)).current;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPaying) {
      animateCircle();
    } else {
      resetAnimation();
    }
  });

  const animateCircle = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const resetAnimation = () => {
    setTimeout(() => {
      setPaying(false);
    }, 1000);

    Animated.spring(animation, {
      toValue: 0,
      friction: 14,
      tension: 30,
      duration: 300,
      easing: Easing.out,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const {moveX, moveY} = gestureState;

        const angle = Math.atan2(moveY - 150, moveX - 150) * (180 / Math.PI);

        rotation.setValue(-((angle * 180) / Math.PI));

        let section;
        if (angle > 70 && angle < 80) {
          section = 'right';
          const jumpToRotation = 320;
          rotation.setValue(jumpToRotation);
        } else if (angle > 70 && angle < 90) {
          section = 'top';
          const jumpToRotation1 = 225;
          rotation.setValue(jumpToRotation1);
        } else if (angle > 90 && angle < 103) {
          section = 'left';
          const jumpToRotation2 = 135;
          rotation.setValue(jumpToRotation2);
        } else {
          section = 'left';
          rotation.setValue(135);

          Toast.show('Please pick an option.', {
            type: 'custom',
            placement: 'top',
            duration: 4000,
            animationType: 'slide-in',
          });
        }

        setHighlightedSection(section);

        Animated.spring(rotation, {
          toValue: rotation,
          useNativeDriver: true,
        }).start();
        animateCircle();
      },
      onPanResponderRelease: () => {
        Animated.spring(rotation, {
          toValue: 135,
          useNativeDriver: true,
        }).start();
        resetAnimation();
        setHighlightedSection('left');
      },
    }),
  ).current;
  const getHighlightTextStyle = section => {
    return {
      color: section === highlightedSection ? 'black' : '#d9d9d9',
    };
  };
  const getHighlightTintStyle = section => {
    return {
      tintColor: section === highlightedSection ? 'black' : '#d9d9d9',
    };
  };

  const indicatorStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [135, 320],
          outputRange: ['135deg', '320deg'],
        }),
      },
    ],
  };

  const circleScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        inCompStyles.MainContainer,
        {
          transform: [{scale: circleScale}],
        },
      ]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.06)', 'rgba(0,0,0,0.8)']}
        style={inCompStyles.swipeOptions}
        {...panResponder.panHandlers}>
        <Animated.View style={[inCompStyles.indicator, indicatorStyle]}>
          <Image width={115} height={115} source={icons.btnindicator} />
        </Animated.View>
     
      </LinearGradient>
    </Animated.View>
  );
};

const inCompStyles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 185,
  },
  swipeOptions: {
    position: 'absolute',
    zIndex: 200,
    flex: 1,
    width: 224,
    borderTopLeftRadius: 175,
    borderTopRightRadius: 175,
    borderBottomRightRadius: 170,
    borderBottomLeftRadius: 170,
    height: 224,
    backgroundColor: 'rgba(70,70,70,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  indicator: {
    width: 0,
    height: 0,
    position: 'absolute',
    zIndex: 0.01,
    justifyContent: 'center',
  },
  aurayaLogo: {
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    width: 85,
    borderRadius: 200,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 24},
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 30,
  },
  iconsRow: {flexDirection: 'row', marginBottom: 110, gap: 20},
});

export default CircularMenuTab;
