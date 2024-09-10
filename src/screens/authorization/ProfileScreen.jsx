import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AuthApi from '../../apis/AuthApi';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { user } = useSelector((state) => state.auth)
  const navigation = useNavigation()

  // console.log("USER: ", user);
  

  const handleLogout = async () => {
    try {
      await AuthApi.logout()
      console.log("Berhasil logout");
      navigation.replace("Welcome")
    } catch (error) {
      console.log("HomeScreen Err: ", error);
    }
  }

  return (
    <View className="bg-white min-h-screen">
      <Animated.View entering={FadeIn.delay(100)} className="bg-[#223e90] rounded-b-full w-full h-96 fixed -top-[24%] flex justify-end items-center">
        <View className="w-36 h-36 absolute -bottom-[15%] border border-gray-200 rounded-full">
          <Animated.Image entering={FadeIn.delay(150)} source={{ uri: user.profilePictureUrl ? user.profilePictureUrl : "https://tse2.mm.bing.net/th?id=OIP.l8N4H5EfKyEhQNqOelX49AHaHa&pid=Api&P=0&h=220" }}  className="w-full h-full rounded-full" />
          <Animated.Text entering={FadeIn.delay(200)} className="text-center font-bold text-neutral-700 mt-4 text-xl">{user.name}</Animated.Text>
        </View>
      </Animated.View>

      <View className="px-3">
        <Animated.View entering={FadeIn.delay(250)}>
          <TouchableOpacity activeOpacity={0.5} className="mt-2 border-2 border-gray-200 flex flex-row justify-start items-center py-3.5 px-3.5 rounded-full">
            <Ionicons name='albums-outline' size={24} color='#223e90' />
            <Text className="text-lg font-normal text-neutral-800 ml-2">Produk</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(300)}>
          <TouchableOpacity activeOpacity={0.5} className="mt-2 border-2 border-gray-200 flex flex-row justify-start items-center py-3.5 px-3.5 rounded-full">
            <Ionicons name='cart-outline' size={24} color='#223e90' />
            <Text className="text-lg font-normal text-neutral-800 ml-2">Keranjang</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(350)}>
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.5} className="mt-2 border-2 border-gray-200 flex flex-row justify-start items-center py-3.5 px-3.5 rounded-full">
            <Ionicons name='exit-outline' size={24} color='#223e90' />
            <Text className="text-lg font-normal text-neutral-800 ml-2">Logout</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
}
