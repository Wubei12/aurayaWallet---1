import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../globalStyles';
import {MainLayout} from '.';
import usePayStore from '../store/store';
import Svg, {RadialGradient, Stop, Circle} from 'react-native-svg';
import {icons} from '../../constants';
import {IconBtn, QRCodeGenerator} from '../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Toast} from 'react-native-toast-notifications';
import Animated, {
  BounceIn,
  Easing,
  FadeIn,
  FadeInLeft,
  FadeOut,
  SlideInDown,
  SlideInRight,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';

const currencyData = [
  {
    label: 'USD',
    symbol: 'USD',
    balance: '40000',
    rate: '1',
    icon: icons.usd,
  },
  {
    label: 'Solana',
    symbol: 'SOL',
    balance: '100000.2',
    rate: '103.17',
    icon: icons.tintSol,
  },
  {
    label: 'Tether USDT',
    symbol: 'USDT',
    balance: '5000.2',
    rate: '1',
    icon: icons.tintUsdt,
  },
  {
    label: 'Ethereum',
    symbol: 'ETH',
    balance: '12000.50',
    rate: '2305.06',
    icon: icons.tintEth,
  },
  {
    label: 'PolkaDot',
    symbol: 'DOT',
    balance: '40056.856',
    rate: '7.87',
    icon: icons.tintPin,
  },
];

const vidSrc = require('../../assets/video/NFC.mp4');

const NFCVidComp = () => {
  return (
    <>
      <Video
        style={{width: 323, height: 194, borderRadius: 20}}
        source={vidSrc}
        resizeMode="cover"
        repeat
        muted
        rate={1.0}
      />
    </>
  );
};
const Swap = () => {
  const {setCryptoWindow, isAuth, setIsTrnsxnError, setIsTrnsxnSuccess} =
    usePayStore();
  // console.log('🚀 isCryptoWindow in Receive:', isCryptoWindow);

  const [showDone, setShowDone] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showLabel, setShowLabel] = useState(false);
  const [currSelected, setCurrSelected] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [balance, setBalance] = useState(null);
  const [rate, setRate] = useState(null);
  const [swapRate, setSwapRate] = useState(null);
  const [icon, setIcon] = useState(null);
  const [swappedIcon, setSwappedIcon] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [amount, setAmount] = useState('');
  const [swappedCurr, setSwappedCurr] = useState('');
  const [swapCurrLogo, setSwapCurrLogo] = useState('');
  const [note, setNote] = useState('');
  const [noteEntered, setNoteEntered] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [swappedModalVisible, setSwappedModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [wait, setWait] = useState(false);
  // const [trnsxnId, setTrnsxnId] = useState('');

  //   const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [method, setMethod] = useState('');

  console.log('🚀 swappedCurr is:', swappedCurr);
  console.log('🚀 rate is:', rate);
  console.log('🚀 swapRate is:', swapRate);
  console.log('🚀 exchange is:', rate / swapRate);
  // console.log('🚀 note entry is:', noteEntered);
  // console.log('🚀 trnsxnId is:', trnsxnId);

  const screenWidth = Dimensions.get('screen').width;
  const formWidth = screenWidth * 0.8;
  const space = screenWidth * 0.02;
  const sideIntrusion = (screenWidth * 0.18) / 2;

  useEffect(() => {
    if (!isAuth) {
      navigation.navigate('Login');
    }
    if (amount === '') {
      setShowDone(false);
    }
    if (note.length === 0) {
      setNoteEntered(false);
      console.log('no note');
    } else {
      setNoteEntered(true);
      console.log('note detected');
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

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const handleCurrencyPress = index => {
    setSelectedIdx(index);
    setShowLabel(true);
  };

  const addSeparator = numberString => {
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
      return text.substring(0, maxLength) + '...';
    }
  };

  function generateRandomId(length) {
    const characters =
      '01234567890123456789012345678901234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }

  const randomId = generateRandomId(12);
  // setTrnsxnId(randomId);

  function getCurrentDate() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(2);

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  const currentDate = getCurrentDate();
  console.log(currentDate);

  return (
    <MainLayout label={'Swap'}>
      <Animated.View
        entering={ZoomIn}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 644,
            height: 644,
            borderRadius: 645,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderWidth: 3,
            borderColor: 'rgba(255,255,255,0.15)',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Svg height="110%" width="110%" style={{zIndex: 100}}>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%">
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
          <View style={[styles.innerContent, {marginTop: 20}]}>
            {wait ? (
              <>
                <Animated.View
                  entering={SlideInRight}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Animatable.Text
                    animation="fadeIn"
                    delay={400}
                    style={{
                      color: '#ffffff',
                      fontSize: 16,
                      marginTop: noteEntered ? 57 : 0,
                      marginBottom: 16,
                      lineHeight: 16,
                      alignSelf: 'center',
                      fontFamily: 'SF-Pro-Text-Bold',
                    }}>
                    Step 3
                  </Animatable.Text>
                  <Animatable.Text
                    animation="fadeIn"
                    delay={550}
                    style={{
                      color: '#ffffff',
                      alignSelf: 'center',
                      fontSize: 24,
                      marginBottom: 16,
                      lineHeight: 24,
                      width: 280,
                      textAlign: 'center',
                      fontFamily: 'SF-Pro-Text-Bold',
                    }}>
                    {method === 'NFC'
                      ? 'Waiting For Payment trough NFC'
                      : 'Waiting For Payment trough QR code'}
                  </Animatable.Text>
                  <Animatable.Text
                    animation="fadeIn"
                    delay={700}
                    style={{
                      color: '#ffffff',
                      fontSize: 14,
                      alignSelf: 'center',
                      marginBottom: 35,
                      lineHeight: 14,
                      width: 280,
                      fontFamily: 'SF-Pro-Text-Regular',
                    }}>
                    Tap the recievers phone or use the QR scanner to complete
                    the transaction.
                  </Animatable.Text>
                  {method === 'QR' ? (
                    <QRCodeGenerator value={amount} />
                  ) : (
                    <NFCVidComp />
                    // <Image width={323} height={194} source={icons.nfcpay} />
                  )}

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
                      {/* {trnsxnId} */}
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
              </>
            ) : (
              <>
                {formComplete ? (
                  <Animated.View
                    entering={SlideInRight}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Animatable.Text
                      animation="fadeIn"
                      delay={400}
                      style={{
                        color: '#ffffff',
                        fontSize: 16,
                        marginTop: noteEntered ? 57 : 0,
                        marginBottom: 16,
                        lineHeight: 16,
                        alignSelf: 'center',
                        fontFamily: 'SF-Pro-Text-Bold',
                      }}>
                      Step 2
                    </Animatable.Text>
                    <Animatable.Text
                      animation="fadeIn"
                      delay={550}
                      style={{
                        color: '#ffffff',
                        alignSelf: 'center',
                        fontSize: 24,
                        marginBottom: 16,
                        lineHeight: 24,
                        fontFamily: 'SF-Pro-Text-Bold',
                      }}>
                      Preview Swap
                    </Animatable.Text>
                    <Animatable.Text
                      animation="fadeIn"
                      delay={700}
                      style={{
                        color: '#ffffff',
                        fontSize: 14,
                        alignSelf: 'center',
                        marginBottom: 35,
                        lineHeight: 14,
                        fontFamily: 'SF-Pro-Text-Regular',
                      }}>
                      Lorem ipsum dolor sit amet.
                    </Animatable.Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 4,
                        alignSelf: 'flex-start',
                        marginBottom: 20,
                      }}>
                      <Animatable.Text
                        animation="zoomIn"
                        duration={500}
                        delay={100}
                        style={{
                          color: 'rgba(111, 111, 111, 0.44)',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'SF-Pro-Text-Bold',
                        }}>
                        Swap
                      </Animatable.Text>
                      <Animatable.Text
                        animation="zoomIn"
                        duration={500}
                        delay={100}
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'SF-Pro-Text-Bold',
                        }}>
                        {currency} ({currSelected})
                      </Animatable.Text>
                    </View>
                    <View
                      style={{
                        width: 272,
                        alignItems: 'center',
                        right: 0,
                        flexDirection: 'row',
                        gap: 12,
                        marginBottom: 7,
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
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {icon !== null ? (
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Text-Regular',
                              fontSize: 14,
                              lineHeight: 18,
                              color: '#fff',
                              bottom: 0,
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
                              bottom: 0,
                            }}>
                            ≈ $ {addSeparator(amount)}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 4,
                        alignSelf: 'flex-start',
                        marginBottom: 20,
                      }}>
                      <Animatable.Text
                        animation="zoomIn"
                        duration={500}
                        delay={100}
                        style={{
                          color: 'rgba(111, 111, 111, 0.44)',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'SF-Pro-Text-Bold',
                        }}>
                        Fort
                      </Animatable.Text>
                      <Animatable.Text
                        animation="zoomIn"
                        duration={500}
                        delay={100}
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'SF-Pro-Text-Bold',
                        }}>
                        {swappedCurr} ({swapCurrLogo})
                      </Animatable.Text>
                    </View>
                    <View
                      style={{
                        width: 272,
                        alignItems: 'center',
                        right: 0,
                        flexDirection: 'row',
                        gap: 12,
                        marginBottom: 7,
                      }}>
                      {icon !== null ? (
                        <Image
                          width={22}
                          height={22}
                          source={swappedIcon}
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
                        {addSeparator(amount * (rate / swapRate))}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}></View>
                    </View>
                    <View style={{width: 311, marginTop: 15, marginBottom: 30}}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Text-Regular',
                              color: '#3F3F3F',
                              fontSize: 13,
                              lineHeight: 22.5,
                            }}>
                            Minimum received
                          </Text>
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255,255,255,0.7)',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 5,
                                color: 'rgba(255,255,255,0.7)',
                              }}>
                              ?
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: '#B8B8B8',
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 12,
                            lineHeight: 22.5,
                          }}>
                          3.5 SOL
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Text-Regular',
                              color: '#3F3F3F',
                              fontSize: 13,
                              lineHeight: 22.5,
                            }}>
                            Price Impact
                          </Text>
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255,255,255,0.7)',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 5,
                                color: 'rgba(255,255,255,0.7)',
                              }}>
                              ?
                            </Text>
                          </View>
                        </View>

                        <Text
                          style={{
                            color: '#B8B8B8',
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 12,
                            lineHeight: 22.5,
                          }}>
                          48.54%
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Text-Regular',
                              color: '#3F3F3F',
                              fontSize: 13,
                              lineHeight: 22.5,
                            }}>
                            Liquidity Provider Fee
                          </Text>
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255,255,255,0.7)',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 5,
                                color: 'rgba(255,255,255,0.7)',
                              }}>
                              ?
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: '#B8B8B8',
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 12,
                            lineHeight: 22.5,
                          }}>
                          0.11 SOL
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: 272,
                        justifyContent: 'space-between',
                        marginBottom: noteEntered ? 27 : 35,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 14,
                            color: 'rgba(111, 111, 111, 0.44)',
                            marginBottom: 1,
                            lineHeight: 18,
                          }}>
                          Payment with {method}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'SF-Pro-Text-Regular',
                            fontSize: 10,
                            color: 'rgba(111, 111, 111, 0.44)',
                            marginBottom: 11,
                            lineHeight: 10,
                          }}>
                          User has selected preffered payment method{' '}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {method === 'QR' ? (
                          <Image
                            width={30}
                            height={30}
                            source={icons.qr}
                            style={{
                              tintColor: '#fff',
                              transform: [
                                {
                                  scale: 0.7,
                                },
                              ],
                            }}
                          />
                        ) : (
                          <Image
                            width={40}
                            height={40}
                            source={icons.nfc}
                            style={{
                              tintColor: '#fff',
                              transform: [
                                {
                                  scale: 0.7,
                                },
                              ],
                            }}
                          />
                        )}
                      </View>
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
                        marginTop: 30,
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
                      Swap Details
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
                      Enter Amount and Select Currency
                    </Animatable.Text>

                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <View
                        style={{
                          height: 74,
                          width: 311,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#000',
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: '#1C1C1C',
                        }}>
                        <TextInput
                          inputMode="numeric"
                          entering={SlideInRight.delay(300).duration(500)}
                          style={{
                            backgroundColor: '#000',
                            position: 'absolute',
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 34.79,
                            lineHeight: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            width: '64%',
                            left: 0,
                            height: '100%',
                            borderRadius: 8,
                            padding: 10,
                            paddingLeft: 15,
                            overflow: 'scroll',
                          }}
                          value={amount}
                          keyboardType="numeric"
                          onChangeText={setAmount}
                          onFocus={() => {
                            setShowButtons(false);
                          }}
                          onSubmitEditing={() => {
                            setShowButtons(true);
                            setShowDone(true);
                          }}
                        />
                        <Pressable
                          style={{
                            flexDirection: 'row',
                            gap: 13,
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            right: 10,
                            height: '100%',
                            width: 50,
                            backgroundColor: '#000',
                          }}
                          onPress={() => setModalVisible(true)}>
                          <Image
                            source={icons.downArrow}
                            width={10}
                            height={5}
                          />
                          {icon !== null && (
                            <Image
                              style={{display: icon === null ? 'none' : 'flex'}}
                              source={icon}
                              width={25}
                              height={20}
                            />
                          )}
                        </Pressable>

                        {amount != 0 ? (
                          rate !== null ? (
                            <View
                              style={{
                                position: 'absolute',
                                width: 120,
                                justifyContent: 'center',
                                borderRadius: 8,
                                overflow: 'scroll',
                                bottom: 7,
                                left: 17,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'SF-Pro-Text-Regular',
                                  color: 'white',
                                  fontSize: 10,
                                  lineHeight: 18,
                                  width: 'auto',
                                }}>
                                ≈ $ {addSeparator(amount * rate)}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                position: 'absolute',
                                height: '100%',
                                width: 100,
                                justifyContent: 'center',
                                borderRadius: 8,
                                overflow: 'scroll',
                                bottom: 0,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'SF-Pro-Text-Regular',
                                  color: 'white',
                                  fontSize: 14,
                                  lineHeight: 18,
                                  backgroundColor: '#000',
                                  width: 'auto',
                                }}>
                                ≈ $ {addSeparator(amount)}
                              </Text>
                            </View>
                          )
                        ) : null}
                      </View>
                      <Animated.View
                        entering={BounceIn.delay(300).springify()}
                        style={{
                          width: 33,
                          height: 33,
                          position: 'absolute',
                          backgroundColor: '#D9D9D9',
                          borderRadius: 17,
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 20,
                        }}>
                        <Image
                          source={icons.swap}
                          style={{
                            tintColor: '#000',
                            transform: [{scale: 0.4}],
                          }}
                        />
                      </Animated.View>
                      <View
                        style={{
                          height: 74,
                          width: 311,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#000',
                          borderRadius: 8,
                          marginTop: 19,
                          borderWidth: 1,
                          borderColor: '#1C1C1C',
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#000',
                            position: 'absolute',
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 34.79,
                            width: '75%',
                            height: 27,
                            borderWidth: 1,
                            overflow: 'scroll',
                            lineHeight: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            left: 0,
                            borderRadius: 8,
                            paddingLeft: 20,
                            display:
                              swapRate === null || rate === null
                                ? 'none'
                                : 'flex',
                          }}>
                          {amount * (rate / swapRate)}
                        </Text>
                        <Pressable
                          style={{
                            flexDirection: 'row',
                            gap: 13,
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            right: 10,
                            height: '100%',
                            width: 50,
                          }}
                          onPress={() => setSwappedModalVisible(true)}>
                          <Image
                            source={icons.downArrow}
                            width={10}
                            height={5}
                          />
                          {swappedIcon !== null && (
                            <Image
                              style={{
                                display: swappedIcon === null ? 'none' : 'flex',
                              }}
                              source={swappedIcon}
                              width={25}
                              height={20}
                            />
                          )}
                        </Pressable>
                      </View>
                    </View>

                    <View style={{width: 311, marginTop: 15, marginBottom: 30}}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Text-Regular',
                              color: '#3F3F3F',
                              fontSize: 13,
                              lineHeight: 22.5,
                            }}>
                            Minimum received
                          </Text>
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255,255,255,0.7)',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 5,
                                color: 'rgba(255,255,255,0.7)',
                              }}>
                              ?
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: '#B8B8B8',
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 12,
                            lineHeight: 22.5,
                          }}>
                          3.5 SOL
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Text-Regular',
                              color: '#3F3F3F',
                              fontSize: 13,
                              lineHeight: 22.5,
                            }}>
                            Price Impact
                          </Text>
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255,255,255,0.7)',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 5,
                                color: 'rgba(255,255,255,0.7)',
                              }}>
                              ?
                            </Text>
                          </View>
                        </View>

                        <Text
                          style={{
                            color: '#B8B8B8',
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 12,
                            lineHeight: 22.5,
                          }}>
                          48.54%
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Text-Regular',
                              color: '#3F3F3F',
                              fontSize: 13,
                              lineHeight: 22.5,
                            }}>
                            Liquidity Provider Fee
                          </Text>
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255,255,255,0.7)',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 5,
                                color: 'rgba(255,255,255,0.7)',
                              }}>
                              ?
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: '#B8B8B8',
                            fontFamily: 'SF-Pro-Text-Bold',
                            fontSize: 12,
                            lineHeight: 22.5,
                          }}>
                          0.11 SOL
                        </Text>
                      </View>
                    </View>

                    <Animatable.Text
                      animation="fadeIn"
                      delay={400}
                      style={{
                        color: 'rgba(111, 111, 111, 0.44)',
                        fontSize: 14,
                        lineHeight: 18,
                        marginBottom: 4,
                        fontFamily: 'SF-Pro-Text-Bold',
                        marginTop: 11,
                      }}>
                      Select Transaction Method{' '}
                    </Animatable.Text>
                    <Animatable.Text
                      animation="fadeIn"
                      delay={400}
                      style={{
                        color: 'rgba(111, 111, 111, 0.44)',
                        fontSize: 10,
                        lineHeight: 18,
                        marginBottom: 11,
                        fontFamily: 'SF-Pro-Text-Regular',
                      }}>
                      Select if Transaction goes via QR or NFC{' '}
                    </Animatable.Text>
                    <View
                      style={{flexDirection: 'row', gap: 9, marginBottom: 28}}>
                      <AnimatedPressable
                        entering={ZoomIn.delay(400).duration(100).springify()}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor:
                            method === 'QR'
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(95, 95, 95, 0.1)',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderColor:
                            method === 'QR'
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(95, 95, 95, 0.1)',
                        }}
                        onPress={() => setMethod('QR')}>
                        <Image
                          width={5}
                          height={5}
                          source={icons.qr}
                          style={{
                            tintColor:
                              method === 'QR'
                                ? '#fff'
                                : 'rgba(184, 184, 184, 1)',
                            transform: [{scale: 0.75}],
                          }}
                        />
                      </AnimatedPressable>
                      <AnimatedPressable
                        entering={ZoomIn.delay(600).duration(100).springify()}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor:
                            method === 'NFC'
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(95, 95, 95, 0.1)',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderColor:
                            method === 'NFC'
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(95, 95, 95, 0.1)',
                        }}
                        onPress={() => setMethod('NFC')}>
                        <Image
                          width={17}
                          height={17}
                          source={icons.nfc}
                          style={{
                            tintColor:
                              method === 'NFC'
                                ? '#fff'
                                : 'rgba(184, 184, 184, 1)',
                            transform: [{scale: 0.75}],
                          }}
                        />
                      </AnimatedPressable>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
          {modalVisible ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <AnimatedPressable
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.centeredView}
                // onPress={() => setModalVisible(false)}
              >
                <Animated.View
                  entering={SlideInDown.delay(100)}
                  style={styles.modalView}>
                  <View style={[styles.contnr, StyleSheet.absoluteFillObject]}>
                    <Animated.View
                      entering={SlideInDown}
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
                      <ScrollView
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        contentContainerStyle={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        scrollEnabled>
                        {currencyData.map((item, index) => {
                          return (
                            <AnimatedPressable
                              key={index}
                              entering={FadeIn.delay(200 * index)}
                              style={{
                                width: '100%',
                                height: 80,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor: '#3a3a3a',
                                marginBottom: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 20,
                              }}
                              onPress={() => {
                                setCurrency(item.label);
                                setCurrSelected(item.symbol);
                                setIcon(item.icon);
                                setModalVisible(false);
                                setRate(item.rate);
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  gap: 8,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  style={{tintColor: '#fff'}}
                                  source={item.icon}
                                />
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'SF-Pro-Text-Bold',
                                  }}>
                                  {item.label}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: 12,
                                    fontFamily: 'SF-Pro-Text-Regular',
                                  }}>
                                  $ {item.rate}
                                </Text>
                              </View>
                            </AnimatedPressable>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </Animated.View>
              </AnimatedPressable>
            </Modal>
          ) : null}
          {swappedModalVisible ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={swappedModalVisible}
              onRequestClose={() => {
                setSwappedModalVisible(!swappedModalVisible);
              }}>
              <AnimatedPressable
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.centeredView}>
                <Animated.View
                  entering={SlideInDown.delay(100)}
                  style={styles.modalView}>
                  <View style={[styles.contnr, StyleSheet.absoluteFillObject]}>
                    <Animated.View
                      entering={SlideInDown}
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
                      <ScrollView
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        contentContainerStyle={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        scrollEnabled>
                        {currencyData.map((item, index) => {
                          return (
                            <AnimatedPressable
                              pointerEvents={'box-only'}
                              key={index}
                              entering={FadeIn.delay(200 * index)}
                              style={{
                                width: '100%',
                                height: 80,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor: '#3a3a3a',
                                marginBottom: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 20,
                              }}
                              onPress={() => {
                                setSwappedCurr(item.label);
                                setSwapCurrLogo(item.symbol);
                                setSwappedIcon(item.icon);
                                setSwappedModalVisible(false);
                                setSwapRate(item.rate);
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  gap: 8,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  style={{tintColor: '#fff'}}
                                  source={item.icon}
                                />
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'SF-Pro-Text-Bold',
                                  }}>
                                  {item.label}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: 12,
                                    fontFamily: 'SF-Pro-Text-Regular',
                                  }}>
                                  $ {item.rate}
                                </Text>
                              </View>
                            </AnimatedPressable>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </Animated.View>
              </AnimatedPressable>
            </Modal>
          ) : null}
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              display: showButtons ? 'flex' : 'none',
              bottom: 40,
            }}>
            <AnimatedPressable
              entering={FadeIn.delay(200).duration(300)}
              style={{
                position: 'absolute',
                display: 'block',
                width: 85,
                height: 85,
                borderRadius: 85,
                backgroundColor: '#696969',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 20,
                bottom: 20,
                left: showDone && amount !== '' ? 104 : 'auto',
              }}
              onPress={() => {
                if (wait) {
                  setWait(false);
                } else {
                  if (formComplete) {
                    setFormComplete(false);
                  }
                }

                if (!wait && !formComplete) {
                  navigation.goBack();
                  setCryptoWindow(false);
                }
              }}>
              <Image
                width={30}
                height={30}
                source={icons.close}
                style={{tintColor: '#000'}}
              />
            </AnimatedPressable>
            <AnimatedPressable
              entering={SlideInRight.delay(200).duration(400)}
              style={{
                position: 'absolute',
                display: showDone && amount !== '' ? 'block' : 'none',
                width: 85,
                height: 85,
                borderRadius: 86,
                backgroundColor: '#00FFA3',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 20,
                bottom: 20,
                right: 104,
              }}
              onPress={() => {
                if (wait) {
                  setCryptoWindow(false);
                  // setTransactionId(randomId);
                  setIsTrnsxnSuccess(true);
                  // setIsTrnsxnError(true);
                  navigation.navigate('Home');
                } else if (formComplete) {
                  console.log('done with the form');
                  setWait(true);
                } else {
                  if (method === '') {
                    Toast.show('Please select a transaction method.', {
                      type: 'custom',
                      placement: 'bottom',
                      duration: 3000,
                      animationType: 'zoom-in',
                    });
                  } else {
                    setFormComplete(true);
                  }
                }
              }}>
              <Image
                width={50}
                height={50}
                source={icons.swap}
                style={{tintColor: '#000', transform: [{scale: 0.8}]}}
              />
            </AnimatedPressable>
          </View>
        </View>
      </Animated.View>
    </MainLayout>
  );
};

export default Swap;
