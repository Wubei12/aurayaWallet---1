/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import {
  Home,
  Pay,
  Receive,
  Transactions,
  Portfolio,
  Swap,
  Sell,
  Send,
} from './src/screens';
import {Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LoginScreen from './src/screens/LoginScreen';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import EncryptedStorage from 'react-native-encrypted-storage';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
  OpenloginUserInfo,
} from '@web3auth/react-native-sdk';
import RPC from './ethersRPC';

const scheme = 'aurayaWalletApp'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://auth`;

const clientId =
  'BOec3ROYtCM_EDpx6rPgb9c0S78IpfcQbmgZufVgWOLe66dVITkTcYTkF-5VXeQv8H6xGH-1kc7oy8NG1HvXm3A';

const web3auth = new Web3Auth(WebBrowser, EncryptedStorage, {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET, // or other networks
  loginConfig: {
    jwt: {
      verifier: 'auth0-web3-project',
      typeOfLogin: 'jwt',
      clientId: "Y6AAXK1zHU1sZT8c5vtIBT2UJguo3yuH",
    },
  },
});


function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  const [userInfo, setUserInfo] = useState<OpenloginUserInfo | undefined>();
  const [key, setKey] = useState<string | undefined>('');
  const [console, setConsole] = useState<string>('');
  

   const login = async () => {
    try {
      setConsole('Logging in');

      await web3auth.login({
        loginProvider: "jwt",
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: 'default',
        extraLoginOptions: {
          domain: 'https://dev-t0mk1pdc8vqaqz46.us.auth0.com',
          verifierIdField: 'sub',
        },
      });

      setUserInfo(web3auth.userInfo());
      setKey(web3auth.privKey);
    } catch (e: any) {
      throw new Error(e.message)
    }
  };

    const logout = async () => {
    if (!web3auth) {
      setConsole('Web3auth not initialized');
      return;
    }

    setConsole('Logging out');
    await web3auth.logout();

    if (!web3auth.privKey) {
      setUserInfo(undefined);
      setKey('');
      uiConsole('Logged out');
    }
  };

  useEffect(() => {
      const init = async () => {
      await web3auth.init();
      if (web3auth?.privKey) {
        setUserInfo(web3auth.userInfo());
        setKey(web3auth.privKey);
      }
    };
    init();
  }, [])

  const getChainId = async () => {
    setConsole('Getting chain id');
    const networkDetails = await RPC.getChainId();
    uiConsole(networkDetails);
  };

  const getAccounts = async () => {
    if (!key) {
      setConsole('User not logged in');
      return;
    }
    setConsole('Getting account');
    const address = await RPC.getAccounts(key);
    uiConsole(address);
  };
  const getBalance = async () => {
    if (!key) {
      setConsole('User not logged in');
      return;
    }
    setConsole('Fetching balance');
    const balance = await RPC.getBalance(key);
    uiConsole(balance);
  };
  const sendTransaction = async () => {
    if (!key) {
      setConsole('User not logged in');
      return;
    }
    setConsole('Sending transaction');
    const tx = await RPC.sendTransaction(key);
    uiConsole(tx);
  };
  const signMessage = async () => {
    if (!key) {
      setConsole('User not logged in');
      return;
    }
    setConsole('Signing message');
    const message = await RPC.signMessage(key);
    uiConsole(message);
  };

  const uiConsole = (...args: unknown[]) => {
    setConsole(JSON.stringify(args || {}, null, 2) + '\n\n\n\n' + console);
  };

   const loggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Get User Info" onPress={() => uiConsole(userInfo)} />
      <Button title="Get Chain ID" onPress={() => getChainId()} />
      <Button title="Get Accounts" onPress={() => getAccounts()} />
      <Button title="Get Balance" onPress={() => getBalance()} />
      <Button title="Send Transaction" onPress={() => sendTransaction()} />
      <Button title="Sign Message" onPress={() => signMessage()} />
      <Button title="Get Private Key" onPress={() => uiConsole(key)} />
      <Button title="Log Out" onPress={logout} />
    </View>
  );

    const unloggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Login with Web3Auth" onPress={login} />
    </View>
  );

  return (
    <View style={styles.container}>
      {key ? loggedInView : unloggedInView}
      <View style={styles.consoleArea}>
        <Text style={styles.consoleText}>Console: </Text>
        <ScrollView style={styles.console}>
          <Text>{console}</Text>
        </ScrollView>
      </View>
    </View> 

    // <ToastProvider>
    //   <GestureHandlerRootView style={{flex: 1}}>
    //     <SafeAreaView style={{flex: 1}}>
    //       <NavigationContainer>
    //         <Stack.Navigator
    //           initialRouteName="Login"
    //           screenOptions={{
    //             headerShown: false,
    //             animation: 'slide_from_right',
    //             animationDuration: 1500,
    //             navigationBarHidden: true,
    //           }}>
    //           <Stack.Screen name="Home" component={Home} />
    //           <Stack.Screen name="Login" component={LoginScreen} />
    //           <Stack.Screen name="Receive" component={Receive} />
    //           <Stack.Screen name="Swap" component={Swap} />
    //           <Stack.Screen name="Transactions" component={Transactions} />
    //           <Stack.Screen name="Portfolio" component={Portfolio} />
    //           <Stack.Screen name="Sell" component={Sell} />
    //           <Stack.Screen name="Pay" component={Pay} />
    //           <Stack.Screen name="Send" component={Send} />
    //         </Stack.Navigator>
    //       </NavigationContainer>
    //     </SafeAreaView>
    //   </GestureHandlerRootView>
    // </ToastProvider>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },
  consoleArea: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    color: '#ffffff',
    padding: 10,
    width: Dimensions.get('window').width - 60,
  },
  consoleText: {
    padding: 10,
  },
  buttonArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
});

export default App;
