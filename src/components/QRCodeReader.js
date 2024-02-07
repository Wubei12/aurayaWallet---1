import { View, Text, Image, Alert, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIsForeground } from "../hooks/useIsForeground";
import { useIsFocused } from "@react-navigation/core";
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import ViewPropTypes from 'deprecated-react-native-prop-types';

import {
  Code,
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import usePayStore from "../store/store";

const QRCodeReader = () => {
  const { QAddData, setQAddData } = usePayStore();

  const [readData, setReadData] = useState("");
  console.log("🚀 ~ QRCodeReader ~ readData:", readData);

  const device = useCameraDevice("back");
  const isFocused = useIsFocused();
  const isForeground = useIsForeground();
  const [hasPerm, setHasPerm] = useState(false);

  useEffect(() => {
    async function requestPerm() {
      const newCameraPermission = await Camera.requestCameraPermission();
      const cameraPermission = Camera.getCameraPermissionStatus();
      if (cameraPermission === "granted") {
        setHasPerm(true);
      }
      console.log("cameraPermission: ", cameraPermission);
    }

    requestPerm();

    setQAddData(readData);
  }, [setHasPerm, readData]);
  const isActive = isFocused && isForeground;

  console.log("QAddData in the reader is:", QAddData);
  // console.log('device is:', device);

  const [torch, setTorch] = useState(false);

  const onCodeScanned = useCallback((codes) => {
    console.log(`Scanned ${codes.length} codes:`, codes);
    const value = codes[0]?.value;
    setReadData(value);
    console.log("Data is read.");
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: onCodeScanned,
  });

  return (
    hasPerm && (
      <Animated.View
        entering={FadeIn}
        style={{
          overflow: "hidden",
          height: 300,
          width: 300,
          borderRadius: 17,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          entering={ZoomIn}
          style={{
            width: 300,
            height: 300,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 275,
              height: 40,
              bottom: 2,
              top: 25,
              position: "absolute",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 40,
                height: 40,
                bottom: 2,
                borderTopLeftRadius: 15,
                borderRightWidth: 0,
                borderLeftWidth: 5,
                borderTopWidth: 5,
                borderBottomWidth: 0,
                borderColor: "#fff",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 40,
                height: 40,
                bottom: 2,
                borderTopRightRadius: 15,
                borderRightWidth: 5,
                borderLeftWidth: 0,
                borderTopWidth: 5,
                borderBottomWidth: 0,
                borderColor: "#fff",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 275,
              height: 40,
              bottom: 25,
              position: "absolute",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 40,
                height: 40,
                bottom: 2,
                borderBottomLeftRadius: 15,
                borderRightWidth: 0,
                borderLeftWidth: 5,
                borderTopWidth: 0,
                borderBottomWidth: 5,
                borderColor: "#fff",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 40,
                height: 40,
                bottom: 2,
                borderBottomRightRadius: 15,
                borderRightWidth: 5,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 5,
                borderColor: "#fff",
              }}
            />
          </View>
        </View>
        <View>
          {device != null && (
            <Camera
              style={{ width: 300, height: 300 }}
              device={device}
              isActive={isActive}
              codeScanner={codeScanner}
              torch={torch ? "on" : "off"}
              enableZoomGesture={true}
            />
          )}
        </View>
      </Animated.View>
    )
  );
};

export default QRCodeReader;
