import { Image, Modal, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../globalStyles";
import { IconBtn } from ".";
import { icons } from "../../constants";
import Animated, {
  SlideInUp,
  FadeOut,
  SlideInRight,
  BounceOutUp,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { IconTextButton } from ".";

const NotifComp = ({ isNotifModalOpen, setIsNotifModalOpen }) => {
  const [settingPageActivated, setSettingPageActivated] = useState(false);

  const navigatorWallet = async () => {};
  const navigatorBuyCrypto = async () => {};

  const handleManage = async () => {
    await navigatorBuyCrypto();
  };

  return (
    <>
      {isNotifModalOpen ? (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isNotifModalOpen}
          onRequestClose={() => setIsNotifModalOpen(!isNotifModalOpen)}
        >
          <Pressable
            style={{
              width: "100%",
              height: 134,
              position: "absolute",
              bottom: 0,
            }}
            onPress={() => {
              setIsNotifModalOpen(false);
            }}
          ></Pressable>
          <Animated.View
            entering={SlideInUp.duration(400)}
            exiting={BounceOutUp}
            style={styles.ProfileCompContainer}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 20,
                position: "absolute",
                top: 0,
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontFamily: "SF-Pro-Text-Bold",
                  fontSize: 20,
                  lineHeight: 20,
                }}
              >
                Notifications
              </Text>
              <IconBtn
                icon={icons.close}
                width={24}
                height={24}
                onPress={() => setIsNotifModalOpen(false)}
                style={{ transform: [{ scale: 0.7 }] }}
              />
            </View>
            {/* <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 20,
                position: 'absolute',
                top: 0,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 20,
                  lineHeight: 20,
                }}>
                My Profile
              </Text>
              <IconBtn
                icon={icons.close}
                width={24}
                height={24}
                onPress={() => setIsNotifModalOpen(false)}
                style={{transform: [{scale: 0.7}]}}
              />
            </View>
            <Image source={icons.bigProf} />
            <Text style={styles.ProfText}>Gal Grad </Text>
            <Text
              style={{
                color: '#282828',
                fontSize: 14,
                lineHeight: 18,
                fontFamily: 'SF-Pro-Text-Regular',
                textAlign: 'center',
                width: 272,
                height: 73,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text
              style={{
                color: '#282828',
                fontSize: 14,
                lineHeight: 18,
                fontFamily: 'SF-Pro-Text-Bold',
                textAlign: 'center',
                width: 272,
              }}>
              Name of street 21
            </Text>
            <Text
              style={{
                color: '#6F6F6F',
                fontSize: 10,
                lineHeight: 13.5,
                fontFamily: 'SF-Pro-Text-Regular',
                textAlign: 'center',
                width: 272,
                marginBottom: 9,
              }}>
              Address
            </Text>
            <Text
              style={{
                color: '#282828',
                fontSize: 14,
                lineHeight: 18,
                fontFamily: 'SF-Pro-Text-Bold',
                textAlign: 'center',
                width: 272,
              }}>
              Ljubljana
            </Text>
            <Text
              style={{
                color: '#282828',
                fontSize: 10,
                lineHeight: 13.5,
                fontFamily: 'SF-Pro-Text-Regular',
                textAlign: 'center',
                width: 272,
                marginBottom: 9,
              }}>
              Town
            </Text>
            <Text
              style={{
                color: '#282828',
                fontSize: 14,
                lineHeight: 18,
                fontFamily: 'SF-Pro-Text-Bold',
                textAlign: 'center',
                width: 272,
              }}>
              Slovenia
            </Text>
            <Text
              style={{
                color: '#282828',
                fontSize: 10,
                lineHeight: 13.5,
                fontFamily: 'SF-Pro-Text-Regular',
                textAlign: 'center',
                width: 272,
              }}>
              Country
            </Text>
            <View style={{flexDirection: 'row', gap: 15, marginTop: 30}}>
              <View
                style={{
                  width: 146.15,
                  height: 40,
                  borderRadius: 9,
                  backgroundColor: '#343434',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    gap: 9,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{transform: [{scale: 0.8}]}}
                    source={icons.edit}
                    width={17}
                    height={17}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'SF-Pro-Text-Bold',
                      fontSize: 16,
                      lineHeight: 16,
                    }}>
                    Edit
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  width: 146.15,
                  height: 40,
                  borderRadius: 9,
                  backgroundColor: '#343434',
                }}>
                <Pressable
                  style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    gap: 9,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    setSettingPageActivated(!settingPageActivated)
                  }>
                  <Image
                    style={{transform: [{scale: 0.83}], tintColor: '#fff'}}
                    source={icons.settings}
                    width={20}
                    height={20}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'SF-Pro-Text-Bold',
                      fontSize: 16,
                      lineHeight: 16,
                    }}>
                    Settings
                  </Text>
                </Pressable>
              </View>
            </View> */}
            <Pressable onPress={handleManage}>
              <Text>Manage Wallet</Text>
            </Pressable>
          </Animated.View>
        </Modal>
      ) : null}
    </>
  );
};

export default NotifComp;
