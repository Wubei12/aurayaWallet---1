import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  aurayaBottombarOption: {
    color: 'white',
    fontSize: 10,
    lineHeight: 18,
    fontFamily: 'SF-Pro-Text-Bold',
  },
  aurayaBottombarIconOption: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  aurayaBottombarIconImg: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  longPressedButton: {
    height: 93.5, // Change the background color on long press
    width: 92.081,
    borderRadius: 46.75, // Change the background color on long press
  },
  leftAction: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flex: 1,
  },
  swipeableButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  tabBarCustom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 200,
  },
  innerContent: {
    width: 644,
    height: 644,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 55,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    width: '100%',
    height: 420,
    backgroundColor: '#3A3A3A',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: -20,
      height: -20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 55,
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  noteSubmit: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  contnr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2b2b2b',
  },
  circle: {
    backgroundColor: '#f52d56',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileCompContainer: {
    position: 'absolute',
    width: '100%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: '#D9D9D9',
    top: 0,
    borderRadius: 28,
    overflow: 'scroll',
  },
  ProfText: {
    color: '#282828',
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 16,
    lineHeight: 18,
    marginTop: 25,
  },
  bgOverlay: {
    width: '100%',
    height: '11%',
    position: 'absolute',
    bottom: 110,
    zIndex: 1,
    // borderWidth: 1,
    // borderColor: '#fff',
  },
});