import { View, Text } from "react-native";
import React, { useEffect } from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

const vidSrc = require("../../assets/video/NFC.mp4");

const NFCVidComp = () => {
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn("Tag found", tag);
      const result = await NfcManager.ndefHandler.getNdefMessage();
      console.log("🚀 ~ readNdef ~ result:", result);
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    if (hasNfc) {
      readNdef();
    }
  });
  if (!hasNfc) {
    return null;
  } else if (hasNfc) {
    return (
      <>
        <Video
          style={{ width: 323, height: 194, borderRadius: 20 }}
          source={vidSrc}
          resizeMode="cover"
          repeat
          muted
          rate={1.0}
        />
      </>
    );
  }
};

export default NFCVidComp;
