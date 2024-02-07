import {View, Pressable} from 'react-native';
import React from 'react';
import TabIcon from './TabIcon';
import {icons} from '../../constants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from '../globalStyles';
// import {NFCReader} from '.';

const PannedBottomBar = ({navigation}) => {
  return (
    <Pressable style={styles.swipeableButton}>
      <Swipeable>
        <View>
          <TabIcon icon={icons.aurayaLogo} label="Pay" isPay />
        </View>
      </Swipeable>
    </Pressable>

    // <PanGestureHandler onGestureEvent={handleSwipe}>
    //   <View
    // style={}>
    //     <View>
    //       <TabIcon icon={icons.qr} label="Pay with QR" width={29} height={29} />
    //     </View>

    //     <TabIcon icon={icons.nfc} width={28} height={29} label="Pay with NFC" />
    //   </View>
    // </PanGestureHandler>
  );
};

export default PannedBottomBar;
