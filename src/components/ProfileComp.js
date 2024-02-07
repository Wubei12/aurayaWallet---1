import { Image, Modal, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
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
import usePayStore from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileComp = ({ isProfileModalOpen, setIsProfileModalOpen }) => {
  const [settingPageActivated, setSettingPageActivated] = useState(false);
  const { setIsAuth, setUserData, userData } = usePayStore();

  const handleLogout = async () => {};

  return (
    <>
      {isProfileModalOpen ? (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isProfileModalOpen}
          onRequestClose={() => setIsProfileModalOpen(!isProfileModalOpen)}
        >
          <Pressable
            style={{
              width: "100%",
              height: 134,
              position: "absolute",
              bottom: 0,
            }}
            onPress={() => {
              setIsProfileModalOpen(false);
            }}
          ></Pressable>
          <Animated.View
            entering={SlideInUp.duration(400)}
            exiting={BounceOutUp}
            style={styles.ProfileCompContainer}
          >
            {settingPageActivated ? (
              <Animated.View
                entering={SlideInRight}
                exiting={SlideOutRight}
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setIsProfileModalOpen(false);
                }}
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
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 11.25,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconBtn
                      icon={icons.arrowLeft}
                      width={20}
                      height={20}
                      onPress={() => setSettingPageActivated(false)}
                    />
                    <Text
                      style={{
                        color: "#000",
                        fontFamily: "SF-Pro-Text-Bold",
                        fontSize: 20,
                        lineHeight: 20,
                      }}
                    >
                      Settings
                    </Text>
                  </View>
                  <IconBtn
                    icon={icons.close}
                    width={24}
                    height={24}
                    onPress={() => setIsProfileModalOpen(false)}
                    style={{ transform: [{ scale: 0.7 }] }}
                  />
                </View>

                <View
                  style={{
                    height: 72,
                    width: "90%",
                    borderBottomWidth: 1,
                    borderColor: "#C0C0C0",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#282828",
                      fontSize: 14,
                      lineHeight: 18,
                      fontFamily: "SF-Pro-Text-Bold",
                    }}
                  >
                    Settings For Something
                  </Text>
                  <Text
                    style={{
                      color: "#6F6F6F",
                      fontSize: 10,
                      lineHeight: 13.5,
                      fontFamily: "SF-Pro-Text-Regular",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <View
                  style={{
                    height: 72,
                    width: "90%",
                    borderBottomWidth: 1,
                    borderColor: "#C0C0C0",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#282828",
                      fontSize: 14,
                      lineHeight: 18,
                      fontFamily: "SF-Pro-Text-Bold",
                    }}
                  >
                    Settings For Something
                  </Text>
                  <Text
                    style={{
                      color: "#6F6F6F",
                      fontSize: 10,
                      lineHeight: 13.5,
                      fontFamily: "SF-Pro-Text-Regular",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <View
                  style={{
                    height: 72,
                    width: "90%",
                    borderBottomWidth: 1,
                    borderColor: "#C0C0C0",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#282828",
                      fontSize: 14,
                      lineHeight: 18,
                      fontFamily: "SF-Pro-Text-Bold",
                    }}
                  >
                    Settings For Something
                  </Text>
                  <Text
                    style={{
                      color: "#6F6F6F",
                      fontSize: 10,
                      lineHeight: 13.5,
                      fontFamily: "SF-Pro-Text-Regular",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <View
                  style={{
                    height: 72,
                    width: "90%",
                    borderBottomWidth: 1,
                    borderColor: "#C0C0C0",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#282828",
                      fontSize: 14,
                      lineHeight: 18,
                      fontFamily: "SF-Pro-Text-Bold",
                    }}
                  >
                    Settings For Something
                  </Text>
                  <Text
                    style={{
                      color: "#6F6F6F",
                      fontSize: 10,
                      lineHeight: 13.5,
                      fontFamily: "SF-Pro-Text-Regular",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <View
                  style={{
                    height: 72,
                    width: "90%",
                    borderBottomWidth: 1,
                    borderColor: "#C0C0C0",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#282828",
                      fontSize: 14,
                      lineHeight: 18,
                      fontFamily: "SF-Pro-Text-Bold",
                    }}
                  >
                    Settings For Something
                  </Text>
                  <Text
                    style={{
                      color: "#6F6F6F",
                      fontSize: 10,
                      lineHeight: 13.5,
                      fontFamily: "SF-Pro-Text-Regular",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <View
                  style={{
                    height: 72,
                    width: "90%",
                    borderBottomWidth: 1,
                    borderColor: "#C0C0C0",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#282828",
                      fontSize: 14,
                      lineHeight: 18,
                      fontFamily: "SF-Pro-Text-Bold",
                    }}
                  >
                    Settings For Something
                  </Text>
                  <Text
                    style={{
                      color: "#6F6F6F",
                      fontSize: 10,
                      lineHeight: 13.5,
                      fontFamily: "SF-Pro-Text-Regular",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
              </Animated.View>
            ) : (
              <>
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
                    My Profile
                  </Text>
                  <IconBtn
                    icon={icons.close}
                    width={24}
                    height={24}
                    onPress={() => setIsProfileModalOpen(false)}
                    style={{ transform: [{ scale: 0.7 }] }}
                  />
                </View>
                <View
                  style={{
                    shadowColor: "#000",
                    elevation: 100,
                    width: 100,
                    height: 100,
                  }}
                >
                  <Image
                    source={{ uri: thridParty.picture }}
                    width={100}
                    height={100}
                    style={{ borderRadius: 50 }}
                  />
                </View>
                <Text style={styles.ProfText}>{userData.name}</Text>
                <Text
                  style={{
                    color: "#282828",
                    fontSize: 14,
                    lineHeight: 18,
                    fontFamily: "SF-Pro-Text-Regular",
                    textAlign: "center",
                    width: 272,
                    height: 73,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Text
                  style={{
                    color: "#282828",
                    fontSize: 14,
                    lineHeight: 18,
                    fontFamily: "SF-Pro-Text-Bold",
                    textAlign: "center",
                    width: 272,
                  }}
                >
                  {userData.google_email}
                </Text>
                <Text
                  style={{
                    color: "#6F6F6F",
                    fontSize: 10,
                    lineHeight: 13.5,
                    fontFamily: "SF-Pro-Text-Regular",
                    textAlign: "center",
                    width: 272,
                    marginBottom: 9,
                  }}
                >
                  Email
                </Text>
                <Text
                  style={{
                    color: "#282828",
                    fontSize: 14,
                    lineHeight: 18,
                    fontFamily: "SF-Pro-Text-Bold",
                    textAlign: "center",
                    width: 272,
                  }}
                >
                  Ljubljana
                </Text>
                <Text
                  style={{
                    color: "#282828",
                    fontSize: 10,
                    lineHeight: 13.5,
                    fontFamily: "SF-Pro-Text-Regular",
                    textAlign: "center",
                    width: 272,
                    marginBottom: 9,
                  }}
                >
                  Town
                </Text>
                <Text
                  style={{
                    color: "#282828",
                    fontSize: 14,
                    lineHeight: 18,
                    fontFamily: "SF-Pro-Text-Bold",
                    textAlign: "center",
                    width: 272,
                  }}
                >
                  Slovenia
                </Text>
                <Text
                  style={{
                    color: "#282828",
                    fontSize: 10,
                    lineHeight: 13.5,
                    fontFamily: "SF-Pro-Text-Regular",
                    textAlign: "center",
                    width: 272,
                  }}
                >
                  Country
                </Text>
                <View style={{ flexDirection: "row", gap: 15, marginTop: 30 }}>
                  <View
                    style={{
                      width: 146.15,
                      height: 40,
                      borderRadius: 9,
                      backgroundColor: "#343434",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      style={{
                        width: "100%",
                        height: "100%",
                        flexDirection: "row",
                        gap: 9,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
                    >
                      <Image
                        style={{ transform: [{ scale: 0.8 }] }}
                        source={icons.edit}
                        width={17}
                        height={17}
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "SF-Pro-Text-Bold",
                          fontSize: 16,
                          lineHeight: 16,
                        }}
                      >
                        Edit
                      </Text>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      width: 146.15,
                      height: 40,
                      borderRadius: 9,
                      backgroundColor: "#343434",
                    }}
                  >
                    <Pressable
                      android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
                      style={{
                        width: "100%",
                        height: "100%",
                        flexDirection: "row",
                        gap: 9,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() =>
                        setSettingPageActivated(!settingPageActivated)
                      }
                    >
                      <Image
                        style={{
                          transform: [{ scale: 0.83 }],
                          tintColor: "#fff",
                        }}
                        source={icons.settings}
                        width={20}
                        height={20}
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "SF-Pro-Text-Bold",
                          fontSize: 16,
                          lineHeight: 16,
                        }}
                      >
                        Settings
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    width: 146.15,
                    height: 40,
                    borderRadius: 9,
                    backgroundColor: "#343434",
                    marginTop: 20,
                  }}
                >
                  <Pressable
                    android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      flexDirection: "row",
                      gap: 9,
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 25, // Android shadow
                      shadowColor: "#000", // iOS shadow
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                    }}
                    onPress={handleLogout}
                  >
                    <Image
                      style={{ tintColor: "#fff" }}
                      source={icons.logout}
                      width={20}
                      height={20}
                    />
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "SF-Pro-Text-Bold",
                        fontSize: 16,
                        lineHeight: 16,
                      }}
                    >
                      Log out
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </Animated.View>
        </Modal>
      ) : null}
    </>
  );
};

export default ProfileComp;
