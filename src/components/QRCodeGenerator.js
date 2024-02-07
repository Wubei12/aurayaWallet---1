import React from 'react';
import {View} from 'react-native';
import Animated, {ZoomIn} from 'react-native-reanimated';
import QRCode from 'react-qr-code';

const QRCodeGenerator = ({value}) => {
  return (
    <Animated.View entering={ZoomIn}>
      <QRCode
        size={200}
        style={{
          height: 'auto',
          maxWidth: '100%',
          width: '100%',
          borderRadius: 12,
        }}
        value={value}
      />
    </Animated.View>
  );
};

export default QRCodeGenerator;
