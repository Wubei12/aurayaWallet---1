import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { Effect, useCallback, useEffect, useState } from "react";
import { MainLayout } from ".";
import { LinearGradient } from "react-native-linear-gradient";
import { FAB, FadeInView, IconBtn, IconTextButton } from "../components";
import { icons } from "../../constants";
import { COLORS } from "../../constants";
import Svg, { Circle } from "react-native-svg";
import { Buffer } from "buffer";
import { Toast } from "react-native-toast-notifications";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  withSpring,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { VidComp } from "./MainLayout";
import usePayStore from "../store/store";
import { useNavigation } from "@react-navigation/native";

const R = 1039.867168338 / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Home = () => {
  // async function showUser() {
  //   const result = await particleAuth.getUserInfo();
  //   const userInfo = JSON.parse(result);
  //   console.log('showing user:', userInfo);
  // }

  // showUser();

  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const {
    isCryptoWindow,
    setCryptoWindow,
    setSelectedButton,
    isPaying,
    transactionId,
    isTrnsxnSuccess,
    setIsTrnsxnError,
    setIsTrnsxnSuccess,
    isTrnsxnError,
    balance,
    isAuth,
    userData,
    storedUserData,
    setUserAddress,
  } = usePayStore();
  // console.log('🚀 ~ file: Home.js:45 ~ Home ~ userData:', userData);
  // console.log('🚀 ~ file: Home.js:44 ~ Home ~ isAuth:', isAuth);

  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);
  const MainRotation = useSharedValue(0);
  const animated = useSharedValue(0);

  const min = 1000;
  const max = 2000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const startFloatingAnim = useCallback(() => {
    animated.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  }, [animated]);

  useEffect(() => {
    if (!isAuth) {
      navigation.navigate("Login");
    }

    setCryptoWindow(false);
    progress.value = withTiming(1, { duration: 1000 });
    // progress.value = withRepeat(withTiming(1, {duration: 500}), -1, true);

    rotation.value = withRepeat(
      withTiming(-180, { duration: 300, easing: Easing.linear }),
      -1,
      false
    );

    MainRotation.value = withTiming(45, {
      duration: 300,
      easing: Easing.linear,
    });
    startFloatingAnim();

    const checkState = () => {
      if (isPaying) {
      } else {
        setTimeout(checkState, 1000);
      }
    };
    checkState();
  }, [
    progress,
    MainRotation,
    setSelectedButton,
    selected,
    isPaying,
    setCryptoWindow,
    rotation,
    isAuth,
    navigation,
    startFloatingAnim,
  ]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 519.933584169 * (1 - progress.value),
  }));
  const successAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 500 * (1 - progress.value),
  }));

  const animatedViewStyle = useAnimatedProps(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  });

  const animatedMainViewStyle = useAnimatedProps(() => {
    return {
      transform: [{ rotate: MainRotation.value + "deg" }],
    };
  });

  const rStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animated.value, [0, 1], [0, 5]);
    return {
      transform: [{ translateY }],
    };
  });

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const addSeparator = (numberString) => {
    const number = parseFloat(numberString);

    if (!isNaN(number)) {
      return number.toLocaleString();
    }

    return numberString;
  };

  const userName = userData.name;
  const firstName = userName.split(" ")[0];

  return (
    <MainLayout label={`Welcome ${firstName}`}>
      <View style={styles.homeStyles}>
        <VidComp />
        <View style={styles.mainContent}>
          <View
            style={{
              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <AnimatedPressable
              style={[
                {
                  position: "absolute",
                  top: 21,
                  left: 53,
                },
                rStyle,
              ]}
              onPress={() => {
                setSelected(1);
                setSelectedButton(selected);
              }}
            >
              <IconBtn
                id={1}
                withRipple
                icon={icons.btc}
                width={40}
                height={40}
                tag="btcTag"
              />
            </AnimatedPressable>
            <AnimatedPressable
              style={[
                {
                  position: "absolute",
                  top: 25,
                  right: 126,
                },
                rStyle,
              ]}
              onPress={() => {
                setSelected(2);
                setSelectedButton(selected);
              }}
            >
              <IconBtn
                id={2}
                withRipple
                icon={icons.solana}
                width={40}
                height={40}
                tag="solTag"
              />
            </AnimatedPressable>
            <AnimatedPressable
              style={[
                {
                  position: "absolute",
                  top: 0,
                  right: 75,
                },
                rStyle,
              ]}
              onPress={() => {
                setSelected(3);
                setSelectedButton(selected);
              }}
            >
              <IconBtn
                id={3}
                withRipple
                icon={icons.atlas}
                width={40}
                height={40}
                tag="avaTag"
              />
            </AnimatedPressable>
          </View>
          {isTrnsxnError ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                position: "absolute",
                bottom: 160,
              }}
            >
              <FadeInView
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255, 103, 103, 0.3)",
                    "#FF6767",
                  ]}
                  locations={[0.88, 1, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{
                    borderRadius: 500,
                    width: 331,
                    height: 331,
                  }}
                ></LinearGradient>
              </FadeInView>
              <Animated.View
                style={[
                  {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    position: "absolute",
                  },
                  animatedViewStyle,
                ]}
              >
                <Svg
                  style={{
                    width: 331,
                    height: 331,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AnimatedCircle
                    cx={165.5}
                    cy={165.5}
                    r={R}
                    stroke={COLORS.RadGrad}
                    strokeWidth={3}
                    strokeDasharray={260.752190248}
                    animatedProps={successAnimatedProps}
                    fill={"transparent"}
                  />
                </Svg>
              </Animated.View>
              <Pressable
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#FF6767",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: 265,
                  right: 80,
                  borderRadius: 50,
                  zIndex: 50,
                }}
                onPress={() => setIsTrnsxnError(false)}
              >
                <Image
                  source={icons.close}
                  style={{ transform: [{ scale: 0.5 }] }}
                />
              </Pressable>
              <View
                style={{
                  width: 331,
                  height: 331,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "SF-Pro-Text-Bold",
                    fontSize: 24,
                    color: "#fff",
                  }}
                >
                  Oops!
                </Text>
                <Text
                  style={{
                    fontFamily: "SF-Pro-Text-Bold",
                    width: 191,
                    textAlign: "center",
                    fontSize: 24,
                    color: "#fff",
                  }}
                >
                  Something Went Wrong
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 4, marginBottom: 16 }}
                >
                  <Text
                    style={{
                      fontFamily: "SF-Pro-Text-Bold",
                      fontSize: 14,
                      color: "#6F6F6F",
                    }}
                  >
                    Transaction ID
                  </Text>
                  <Text
                    style={{
                      fontFamily: "SF-Pro-Text-Regular",
                      fontSize: 14,
                      color: "#6F6F6F",
                    }}
                  >
                    {transactionId}
                  </Text>
                </View>
                <AnimatedPressable
                  entering={FadeIn.delay(500).duration(300)}
                  style={{
                    width: 146.15,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 9.23,
                    backgroundColor: "rgba(52, 52, 52, 1)",
                    flexDirection: "row",
                    gap: 8,
                  }}
                >
                  <Image
                    width={19}
                    height={19}
                    source={icons.trnsxns}
                    style={{ tintColor: "#fff" }}
                  />
                  <Text
                    style={{
                      fontFamily: "SF-Pro-Text-Bold",
                      fontSize: 12.31,
                      color: "#ffffff",
                    }}
                  >
                    Transactions
                  </Text>
                </AnimatedPressable>
                <Text
                  style={{
                    width: 163,
                    height: 49,
                    marginTop: 15,
                    textAlign: "center",
                    color: "#6F6F6F",
                    fontSize: 12,
                    fontFamily: "SF-Pro-Text-Regular",
                  }}
                >
                  Click anywere to close this window
                </Text>
              </View>
            </View>
          ) : null}
          {isTrnsxnSuccess ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                position: "absolute",
                bottom: 160,
              }}
            >
              <FadeInView
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LinearGradient
                  colors={["transparent", "rgba(0, 255, 163, 0.3)", "#00FFA3"]}
                  locations={[0.88, 1, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{
                    borderRadius: 500,
                    width: 331,
                    height: 331,
                  }}
                ></LinearGradient>
              </FadeInView>
              <Animated.View
                style={[
                  {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    position: "absolute",
                  },
                  animatedViewStyle,
                ]}
              >
                <Svg
                  style={{
                    width: 331,
                    height: 331,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AnimatedCircle
                    cx={165.5}
                    cy={165.5}
                    r={R}
                    stroke={COLORS.linGrad}
                    strokeWidth={3}
                    strokeDasharray={260.752190248}
                    animatedProps={successAnimatedProps}
                    fill={"transparent"}
                  />
                </Svg>
              </Animated.View>
              <Pressable
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#00FFA3",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: 265,
                  right: 80,
                  borderRadius: 50,
                  zIndex: 50,
                }}
                onPress={() => setIsTrnsxnSuccess(false)}
              >
                <Image
                  source={icons.close}
                  width={20}
                  height={20}
                  style={{ transform: [{ scale: 0.5 }] }}
                />
              </Pressable>
              <View
                style={{
                  width: 331,
                  height: 331,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "SF-Pro-Text-Bold",
                    fontSize: 24,
                    color: "#fff",
                  }}
                >
                  Success!
                </Text>
                <Text
                  style={{
                    fontFamily: "SF-Pro-Text-Bold",
                    width: 191,
                    textAlign: "center",
                    fontSize: 24,
                    color: "#fff",
                  }}
                >
                  Transaction Complete
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 4, marginBottom: 16 }}
                >
                  <Text
                    style={{
                      fontFamily: "SF-Pro-Text-Bold",
                      fontSize: 14,
                      color: "#6F6F6F",
                    }}
                  >
                    Transaction ID
                  </Text>
                  <Text
                    style={{
                      fontFamily: "SF-Pro-Text-Regular",
                      fontSize: 14,
                      color: "#6F6F6F",
                    }}
                  >
                    {/* {transactionId} */}
                    55648972AE55
                  </Text>
                </View>
                <AnimatedPressable
                  entering={FadeIn.delay(500).duration(300)}
                  style={{
                    width: 146.15,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 9.23,
                    backgroundColor: "rgba(52, 52, 52, 1)",
                    flexDirection: "row",
                    gap: 8,
                  }}
                >
                  <Image
                    width={19}
                    height={19}
                    source={icons.trnsxns}
                    style={{ tintColor: "#fff" }}
                  />
                  <Text
                    style={{
                      fontFamily: "SF-Pro-Text-Bold",
                      fontSize: 12.31,
                      color: "#ffffff",
                    }}
                  >
                    Transactions
                  </Text>
                </AnimatedPressable>
                <Text
                  style={{
                    width: 163,
                    height: 49,
                    marginTop: 15,
                    textAlign: "center",
                    color: "#6F6F6F",
                    fontSize: 12,
                    fontFamily: "SF-Pro-Text-Regular",
                  }}
                >
                  Click anywere to close this window
                </Text>
              </View>
            </View>
          ) : null}
          {isTrnsxnSuccess || isTrnsxnError ? null : (
            <View
              style={{
                width: "100%",
                height: 400,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                position: "absolute",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "SF-Pro-Text-Regular",
                  color: "white",
                }}
              >
                Your Balance
              </Text>
              <Text
                style={{
                  fontSize: 54,
                  fontFamily: "SF-Pro-Text-Bold",
                  color: "white",
                }}
              >
                $ {addSeparator(balance)}
              </Text>

              <FadeInView
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LinearGradient
                  colors={["transparent", "rgba(0, 255, 163, 0.3)", "#00FFA3"]}
                  locations={[0.88, 1, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{
                    borderRadius: 500,
                    width: 331,
                    height: 331,
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      width: 95,
                      height: 59,
                      alignSelf: "center",
                      bottom: 24,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 93.64,
                        height: 25,
                        flexDirection: "row",
                        gap: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Image
                        source={icons.up}
                        style={{
                          width: 23,
                          height: 13.85,
                          tintColor: "#00FFA3",
                        }}
                      />
                      <Text
                        style={{
                          color: "#00FFA3",
                          fontFamily: "SF-Pro-Text-Bold",
                          fontSize: 22,
                        }}
                      >
                        3.54%
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "SF-Pro-Text-Bold",
                        fontSize: 18,
                        marginBottom: 4,
                      }}
                    >
                      +$335.56
                    </Text>
                    <View
                      style={{
                        width: 93.64,
                        height: 25,
                        flexDirection: "row",
                        gap: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: "#6F6F6F",
                          fontFamily: "SF-Pro-Text-Regular",
                          fontSize: 14,
                        }}
                      >
                        Daily PNL
                      </Text>
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: "#696969",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 6,
                        }}
                      >
                        <Text
                          style={{
                            color: "#000",
                            fontFamily: "SF-Pro-Text-Bold",
                            fontSize: 10,
                            fontWeight: "bold",
                            position: "absolute",
                          }}
                        >
                          ?
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Animated.View
                    style={[
                      {
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        position: "absolute",
                        left: 21,
                      },
                      animatedMainViewStyle,
                    ]}
                  >
                    <Svg
                      style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        position: "absolute",
                        top: 14,
                      }}
                    >
                      <AnimatedCircle
                        cx={150}
                        cy={165}
                        r={R}
                        stroke={COLORS.linGrad}
                        strokeWidth={1.13}
                        strokeDasharray={259.966792085}
                        animatedProps={animatedProps}
                        fill={"transparent"}
                      />
                    </Svg>
                  </Animated.View>
                </LinearGradient>
              </FadeInView>
            </View>
          )}
        </View>
        <View
          style={{
            width: "100%",
            bottom: 100,
            position: "absolute",
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedPressable
            style={[
              {
                position: "absolute",
                left: 61,
                bottom: 100,
              },
              rStyle,
            ]}
            onPress={() => {
              setSelected(4);
              setSelectedButton(selected);
            }}
          >
            <IconBtn
              id={4}
              withRipple
              icon={icons.eth}
              width={40}
              height={40}
              tag="ethTag"
            />
          </AnimatedPressable>
          <AnimatedPressable
            style={[{ position: "absolute", right: 143, bottom: 80 }, rStyle]}
            onPress={() => {
              setSelected(5);
              setSelectedButton(selected);
            }}
          >
            <IconBtn
              id={5}
              withRipple
              icon={icons.usdt}
              width={40}
              height={40}
              tag="tethTag"
            />
          </AnimatedPressable>
          <AnimatedPressable
            style={[{ position: "absolute", right: 50, bottom: 140 }, rStyle]}
            onPress={() => {
              setSelected(6);
              setSelectedButton(selected);
            }}
          >
            <IconBtn
              id={6}
              withRipple
              icon={icons.pin}
              width={40}
              height={40}
              tag="pinTag"
            />
          </AnimatedPressable>
        </View>
        <FAB />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  homeStyles: { flex: 1, alignItems: "center", justifyContent: "center" },

  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  mainContent: {
    position: "absolute",
    top: 120,
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
export default Home;
