import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../globalStyles";
import { MainLayout } from ".";
import usePayStore from "../store/store";
import Svg, { RadialGradient, Stop, Circle } from "react-native-svg";
import { icons } from "../../constants";
import { IconBtn } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import Animated, {
  Easing,
  FadeIn,
  FadeInLeft,
  FadeOut,
  SlideInRight,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { QRCodeGenerator } from "../components";

const currencyData = [
  {
    label: "USD",
    symbol: "USD",
    balance: "40000",
    rate: "1",
    icon: icons.usd,
  },
  {
    label: "Solana",
    symbol: "SOL",
    balance: "100000.2",
    rate: "103.17",
    icon: icons.tintSol,
  },
  {
    label: "Tether USDT",
    symbol: "USDT",
    balance: "5000.2",
    rate: "1",
    icon: icons.tintUsdt,
  },
  {
    label: "Ethereum",
    symbol: "ETH",
    balance: "12000.50",
    rate: "2305.06",
    icon: icons.tintEth,
  },
  {
    label: "PolkaDot",
    symbol: "DOT",
    balance: "40056.856",
    rate: "7.87",
    icon: icons.tintPin,
  },
];
const Receive = () => {
  const {
    setCryptoWindow,
    isCryptoWindow,
    isAuth,
    userData,
    setUserAddress,
    userAddress,
  } = usePayStore();

  console.log("🚀 ~ Receive ~ userAddress:", userAddress);
  // console.log('🚀 isCryptoWindow in Receive:', isCryptoWindow);

  const [showDone, setShowDone] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showLabel, setShowLabel] = useState(false);
  const [currSelected, setCurrSelected] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [balance, setBalance] = useState(null);
  const [rate, setRate] = useState(null);
  const [icon, setIcon] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [noteEntered, setNoteEntered] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // console.log('🚀 amount is:', amount);
  // console.log('🚀 note is:', note);
  // console.log('🚀 note length is:', note.length);
  // console.log('🚀 note entry is:', noteEntered);
  // console.log('🚀 form complete is:', formComplete);

  const screenWidth = Dimensions.get("screen").width;
  const formWidth = screenWidth * 0.8;
  const space = screenWidth * 0.02;
  const sideIntrusion = (screenWidth * 0.18) / 2;

  useEffect(() => {
    if (!isAuth) {
      navigation.navigate("Login");
    }
    if (amount === "") {
      setShowDone(false);
    }
    if (note.length === 0) {
      setNoteEntered(false);
      console.log("no note");
    } else {
      setNoteEntered(true);
      console.log("note detected");
    }
  }, [
    setCryptoWindow,
    setShowDone,
    amount,
    note,
    setNoteEntered,
    isAuth,
    navigation,
  ]);

  const navigation = useNavigation();
  // const route = useRoute();

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const handleCurrencyPress = (index) => {
    setSelectedIdx(index);
    setShowLabel(true);
  };

  const addSeparator = (numberString) => {
    const number = parseFloat(numberString);

    if (!isNaN(number)) {
      return number.toLocaleString();
    }

    return numberString;
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  };

  function generateRandomId(length) {
    const characters =
      "01234567890123456789012345678901234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }

  const randomId = generateRandomId(12);

  function getCurrentDate() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(2);

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  const currentDate = getCurrentDate();
  console.log(currentDate);

  return (
    <MainLayout label={"Receive Payment"}>
      <Animated.View
        entering={ZoomIn}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            top: 90,
            width: 644,
            height: 644,
            borderRadius: 645,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderWidth: 3,
            borderColor: "rgba(255,255,255,0.15)",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Svg height="110%" width="110%" style={{ zIndex: 100 }}>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <Stop offset="80%" stopColor="#161616" stopOpacity="1" />
              <Stop offset="82%" stopColor="#292929" stopOpacity="0.4" />
              <Stop offset="90%" stopColor="#0A0A0A" stopOpacity="0.8" />
            </RadialGradient>
            <Circle
              cx="50%"
              cy="50%"
              r="50%"
              fill="url(#grad)"
              stroke="black"
              strokeWidth="5"
            />
          </Svg>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.innerContent}>
            <Animatable.Text
              animation="fadeIn"
              delay={400}
              style={{
                color: "#ffffff",
                fontSize: 16,
                marginBottom: 16,
                lineHeight: 16,
                fontFamily: "SF-Pro-Text-Bold",
              }}
            >
              Step 1
            </Animatable.Text>
            <Animatable.Text
              animation="fadeIn"
              delay={550}
              style={{
                color: "#ffffff",
                fontSize: 24,
                width: 272,
                height: 74,
                lineHeight: 24,
                fontFamily: "SF-Pro-Text-Bold",
                textAlign: "center",
              }}
            >
              Scan the QR or Tap your phone
            </Animatable.Text>
            <Animatable.Text
              animation="fadeIn"
              delay={700}
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginBottom: 32,
                lineHeight: 18,
                width: 272,
                textAlign: "center",
                fontFamily: "SF-Pro-Text-Regular",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </Animatable.Text>
            <QRCodeGenerator value={userAddress} />

            <Animatable.Text
              animation="fadeIn"
              delay={700}
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginTop: 32,
                lineHeight: 14,
                fontFamily: "SF-Pro-Text-Regular",
              }}
            >
              Vivamus et imperdiet purus.
            </Animatable.Text>
            {/* {formComplete ? (
              <Animated.View
                entering={SlideInRight}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Animatable.Text
                  animation="fadeIn"
                  delay={400}
                  style={{
                    color: '#ffffff',
                    fontSize: 16,
                    marginBottom: 16,
                    lineHeight: 16,
                    fontFamily: 'SF-Pro-Text-Bold',
                  }}>
                  Step 2
                </Animatable.Text>
                <Animatable.Text
                  animation="fadeIn"
                  delay={550}
                  style={{
                    color: '#ffffff',
                    fontSize: 24,
                    marginBottom: 16,
                    lineHeight: 24,
                    fontFamily: 'SF-Pro-Text-Bold',
                  }}>
                  Transaction Overview
                </Animatable.Text>
                <Animatable.Text
                  animation="fadeIn"
                  delay={700}
                  style={{
                    color: '#ffffff',
                    fontSize: 14,
                    marginBottom: 32,
                    lineHeight: 14,
                    fontFamily: 'SF-Pro-Text-Regular',
                  }}>
                  Lorem ipsum dolor sit amet.
                </Animatable.Text>
                <Animatable.Text
                  animation="zoomIn"
                  duration={500}
                  delay={100}
                  style={{
                    color: 'rgba(111, 111, 111, 0.44)',
                    fontSize: 14,
                    lineHeight: 18,
                    marginBottom: 11,
                    fontFamily: 'SF-Pro-Text-Bold',
                  }}>
                  Amount
                </Animatable.Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 12,
                  }}>
                  {icon !== null ? (
                    <Image
                      width={22}
                      height={22}
                      source={icon}
                      style={{tintColor: 'white'}}
                    />
                  ) : (
                    <Image
                      width={22}
                      height={22}
                      source={icons.usd}
                      style={{tintColor: 'white'}}
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Text-Bold',
                      fontSize: 34.79,
                      lineHeight: 35,
                      color: '#fff',
                    }}>
                    {addSeparator(amount)}
                  </Text>
                </View>
                {icon !== null ? (
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Text-Regular',
                      fontSize: 14,
                      lineHeight: 18,
                      color: '#fff',
                      marginBottom: 32,
                    }}>
                    ≈ $ {addSeparator(amount * rate)}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Text-Regular',
                      fontSize: 14,
                      lineHeight: 18,
                      color: '#fff',
                      marginBottom: 32,
                    }}>
                    ≈ $ {addSeparator(amount)}
                  </Text>
                )}
                <Text
                  style={{
                    fontFamily: 'SF-Pro-Text-Bold',
                    fontSize: 14,
                    color: '#ffffff',
                    marginBottom: 11,
                    lineHeight: 18,
                  }}>
                  {icon !== null ? currSelected : 'Fiat'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'SF-Pro-Text-Regular',
                    fontSize: 14,
                    color: '#ffffff',
                    marginBottom: 3,
                    lineHeight: 18,
                  }}>
                  Balance: {icon !== null ? addSeparator(balance) : '25,000'}{' '}
                  {icon !== null ? currency : 'USD'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'SF-Pro-Text-Bold',
                    fontSize: 14,
                    color: '#ffffff',
                    marginBottom: 21,
                    lineHeight: 18,
                  }}>
                  New Balance:{' '}
                  {icon !== null
                    ? addSeparator(balance - amount)
                    : addSeparator(25000 - amount)}{' '}
                  {icon !== null ? currency : 'USD'}
                </Text>
                <AnimatedPressable
                  entering={FadeIn.delay(500).duration(300)}
                  style={{
                    width: noteEntered ? 'auto' : 146.15,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 9.23,
                    backgroundColor: 'rgba(52, 52, 52, 1)',
                    flexDirection: 'row',
                    gap: 24,
                    padding: noteEntered ? 14 : 0,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  {noteEntered ? (
                    <>
                      <Text
                        style={{
                          fontFamily: 'SF-Pro-Text-Bold',
                          fontSize: 12.31,
                          lineHeight: 13.85,
                          color: '#ffffff',
                        }}>
                        {truncateText(note, 39)}
                      </Text>
                      <Image width={19} height={19} source={icons.edit} />
                    </>
                  ) : (
                    <>
                      <Image width={19} height={19} source={icons.note} />
                      <Text
                        style={{
                          fontFamily: 'SF-Pro-Text-Bold',
                          fontSize: 12.31,
                          color: '#ffffff',
                        }}>
                        Add Note
                      </Text>
                    </>
                  )}
                </AnimatedPressable>
                {modalVisible ? (
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Animated.View
                      entering={FadeIn}
                      exiting={FadeOut}
                      style={styles.centeredView}>
                      <Animated.View
                        entering={ZoomIn.delay(100)}
                        exiting={ZoomOut}
                        style={styles.modalView}>
                        <View
                          style={[
                            styles.contnr,
                            StyleSheet.absoluteFillObject,
                          ]}>
                          <Animated.View
                            entering={FadeIn.easing(Easing.circle)}
                            exiting={FadeOut}
                            sharedTransitionTag="btcTag"
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: 300,
                              borderRadius: 20,
                              backgroundColor: '#2b2b2b',
                            }}
                          />
                          <View
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              padding: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: 'rgba(111, 111, 111, 0.44)',
                                fontSize: 14,
                                lineHeight: 18,
                                marginBottom: 1,
                                left: 12.5,
                                fontFamily: 'SF-Pro-Text-Bold',
                                alignSelf: 'flex-start',
                              }}>
                              Add Note
                            </Text>
                            <Text
                              style={{
                                color: 'rgba(111, 111, 111, 0.44)',
                                fontSize: 12,
                                lineHeight: 18,
                                left: 12.5,
                                marginBottom: 17,
                                fontFamily: 'SF-Pro-Text-Regular',
                                alignSelf: 'flex-start',
                              }}>
                              Add Your Note Here. {':)'}
                            </Text>
                            <View
                              style={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                elevation: 22,
                              }}>
                              <IconBtn
                                width={12}
                                height={12}
                                icon={icons.noteClose}
                                style={{
                                  tintColor: '#fff',
                                  shadowColor: '#000',
                                  shadowOffset: {
                                    width: 2,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 4,
                                }}
                                onPress={() => setModalVisible(false)}
                              />
                            </View>
                            <TextInput
                              multiline={true}
                              numberOfLines={10}
                              style={{
                                height: 200,
                                width: '100%',
                                textAlignVertical: 'top',
                                backgroundColor: '#000',
                                color: '#fff',
                                borderRadius: 20,
                                padding: 25,
                                marginBottom: 41,
                              }}
                              value={note}
                              onChangeText={setNote}
                            />
                            <View style={{flexDirection: 'row', gap: 20}}>
                              <AnimatedPressable
                                entering={FadeIn.delay(500).duration(300)}
                                style={{
                                  width: 146.15,
                                  height: 40,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 9.23,
                                  backgroundColor: 'rgba(52, 52, 52, 1)',
                                  flexDirection: 'row',
                                  gap: 11,
                                }}
                                onPress={() => {
                                  setModalVisible(!modalVisible);
                                  setNote('');
                                }}>
                                <Image
                                  style={{tintColor: '#E84142'}}
                                  width={12}
                                  height={12}
                                  source={icons.noteClose}
                                />
                                <Text
                                  style={{
                                    fontFamily: 'SF-Pro-Text-Bold',
                                    fontSize: 12.31,
                                    color: '#E84142',
                                  }}>
                                  Cancel
                                </Text>
                              </AnimatedPressable>
                              <AnimatedPressable
                                entering={FadeIn.delay(500).duration(300)}
                                style={{
                                  width: 146.15,
                                  height: 40,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 9.23,
                                  backgroundColor: 'rgba(52, 52, 52, 1)',
                                  flexDirection: 'row',
                                  gap: 11,
                                }}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Image
                                  style={{tintColor: '#fff'}}
                                  width={10}
                                  height={10}
                                  source={icons.check}
                                />
                                <Text
                                  style={{
                                    fontFamily: 'SF-Pro-Text-Bold',
                                    fontSize: 12.31,
                                    color: '#ffffff',
                                  }}>
                                  Done
                                </Text>
                              </AnimatedPressable>
                            </View>
                          </View>
                        </View>
                      </Animated.View>
                    </Animated.View>
                  </Modal>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    marginBottom: 4,
                    marginTop: 48,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Text-Regular',
                      fontSize: 14,
                      lineHeight: 18,
                      color: '#6F6F6F',
                    }}>
                    Transaction ID
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Text-Bold',
                      fontSize: 14,
                      lineHeight: 18,
                      color: '#6F6F6F',
                    }}>
                    {randomId}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', gap: 6}}>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Text-Regular',
                      fontSize: 14,
                      lineHeight: 18,
                      color: '#6F6F6F',
                    }}>
                    Transaction Date
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Text-Bold',
                      fontSize: 14,
                      lineHeight: 18,
                      color: '#6F6F6F',
                    }}>
                    {currentDate}
                  </Text>
                </View>
              </Animated.View>
            ) : (
              <>
                <Animatable.Text
                  animation="fadeIn"
                  delay={400}
                  style={{
                    color: '#ffffff',
                    fontSize: 16,
                    marginBottom: 16,
                    lineHeight: 16,
                    fontFamily: 'SF-Pro-Text-Bold',
                  }}>
                  Step 1
                </Animatable.Text>
                <Animatable.Text
                  animation="fadeIn"
                  delay={550}
                  style={{
                    color: '#ffffff',
                    fontSize: 24,
                    marginBottom: 16,
                    lineHeight: 24,
                    fontFamily: 'SF-Pro-Text-Bold',
                  }}>
                  Payment Details
                </Animatable.Text>
                <Animatable.Text
                  animation="fadeIn"
                  delay={700}
                  style={{
                    color: '#ffffff',
                    fontSize: 14,
                    marginBottom: 32,
                    lineHeight: 14,
                    fontFamily: 'SF-Pro-Text-Regular',
                  }}>
                  Lorem ipsum dolor sit amet.
                </Animatable.Text>
                <Animatable.Text
                  animation="slideInRight"
                  delay={400}
                  style={{
                    color: 'rgba(111, 111, 111, 0.44)',
                    fontSize: 14,
                    lineHeight: 18,
                    marginBottom: 11,
                    fontFamily: 'SF-Pro-Text-Bold',
                  }}>
                  Enter Amount
                </Animatable.Text>
                <View
                  style={{
                    height: showLabel ? 94 : 74,
                    width: 311,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    entering={SlideInRight.delay(300).duration(500)}
                    style={{
                      backgroundColor: '#000',
                      fontFamily: 'SF-Pro-Text-Bold',
                      fontSize: 34.79,
                      lineHeight: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      width: '100%',
                      height: '100%',
                      borderRadius: 8,
                      padding: 10,
                    }}
                    value={amount}
                    keyboardType="numeric"
                    textAlign="center"
                    onChangeText={setAmount}
                    onFocus={() => {
                      setShowButtons(false);
                    }}
                    onSubmitEditing={() => {
                      setShowButtons(true);
                      setShowDone(true);
                    }}
                  />
                  {showLabel ? (
                    <Image
                      width={25}
                      height={25}
                      source={icon}
                      style={{
                        position: 'absolute',
                        left: 12,
                        backgroundColor: 'black',
                        tintColor: '#fff',
                      }}
                    />
                  ) : null}
                  {amount != 0 ? (
                    rate !== null ? (
                      <Text
                        style={{
                          position: 'absolute',
                          fontFamily: 'SF-Pro-Text-Regular',
                          color: 'white',
                          fontSize: 14,
                          lineHeight: 18,
                          bottom: 10,
                        }}>
                        ≈ $ {addSeparator(amount * rate)}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          position: 'absolute',
                          fontFamily: 'SF-Pro-Text-Regular',
                          color: 'white',
                          fontSize: 14,
                          lineHeight: 18,
                          bottom: 4,
                        }}>
                        ≈ $ {addSeparator(amount)}
                      </Text>
                    )
                  ) : null}
                </View>
                <Animatable.Text
                  animation="slideInLeft"
                  delay={400}
                  style={{
                    color: 'rgba(111, 111, 111, 0.44)',
                    fontSize: 14,
                    lineHeight: 18,
                    marginBottom: 4,
                    fontFamily: 'SF-Pro-Text-Bold',
                    marginTop: 11,
                  }}>
                  Selecet Preffered Currency
                </Animatable.Text>
                <Animatable.Text
                  animation="slideInLeft"
                  delay={400}
                  style={{
                    color: 'rgba(111, 111, 111, 0.44)',
                    fontSize: 10,
                    lineHeight: 18,
                    marginBottom: 11,
                    fontFamily: 'SF-Pro-Text-Regular',
                  }}>
                  Leave none selected if you don’t have a preffered currency
                </Animatable.Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 9,
                    marginBottom: showLabel ? 18 : 41,
                  }}>
                  {currencyData.map((item, index) => {
                    return (
                      <Animated.View
                        key={index}
                        entering={FadeInLeft.delay(150 * index)}>
                        <IconBtn
                          key={index}
                          width={40}
                          height={40}
                          icon={item.icon}
                          style={{
                            tintColor:
                              selectedIdx === index ? 'white' : '#5F5F5F',
                            borderWidth: 0.5,
                            borderColor:
                              selectedIdx === index ? '#d9d9d9' : 'transparent',
                            borderRadius: 40,
                          }}
                          onPress={() => {
                            handleCurrencyPress(index);
                            setCurrSelected(item.label);
                            setCurrency(item.symbol);
                            setBalance(item.balance);
                            setRate(item.rate);
                            setIcon(item.icon);
                          }}
                        />
                      </Animated.View>
                    );
                  })}
                </View>

                {showLabel && (
                  <>
                    <Text
                      style={{
                        fontFamily: 'SF-Pro-Text-Bold',
                        fontSize: 14,
                        color: '#ffffff',
                        marginBottom: 11,
                        lineHeight: 18,
                      }}>
                      {currSelected}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'SF-Pro-Text-Regular',
                        fontSize: 14,
                        color: '#ffffff',
                        marginBottom: 3,
                        lineHeight: 18,
                      }}>
                      Balance: {addSeparator(balance)} {currency}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'SF-Pro-Text-Bold',
                        fontSize: 14,
                        color: '#ffffff',
                        marginBottom: 21,
                        lineHeight: 18,
                      }}>
                      New Balance: {addSeparator(balance - amount)} {currency}
                    </Text>
                  </>
                )}

                <AnimatedPressable
                  entering={FadeIn.delay(500).duration(300)}
                  style={{
                    width: noteEntered ? 'auto' : 146.15,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 9.23,
                    backgroundColor: 'rgba(52, 52, 52, 1)',
                    flexDirection: 'row',
                    gap: 24,
                    padding: noteEntered ? 14 : 0,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  {noteEntered ? (
                    <>
                      <Text
                        style={{
                          fontFamily: 'SF-Pro-Text-Bold',
                          fontSize: 12.31,
                          lineHeight: 13.85,
                          color: '#ffffff',
                        }}>
                        {truncateText(note, 39)}
                      </Text>
                      <Image width={19} height={19} source={icons.edit} />
                    </>
                  ) : (
                    <>
                      <Image width={19} height={19} source={icons.note} />
                      <Text
                        style={{
                          fontFamily: 'SF-Pro-Text-Bold',
                          fontSize: 12.31,
                          color: '#ffffff',
                        }}>
                        Add Note
                      </Text>
                    </>
                  )}
                </AnimatedPressable>
              </>
            )} */}
          </View>
          {modalVisible ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.centeredView}
              >
                <Animated.View
                  entering={ZoomIn.delay(100)}
                  exiting={ZoomOut}
                  style={styles.modalView}
                >
                  <View style={[styles.contnr, StyleSheet.absoluteFillObject]}>
                    <Animated.View
                      entering={FadeIn.easing(Easing.circle)}
                      exiting={FadeOut}
                      sharedTransitionTag="btcTag"
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: 300,
                        borderRadius: 20,
                        backgroundColor: "#2b2b2b",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "rgba(111, 111, 111, 0.44)",
                          fontSize: 14,
                          lineHeight: 18,
                          marginBottom: 1,
                          left: 12.5,
                          fontFamily: "SF-Pro-Text-Bold",
                          alignSelf: "flex-start",
                        }}
                      >
                        Add Note
                      </Text>
                      <Text
                        style={{
                          color: "rgba(111, 111, 111, 0.44)",
                          fontSize: 12,
                          lineHeight: 18,
                          left: 12.5,
                          marginBottom: 17,
                          fontFamily: "SF-Pro-Text-Regular",
                          alignSelf: "flex-start",
                        }}
                      >
                        Add Your Note Here. {":)"}
                      </Text>
                      <View
                        style={{
                          position: "absolute",
                          top: 20,
                          right: 20,
                          elevation: 22,
                        }}
                      >
                        <IconBtn
                          width={12}
                          height={12}
                          icon={icons.noteClose}
                          style={{
                            tintColor: "#fff",
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 2,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                          }}
                          onPress={() => setModalVisible(false)}
                        />
                      </View>
                      <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={{
                          height: 200,
                          width: "100%",
                          textAlignVertical: "top",
                          backgroundColor: "#000",
                          color: "#fff",
                          borderRadius: 20,
                          padding: 25,
                          marginBottom: 41,
                        }}
                        value={note}
                        onChangeText={setNote}
                      />
                      <View style={{ flexDirection: "row", gap: 20 }}>
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
                            gap: 11,
                          }}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            setNote("");
                          }}
                        >
                          <Image
                            style={{ tintColor: "#E84142" }}
                            width={12}
                            height={12}
                            source={icons.noteClose}
                          />
                          <Text
                            style={{
                              fontFamily: "SF-Pro-Text-Bold",
                              fontSize: 12.31,
                              color: "#E84142",
                            }}
                          >
                            Cancel
                          </Text>
                        </AnimatedPressable>
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
                            gap: 11,
                          }}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Image
                            style={{ tintColor: "#fff" }}
                            width={10}
                            height={10}
                            source={icons.check}
                          />
                          <Text
                            style={{
                              fontFamily: "SF-Pro-Text-Bold",
                              fontSize: 12.31,
                              color: "#ffffff",
                            }}
                          >
                            Done
                          </Text>
                        </AnimatedPressable>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              </Animated.View>
            </Modal>
          ) : null}
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              display: showButtons ? "flex" : "none",
            }}
          >
            <AnimatedPressable
              entering={FadeIn.delay(200).duration(300)}
              style={{
                position: "absolute",
                display: "block",
                width: 85,
                height: 85,
                borderRadius: 85,
                backgroundColor: "#696969",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 20,
                bottom: 65,
                left: showDone && amount !== "" ? 104 : "auto",
              }}
              onPress={() => {
                if (formComplete) {
                  setFormComplete(false);
                } else {
                  setCryptoWindow(false);
                  navigation.goBack();
                }
              }}
            >
              <Image
                width={30}
                height={30}
                source={icons.close}
                style={{ tintColor: "#000" }}
              />
            </AnimatedPressable>
            <AnimatedPressable
              entering={SlideInRight.delay(200).duration(400)}
              style={{
                position: "absolute",
                display: showDone && amount !== "" ? "block" : "none",
                width: 85,
                height: 85,
                borderRadius: 86,
                backgroundColor: "#00FFA3",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 20,
                bottom: 65,
                right: 104,
              }}
              onPress={() => {
                if (formComplete) {
                  console.log("done with the form");
                  // setRequest(true);
                } else {
                  if (amount === "") {
                    Toast.show("Please enter an amount.", {
                      type: "danger",
                      placement: "top",
                      duration: 3000,
                      animationType: "slide-in",
                    });
                  } else {
                    setFormComplete(true);
                  }
                }
              }}
            >
              <Image
                width={30}
                height={30}
                source={icons.done}
                style={{ tintColor: "#000" }}
              />
            </AnimatedPressable>
          </View>
        </View>
      </Animated.View>
    </MainLayout>
  );
};

export default Receive;
