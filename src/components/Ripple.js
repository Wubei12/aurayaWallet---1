// import {
//   Animated,
//   Dimensions,
//   Easing,
//   PanResponder,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useRef} from 'react';
// import {GestureDetector, Gesture} from 'react-native-gesture-handler';
// import {runOnJS} from 'react-native-reanimated';
// import Svg, {RadialGradient, Stop, Circle} from 'react-native-svg';
// import usePayStore from '../store/store';

// const SCREEN_HEIGHT = Dimensions.get('screen').height;
// const SCREEN_WIDTH = Dimensions.get('screen').width;

// const Ripple = ({style, onTap, children}) => {
//   const {isCryptoWindow, setCryptoWindow} = usePayStore();
//   console.log('🚀 Ripple ~ isCryptoWindow:', isCryptoWindow);
//   const rippleScale = useRef(new Animated.Value(0)).current;

//   const animateRipple = () => {
//     setCryptoWindow(true);
//     Animated.timing(rippleScale, {
//       toValue: 1,
//       duration: 1000,
//       easing: Easing.linear,
//       useNativeDriver: false,
//     }).start();
//   };

//   const resetRipple = () => {
//     setTimeout(() => {
//       setCryptoWindow(false);
//     }, 2000);

//     Animated.timing(rippleScale, {
//       toValue: 0,
//       duration: 1000,
//       easing: Easing.linear,
//       useNativeDriver: false,
//     }).start();
//   };

//   const rippleTransform = [{scale: rippleScale}];

//   return (
//     <Pressable onPress={animateRipple} style={style}>
//       <View>{children}</View>
//       <Animated.View
//         style={[
//           {
//             width: SCREEN_HEIGHT * 2,
//             height: SCREEN_HEIGHT * 2,
//             position: 'absolute',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000,
//             borderRadius: SCREEN_HEIGHT,
//             transform: [
//               {
//                 scale: rippleScale,
//               },
//             ],
//           },
//         ]}>
// <Svg height="100%" width="100%" style={{zIndex: 10}}>
//   <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
//     <Stop offset="80%" stopColor="#E84142" stopOpacity="1" />
//     <Stop offset="99%" stopColor="black" stopOpacity="0.2" />
//   </RadialGradient>
//   <Circle
//     cx="50%"
//     cy="50%"
//     r="50%"
//     fill="url(#grad)"
//     stroke="black"
//     strokeWidth="5"
//   />
// </Svg>
//       </Animated.View>
//     </Pressable>
//   );
// };

// export default Ripple;

// const styles = StyleSheet.create({
//   radialGradient: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 1000,
//   },
//   textBtn: {
//     width: 200,
//     height: 100,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00FFA3',
//   },
//   btnText: {
//     fontFamily: 'SF-Pro-Text-Bold',
//     fontSize: 24,
//     textAlign: 'center',
//   },
// });
