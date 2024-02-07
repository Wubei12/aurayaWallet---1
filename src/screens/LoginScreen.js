import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import BigNumber from "bignumber.js";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import usePayStore from "../store/store";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../../constants";
import Animated, { SlideInLeft, ZoomIn } from "react-native-reanimated";
import { LoginForm } from "../components";
import { config } from "process";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const LoginScreen = () => {
  const {
    setIsAuth,
    isAuth,
    setUserData,
    setStoredUserData,
    userData,
    storedUserData,
    isLoggedout,
  } = usePayStore();
  const navigation = useNavigation();
  const [biometricsAuth, setBiometricAuth] = useState(false);

  const handleLogin = async () => {};

  const biometrics = new ReactNativeBiometrics();

  useEffect(() => {
    if (isAuth) {
      navigation.navigate("Home");
    }
  }, [isAuth, navigation]);

  async function handleBiometrics() {
    try {
      biometrics.isSensorAvailable().then((resultObject) => {
        const { available, biometryType, success } = resultObject;

        if (available && biometryType === BiometryTypes.TouchID) {
          console.log("TouchID is supported");
          const result = biometrics
            .simplePrompt({
              promptMessage: "Authenticate",
            })
            .then((resultingObject) => {
              const { success } = resultingObject;

              if (success) {
                setBiometricAuth(true);
              }
            });
        } else if (available && biometryType === BiometryTypes.FaceID) {
          console.log("FaceID is supported");
          const result = biometrics
            .simplePrompt({
              promptMessage: "Authenticate",
            })
            .then((resultingObject) => {
              const { success } = resultingObject;

              if (success) {
                setBiometricAuth(true);
              }
            });
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          const result = biometrics
            .simplePrompt({
              promptMessage: "Confirm Fingerprint",
            })
            .then((resultingObject) => {
              const { success } = resultingObject;

              if (success) {
                setBiometricAuth(true);
                setIsAuth(true);
              }
            });
        } else {
          console.log("Biometrics not supported");
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleBiometric = async () => {
    await handleBiometrics();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Animated.View
        entering={SlideInLeft.springify()}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: "#696969",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Animatable.Image
          animation="slideInLeft"
          duration={300}
          delay={300}
          source={icons.aurayaLogo}
          style={{ tintColor: "#000" }}
        />
      </Animated.View>
      <Animatable.Text
        animation="fadeIn"
        delay={500}
        style={{
          color: "#696969",
          fontSize: 24,
          lineHeight: 24,
          fontFamily: "SF-Pro-Text-Bold",
          marginBottom: 60,
        }}
      >
        Auraya Wallet
      </Animatable.Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
