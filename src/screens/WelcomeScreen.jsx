import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

export default function WelcomeScreen() {

    const navigation = useNavigation()

    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
      setTimeout(() => {
          navigation.replace(isAuthenticated ? "Protected" : "Public")
        }, 2500)
    }, [])

  return (
    <View className="bg-white min-h-screen flex justify-center items-center">
      <Animated.Image entering={FadeIn.delay(100)} source={require("../../assets/enigmaGrow.png")} className="w-72 h-72" />
      <Animated.Text entering={FadeIn.delay(300)} className="font-bold text-3xl text-[#223e90]">Enigma Shop</Animated.Text>
    </View>
  )
}