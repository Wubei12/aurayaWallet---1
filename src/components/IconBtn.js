import {
  View,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';
// import {Ripple} from '.';
import usePayStore from '../store/store';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  SlideOutUp,
  ZoomIn,
  ZoomInRight,
  ZoomOut,
  ZoomOutLeft,
  withSpring,
} from 'react-native-reanimated';
import {SharedTransition} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import Svg, {RadialGradient, Stop, Circle} from 'react-native-svg';
import {icons} from '../../constants';

const letterAnimation = {
  0: {opacity: 0, translateY: -42},
  1: {opacity: 1, translateY: 0},
};

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const IconBtn = ({
  icon,
  onPress,
  width,
  height,
  withRipple,
  id,
  tag,
  style,
}) => {
  const navigation = useNavigation();

  const {isCryptoWindow, setCryptoWindow, selectedButton} = usePayStore();
  const [modalVisible, setModalVisible] = useState(false);


  const customTransition = SharedTransition.custom(values => {
    'worklet';
    return {
      height: withSpring(values.targetHeight),
      width: withSpring(values.targetWidth),
      originX: withSpring(values.targetOriginX),
      originY: withSpring(values.targetOriginY),
    };
  });

  const circleSize = Math.sqrt(
    Math.pow(SCREEN_HEIGHT, 2) + Math.pow(SCREEN_WIDTH, 2),
  );

  const title = 'Avalanche(AVAX)';
  const rate = '235,116.60';

  const handleAnimatePress = () => {
    setModalVisible(true);
  };

  if (withRipple === true) {
    return (
      <Animated.View entering={FadeInDown.delay(50 * id)} exiting={SlideOutUp}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.centeredView}>
            <Animated.View
              entering={ZoomIn.delay(100)}
              exiting={ZoomOut}
              style={styles.modalView}>
              <View style={[styles.contnr, StyleSheet.absoluteFillObject]}>
                <Animated.View
                  entering={ZoomInRight.easing(Easing.circle)}
                  exiting={ZoomOutLeft}
                  sharedTransitionTag="btcTag"
                  sharedTransitionStyle={customTransition}
                  style={{
                    position: 'absolute',
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize,
                    backgroundColor: '#E84142',
                  }}>
                  <Svg height="100%" width="100%" style={{zIndex: 10}}>
                    <RadialGradient
                      id="grad"
                      cx="50%"
                      cy="50%"
                      r="50%"
                      fx="50%"
                      fy="50%">
                      <Stop offset="20%" stopColor="#E84142" stopOpacity="1" />
                      <Stop
                        offset="10%"
                        stopColor="#E84142"
                        stopOpacity="0.2"
                      />
                      <Stop offset="30%" stopColor="black" stopOpacity="0.27" />
                    </RadialGradient>
                    <Circle
                      cx="50%"
                      cy="50%"
                      r="50%"
                      fill="url(#grad)"
                      stroke="black"
                      strokeWidth="5"
                    />
                  </Svg>
                </Animated.View>
                <View>
                  <Animated.View
                    entering={FadeInDown.delay(400)}
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
                  </Animated.View>
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
            </Animated.View>
          </Animated.View>
        </Modal>
        <Pressable
          onPress={handleAnimatePress}
          style={[
            styles.container,
            {
              display:
                selectedButton !== null && selectedButton !== id
                  ? 'none'
                  : 'flex',
            },
          ]}>
          <Animated.Image
            source={icon}
            resizeMode="contain"
            style={{width: width, height: height}}
            sharedTransitionTag={tag}
            sharedTransitionStyle={customTransition}
          />
        </Pressable>
      </Animated.View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <Image
            source={icon}
            resizeMode="contain"
            style={[{width: width, height: height}, style]}
          />
        </Pressable>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    width: 350,
    height: 350,
    backgroundColor: '#E84142',
    borderRadius: 350,
    overflow: 'hidden',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: -20,
      height: -20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 55,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  contnr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E84142',
  },
});

export default IconBtn;
