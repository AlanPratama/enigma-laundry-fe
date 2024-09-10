import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import AuthApi from "../apis/AuthApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("superadmin1");
  const [password, setPassword] = useState("SuperAdmin123!");
  const { error } = useSelector((state) => state.auth);

  // superadmin1
  // SuperAdmin123!

  const navigate = useNavigation();

  const handleLogin = async () => {
    try {
      const res = await AuthApi.login({
        username,
        password,
      });

      if (error) {
        console.log("error");
        Toast.show({
          type: "error",
          text1: "Login Gagal",
          text2: "Username atau Password salah!",
          text1Style: {
            fontSize: 16,
            color: "#262626",
          },
          text2Style: {
            fontSize: 14,
            color: "#262626",
          },
        });
      } else {
        navigate.replace("Welcome");
      }
    } catch (error) {
      console.log("LoginScreen Err: ", error);
    }
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <View className="bg-white min-h-screen flex justify-center items-center">
        <Toast position="top" />
        <Animated.View
          entering={FadeIn.delay(200)}
          className="p-4 my-4 bg-white rounded-full"
        >
          <Image
            source={require("../../assets/welcome.png")}
            alt="Enigma Shop"
            className="h-64 w-64 rounded-full"
          />
        </Animated.View>

        <View className=" w-full px-8">
          <Animated.Text
            entering={FadeIn.delay(300)}
            className="text-2xl text-[#223e90] font-bold"
          >
            Silahkan Login!
          </Animated.Text>
          <Animated.View entering={FadeIn.delay(400)}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Masukkan username..."
              className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2"
            />
          </Animated.View>
          <Animated.View entering={FadeIn.delay(500)} className="relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Masukkan password..."
              className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2"
            />
            <View className="absolute right-3 top-6">
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#223e90"
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
          </Animated.View>
          <Animated.View entering={FadeIn.delay(600)}>
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-[#314ea7] border-2 border-gray-100 rounded-lg py-3 my-2"
              activeOpacity={0.7}
            >
              <Text className="text-center font-bold text-[#fff]">Login</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeIn.delay(700)}
            className="mt-2 flex justify-start items-center flex-row"
          >
            <Text className="text-[#223e90]">Belum Punya Akun? </Text>
            <TouchableOpacity onPress={() => navigate.navigate("Register")}>
              <Text className="text-[#223e90] font-bold">Register</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
