import React from 'react';
import {View, Text, Image, StatusBar, TextInput, Pressable} from 'react-native';
import Animated, {FadeInUp, FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();

  return (
    <View className="bg-white h-full w-full">
      <StatusBar status="light" />
      <Image
        className="h-full w-full absolute"
        source={require('../assets/images/bgnice.webp')}
      />
      <View className="h-full w-full flex justify-around pt-35 pb-5">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="font-bold tracking-wider text-5xl text-black/70">
            Signup
          </Animated.Text>
        </View>

        {/* form */}

        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/20 p-5 rounded-2xl w-full">
            <TextInput placeholder="Username" placeholderTextColor={'gray'} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/20 p-5 rounded-2xl w-full">
            <TextInput placeholder="Email" placeholderTextColor={'gray'} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-black/20 p-5 rounded-2xl w-full mb-3">
            <TextInput
              placeholder="Password"
              placeholderTextColor={'gray'}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-black/20 p-5 rounded-2xl w-full mb-10">
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={'gray'}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="w-full">
            <Pressable className="w-full bg-sky-700 p-3 rounded-2xl shadow-2xl">
              <Text className=" text-xl font-bold text-white text-center">
                Signup
              </Text>
            </Pressable>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="flex-row items-center justify-center gap-2">
            <Text>Already have an account?</Text>
            <Pressable onPress={() => navigation.push('Login')}>
              <Text className="text-sky-900">Login</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
