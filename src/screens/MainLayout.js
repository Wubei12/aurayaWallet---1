import {View, StyleSheet, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {IconBtn, NotifComp, ProfileComp} from '../components';
import {icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import {LinearGradient} from 'react-native-linear-gradient';
import usePayStore from '../store/store';
import Icon from 'react-native-vector-icons/FontAwesome';

const vidSrc = require('../../assets/video/bgVid.mp4');

export const VidComp = () => {
  return (
    <>
      <Video
        source={vidSrc}
        style={inCompStyles.video}
        resizeMode="cover"
        repeat
        muted
        rate={1.0}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)']}
        start={{x: 0, y: 0.75}}
        end={{x: 0, y: 0.75}}
        style={inCompStyles.bgOverlay}
      />
    </>
  );
};

const MainLayout = ({children, label}) => {
  const {isCryptoWindow, setCryptoWindow} = usePayStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={inCompStyles.MainContainer}>
      <VidComp />
      <View
        style={{
          position: 'absolute',
          zIndex: isCryptoWindow ? 0 : 2,
          width: '100%',
          height: 87,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 20,
          top: 0,
        }}>
        <Pressable
          android_ripple={{color: '#696969', radius: 18}}
          style={{
            width: 33,
            height: 33,
            borderRadius: 33,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsProfileModalOpen(true)}>
          <Icon name="user-circle" size={33} color="#d9d9d9" />
        </Pressable>
        <Text
          style={{
            fontFamily: 'SF-Pro-Text-Bold',
            color: 'white',
            fontSize: 16,
          }}>
          {label}
        </Text>
        <View style={{position: 'relative'}}>
          <Pressable
            android_ripple={{color: '#696969', radius: 18}}
            style={{
              width: 33,
              height: 33,
              borderRadius: 33,
              backgroundColor: '#d9d9d9',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setIsNotifModalOpen(true)}>
            <Icon name="bell" size={15} color="#000" />
          </Pressable>
          <View
            style={{
              width: 23,
              height: 23,
              top: 0,
              position: 'absolute',
              backgroundColor: '#FF6C6C',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 11.5,
              right: 27,
              elevation: 10,
            }}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Text-Bold',
                color: 'white',
                fontSize: 16,
              }}>
              4
            </Text>
          </View>
        </View>
      </View>
      <ProfileComp
        isProfileModalOpen={isProfileModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />
      <NotifComp
        isNotifModalOpen={isNotifModalOpen}
        setIsNotifModalOpen={setIsNotifModalOpen}
      />
      {children}
    </View>
  );
};

const inCompStyles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  video: {
    position: 'absolute',
    top: 0,
    bottom: 134,
    left: 0,
    right: 0,
  },
  bgOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 134,
    zIndex: 0.2,
  },
});
export default MainLayout;
