import {View, Text, Button, Pressable, ScrollView, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {MainLayout} from '.';
import {FAB} from '../components';
import {LinearGradient} from 'react-native-linear-gradient';
import {styles} from '../globalStyles';
import {icons} from '../../constants';
import {trnsxnData} from '../../constants/constants';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AnimatedScrollView from '../components/AnimatedScrollView';

const Transactions = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('3D');

  return (
    <MainLayout label={'Transactions'}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
            marginBottom: 14,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'SF-Pro-Text-Bold',
                color: 'white',
                fontSize: 16,
                lineHeight: 20,
                marginBottom: 4,
              }}>
              Last Transactions
            </Text>
            <View style={{flexDirection: 'row', gap: 4}}>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Text-Bold',
                  color: '#484848',
                  fontSize: 13,
                  lineHeight: 20,
                }}>
                Last Transaction:
              </Text>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Text-Bold',
                  color: '#fff',
                  fontSize: 13,
                  lineHeight: 20,
                }}>
                {'<'}1h
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Pressable
              onPress={() => {
                setSelectedDateRange('1D');
              }}>
              <Text
                style={{
                  color: selectedDateRange === '1D' ? '#fff' : '#454545',
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 12,
                  lineHeight: 20,
                }}>
                1D
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedDateRange('3D');
              }}>
              <Text
                style={{
                  color: selectedDateRange === '3D' ? '#fff' : '#454545',
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 12,
                  lineHeight: 20,
                }}>
                3D
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedDateRange('7D');
              }}>
              <Text
                style={{
                  color: selectedDateRange === '7D' ? '#fff' : '#454545',
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 12,
                  lineHeight: 20,
                }}>
                7D
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedDateRange('1M');
              }}>
              <Text
                style={{
                  color: selectedDateRange === '1M' ? '#fff' : '#454545',
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 12,
                  lineHeight: 20,
                }}>
                1M
              </Text>
            </Pressable>
          </View>
        </View>
        <AnimatedScrollView />
      </View>
      <FAB />
    </MainLayout>
  );
};

export default Transactions;
