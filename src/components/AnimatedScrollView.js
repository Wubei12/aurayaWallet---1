import {
  View,
  Text,
  Button,
  Pressable,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { MainLayout } from ".";
import { FAB } from "../components";
import { LinearGradient } from "react-native-linear-gradient";
import { styles } from "../globalStyles";
import { icons } from "../../constants";
import { trnsxnData } from "../../constants/constants";
import usePayStore from "../store/store";

const ITEM_SIZE = 75;

const AnimatedScrollView = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { isPaying } = usePayStore();

  return (
    <>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={[styles.bgOverlay, { display: isPaying ? "none" : "flex" }]}
      />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        style={{
          maxHeight: "65%",
          width: "100%",
          paddingHorizontal: 10,
          backgroundColor: "#000",
          marginBottom: 40,
        }}
      >
        {trnsxnData.map((item, index) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              key={index}
              style={{
                width: 353,
                height: 75,
                borderRadius: 16,
                backgroundColor: "rgba(227, 227, 227, 0.09)",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 17,
                marginBottom: 9,
                transform: [{ scale }],
                opacity: opacity,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 24, alignItems: "center" }}
              >
                {item.transactionType === "Pay" ? (
                  <Image
                    style={{
                      tintColor: "#484848",
                      width: 24,
                      height: 24,
                    }}
                    width={24}
                    height={24}
                    source={icons.pay}
                  />
                ) : null}
                {item.transactionType === "Receive" ? (
                  <Image
                    style={{
                      tintColor: "#484848",
                      width: 24,
                      height: 24,
                    }}
                    width={24}
                    height={24}
                    source={icons.recieve}
                  />
                ) : null}
                {item.transactionType === "Sell" ? (
                  <Image
                    style={{
                      tintColor: "#484848",
                      width: 24,
                      height: 24,
                    }}
                    width={24}
                    height={24}
                    source={icons.funds}
                  />
                ) : null}
                {item.transactionType === "Swap" ? (
                  <Image
                    source={icons.swap}
                    style={{
                      tintColor: "#484848",
                      width: 24,
                      height: 24,
                    }}
                    width={24}
                    height={24}
                  />
                ) : null}
                {item.transactionType === "Send" ? (
                  <Image
                    style={{
                      tintColor: "#484848",
                      width: 24,
                      height: 24,
                    }}
                    width={24}
                    height={24}
                    source={icons.send}
                  />
                ) : null}
                <View>
                  <Text
                    style={{
                      fontFamily: "SF-Pro-Text-Regular",
                      fontSize: 16,
                      lineHeight: 18,
                      color: "#fff",
                      marginBottom: 2,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "SF-Pro-Text-Regular",
                      fontSize: 13,
                      lineHeight: 16,
                      color: "#484848",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: "100%",
                  flexDirection: "row",
                  gap: 4,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color:
                      item.transactionType === "Receive" ||
                      item.transactionType === "Sell" ||
                      item.transactionType === "Swap"
                        ? "#00FFA3"
                        : "#FF6C6C",
                    height: "100%",
                    paddingVertical: 26,
                  }}
                >
                  {item.transactionType === "Sell" ||
                  item.transactionType === "Receive" ||
                  item.transactionType === "Swap"
                    ? "+"
                    : "-"}
                  {item.isAurayaAsset === true ? "" : "$"}
                </Text>
                <Image
                  source={icons.aurayaLogo}
                  width={12}
                  height={12}
                  style={{
                    width: 20,
                    alignSelf: "center",
                    height: 12,
                    tintColor:
                      item.transactionType === "Receive" ||
                      item.transactionType === "Sell" ||
                      item.transactionType === "Swap"
                        ? "#00FFA3"
                        : "#FF6C6C",
                    display: item.isAurayaAsset ? "flex" : "none",
                  }}
                />
                <Text
                  style={{
                    color:
                      item.transactionType === "Receive" ||
                      item.transactionType === "Sell" ||
                      item.transactionType === "Swap"
                        ? "#00FFA3"
                        : "#FF6C6C",
                    height: "100%",
                    paddingVertical: 26,
                  }}
                >
                  {item.amount}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </>
  );
};

export default AnimatedScrollView;
