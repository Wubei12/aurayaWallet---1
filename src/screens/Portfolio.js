import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { MainLayout } from ".";
import { Chart, FAB } from "../components";
import { LinearGradient } from "react-native-linear-gradient";
import usePayStore from "../store/store";
import { icons } from "../../constants";

const Ape1 = require("../../assets/images/Ape-1.png");
const Ape2 = require("../../assets/images/Ape-2.jpg");
const Ape3 = require("../../assets/images/Ape-3.png");
const Ape4 = require("../../assets/images/Ape-4.png");
const Ape5 = require("../../assets/images/Ape-5.jpg");
const Ape6 = require("../../assets/images/Ape-6.png");
const Ape7 = require("../../assets/images/Ape-7.png");
const BTCoin = require("../../assets/images/bitcoin(1).png");
const Ethereum = require("../../assets/images/ethereum.png");

const Portfolio = () => {
  const { balance } = usePayStore();

  const addSeparator = (numberString) => {
    const number = parseFloat(numberString);

    if (!isNaN(number)) {
      return number.toLocaleString();
    }

    return numberString;
  };
  return (
    <MainLayout label={"Portfolio"}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Chart />
        <View
          style={{
            flexDirection: "row",
            gap: 7,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22.42,
              fontFamily: "SF-Pro-Text-Regular",
              color: "white",
            }}
          >
            $
          </Text>
          <Text
            style={{
              fontSize: 35.6,
              fontFamily: "SF-Pro-Text-Bold",
              color: "white",
            }}
          >
            {addSeparator(balance)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 7,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.up}
            style={{ tintColor: "#00FFA3", width: 21.11, height: 12 }}
          />
          <Text
            style={{
              fontSize: 35.6,
              fontFamily: "SF-Pro-Text-Bold",
              color: "#00FFA3",
            }}
          >
            3.54%
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            lineHeight: 12,
            fontFamily: "SF-Pro-Text-Regular",
            color: "#fff",
          }}
        >
          Daily PNL +335.56
        </Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 31,
            width: "100%",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "SF-Pro-Text-Bold",
                color: "#fff",
                marginBottom: 3,
              }}
            >
              My Tokens
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                fontFamily: "SF-Pro-Text-Regular",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 3,
              }}
            >
              Daily PNL +335.56
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.up}
              style={{ tintColor: "#00FFA3", width: 23.08, height: 13.85 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: "SF-Pro-Text-Bold",
                color: "#00FFA3",
              }}
            >
              3.54%
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 20,
            maxHeight: 140,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: 230,
              height: 130,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              paddingVertical: 10,
              paddingHorizontal: 11,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 30,
                flexDirection: "row",
                gap: 7,
                alignItems: "center",
                justifyContent: "flex-start",
                marginBottom: 14,
              }}
            >
              <View
                style={{
                  width: 19,
                  height: 19,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "orange",
                  padding: 2,
                }}
              >
                <Image
                  source={BTCoin}
                  style={{
                    tintColor: "#fff",
                    transform: [{ scale: 0.6 }],
                  }}
                  width={12}
                  height={12}
                />
              </View>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "SF-Pro-Text-Regular",
                  fontSize: 12,
                  lineHeight: 18,
                }}
              >
                Bitcoin
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.up}
                  style={{ tintColor: "#00FFA3", width: 11.07, height: 6.64 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "SF-Pro-Text-Bold",
                    color: "#00FFA3",
                  }}
                >
                  3.54%
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                fontFamily: "SF-Pro-Text-Regular",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Your Balance
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  lineHeight: 28,
                  fontFamily: "SF-Pro-Text-Bold",
                  color: "#fff",
                  height: "100%",
                  textAlignVertical: "bottom",
                }}
              >
                0.05645564
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 18,
                  fontFamily: "SF-Pro-Text-Regular",
                  color: "#fff",
                  height: "100%",
                  textAlignVertical: "bottom",
                }}
              >
                BTC
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 18,
                  fontFamily: "SF-Pro-Text-Bold",
                  color: "rgba(255,255,255,0.5)",
                  height: "100%",
                  textAlignVertical: "bottom",
                }}
              >
                ≈ $ 5,864.07
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 18,
                  fontFamily: "SF-Pro-Text-Regular",
                  color: "rgba(255,255,255,0.5)",
                  height: "100%",
                  textAlignVertical: "bottom",
                }}
              >
                +$366.45
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 230,
              height: 130,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              paddingVertical: 10,
              paddingHorizontal: 11,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 30,
                flexDirection: "row",
                gap: 7,
                alignItems: "center",
                justifyContent: "flex-start",
                marginBottom: 14,
              }}
            >
              <View
                style={{
                  width: 19,
                  height: 19,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#82B8FF",
                  padding: 2,
                }}
              >
                <Image
                  source={Ethereum}
                  style={{
                    transform: [{ scale: 0.8 }],
                  }}
                  width={12}
                  height={12}
                />
              </View>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "SF-Pro-Text-Regular",
                  fontSize: 12,
                  lineHeight: 18,
                }}
              >
                Ethereum
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.up}
                  style={{ tintColor: "#00FFA3", width: 11.07, height: 6.64 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "SF-Pro-Text-Bold",
                    color: "#00FFA3",
                  }}
                >
                  3.54%
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                fontFamily: "SF-Pro-Text-Regular",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Your Balance
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  lineHeight: 28,
                  fontFamily: "SF-Pro-Text-Bold",
                  color: "#fff",
                  height: "100%",
                  textAlignVertical: "bottom",
                }}
              >
                2.3564
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 18,
                  fontFamily: "SF-Pro-Text-Regular",
                  color: "#fff",
                  height: "100%",
                  textAlignVertical: "bottom",
                }}
              >
                ETH
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 18,
                  fontFamily: "SF-Pro-Text-Bold",
                  color: "rgba(255,255,255,0.5)",
                  height: "100%",
                  textAlignVertical: "bottom",
                }}
              >
                ≈ $ 3,471.07
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 18,
                  fontFamily: "SF-Pro-Text-Regular",
                  color: "rgba(255,255,255,0.5)",
                  height: "100%",
                  textAlignVertical: "bottom",
                }}
              >
                +$203.45
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 230,
              height: 130,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
            }}
          ></View>
          <View
            style={{
              width: 230,
              height: 130,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
            }}
          ></View>
          <View
            style={{
              width: 230,
              height: 130,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
            }}
          ></View>
        </ScrollView>
        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 31,
            width: "100%",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "SF-Pro-Text-Bold",
                color: "#fff",
              }}
            >
              My NFTs
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                fontFamily: "SF-Pro-Text-Regular",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Daily PNL +335.56
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.up}
              style={{ tintColor: "#00FFA3", width: 23.08, height: 13.85 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: "SF-Pro-Text-Bold",
                color: "#00FFA3",
              }}
            >
              3.54%
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 20,
            maxHeight: 120,
            marginBottom: 85,
          }}
        >
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              borderWidth: 2.34,
              borderColor: "#343434",
            }}
          >
            <Image
              source={Ape1}
              width={107}
              height={107}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
            />
          </View>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              borderWidth: 2.34,
              borderColor: "#343434",
            }}
          >
            <Image
              source={Ape2}
              width={107}
              height={107}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
            />
          </View>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              borderWidth: 2.34,
              borderColor: "#343434",
            }}
          >
            <Image
              source={Ape3}
              width={107}
              height={107}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
            />
          </View>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              borderWidth: 2.34,
              borderColor: "#343434",
            }}
          >
            <Image
              source={Ape4}
              width={107}
              height={107}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
            />
          </View>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              borderWidth: 2.34,
              borderColor: "#343434",
            }}
          >
            <Image
              source={Ape5}
              width={107}
              height={107}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
            />
          </View>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              borderWidth: 2.34,
              borderColor: "#343434",
            }}
          >
            <Image
              source={Ape6}
              width={107}
              height={107}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
            />
          </View>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 12,
              backgroundColor: "#141414",
              marginLeft: 10,
              borderWidth: 2.34,
              borderColor: "#343434",
            }}
          >
            <Image
              source={Ape7}
              width={107}
              height={107}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
            />
          </View>
        </ScrollView>
      </View>
      <FAB />
    </MainLayout>
  );
};

export default Portfolio;
