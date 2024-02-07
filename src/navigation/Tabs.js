import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabIcon from '../components/TabIcon';
import {COLORS, icons} from '../../constants';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import {Recieve, Swap, Home, Transactions, Portfolio, Sell} from '../screens';
import usePayStore from '../store/store';
import {IconTextButton} from '../components';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();
const width = Dimensions.get('screen');

const TabIcon1 = ({focused}) => {
  return (
    <TabIcon
      focused={focused}
      icon={icons.portfolio}
      label="Portfolio"
      width={20}
      height={20}
    />
  );
};
const TabIcon2 = ({focused}) => {
  return (
    <TabIcon
      focused={focused}
      icon={icons.swap}
      label="Swap"
      width={22}
      height={22}
    />
  );
};

const TabisPaying = () => {
  const [open, toggle] = useState(s => !s, false);
  const progress = useDerivedValue(() => {
    return open ? withSpring(1) : withSpring(0);
  });
  const scalingStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 8]);
    return {
      transform: [{scale}],
    };
  });
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <Animated.View
        style={[
          {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedProps,
        ]}>
        <IconTextButton
          textStyle={{color: '#6F6F6F'}}
          width={24}
          height={24}
          icon={icons.pay}
          label={'Pay'}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconTextButton
          textStyle={{color: '#6F6F6F'}}
          width={24}
          height={24}
          icon={icons.send}
          label={'Send'}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconTextButton
          textStyle={{color: '#6F6F6F'}}
          width={24}
          height={24}
          icon={icons.funds}
          label={'Sell'}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconTextButton
          textStyle={{color: '#6F6F6F'}}
          width={24}
          height={24}
          icon={icons.swap}
          label={'Swap'}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconTextButton
          textStyle={{color: '#6F6F6F'}}
          width={24}
          height={24}
          icon={icons.recieve}
          label={'Receive'}
        />
      </Animated.View> */}
      {/* <Animated.View
        style={{
          width: 224,
          height: 224,
          borderRadius: 200,
          backgroundColor: '#000',
          position: 'absolute',
        }}>
        <LinearGradient
          colors={['rgba(217, 217, 217, 0.19)', 'rgba(217, 217, 217, 0.07)']}
          style={[
            {
              width: '100%',
              height: '100%',
              borderRadius: 200,
              zIndex: -1,
              backgroundColor: 'rgba(217, 217, 217, 0.07)',
            },
            scalingStyles,
          ]}
        />
      </Animated.View> */}
      {/* <Pressable
        onPress={() => {
          console.log('hello');
        }}>
        <Text
          style={{
            color: '#fff',
            position: 'absolute',
            zIndex: 1,
            fontSize: 24,
            bottom: 50,
          }}>
          Hello
        </Text>
      </Pressable> */}
      {/* <IconTextButton
        icon={icons.aurayaLogo}
        label
        onLongPress={() => {
          console.log('hello');
        }}
        width={48}
        height={27}
        containerStyle={{
          backgroundColor: '#D9D9D9',
          alignItems: 'center',
          justifyContent: 'center',
          height: 85,
          width: 85,
          borderRadius: 200,
          position: 'absolute',
          // zIndex: 20,
        }}
        isPayin={true}
      /> */}

      <Pressable
        style={{
          backgroundColor: '#D9D9D9',
          alignItems: 'center',
          justifyContent: 'center',
          height: 85,
          width: 85,
          borderRadius: 200,
          position: 'absolute',
        }}
        onPress={toggle}>
        <Image width={48} height={27} source={icons.aurayaLogo} />
      </Pressable>
    </View>
  );
};
const TabIcon4 = ({focused}) => {
  return (
    <TabIcon
      focused={focused}
      icon={icons.trnsxns}
      label="Transactions"
      width={22}
      height={19}
    />
  );
};
const TabIcon5 = ({focused}) => {
  return (
    <TabIcon
      focused={focused}
      icon={icons.trnsxns}
      label="Transactions"
      width={24}
      height={23}
    />
  );
};

function MyTabs() {
  const {isPaying, isCryptoWindow} = usePayStore();

  return (
    <Tab.Navigator
      initialRouteName="Pay"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 134,
          backgroundColor: 'black',
          borderTopColor: 'transparent',
          justifyContent: 'space-between',
          display: isCryptoWindow ? 'none' : 'flex',
          zIndex: -1,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: TabIcon1,
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name="Pay"
        component={Home}
        options={{
          tabBarIcon: TabisPaying,
          unmountOnBlur: true,
          tabBarIconStyle: {width: 100, borderWidth: 2, borderColor: '#FFF'},
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: TabIcon5,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
