import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";
import Animated, { FadeIn } from "react-native-reanimated";
// import CategoryApi from "../../apis/CategoryApi";
import ProductApi from "../../apis/ProductApi";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.categories);
  const { items: itemsProduct } = useSelector((state) => state.products);

  // const getCategories = async () => {
  //   await CategoryApi.getCategories();
  // };

  const getProducts = async (query = "") => {
    await ProductApi.getProducts(query);
  };

  useEffect(() => {
    // getCategories();
    getProducts();
  }, []);

  //   console.log("ALSKALKSLAKSA: ", itemsProduct);

  //   console.log("USER: ", user);

  return (
    <View className="flex-1 bg-white">
      <View className="px-3 mt-3 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-neutral-700">
          <Text className="text-[#255bff]">ENIGMA</Text> SHOP
        </Text>
        <View className="flex-row justify-center items-center gap-x-1">
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons name="cart-outline" size={24} color="black" />
        </View>
      </View>
      <PagerView className="flex-[0.66]" initialPage={0}>
        <Animated.View
          entering={FadeIn.delay(100)}
          className="p-3 bg-[#255bfffd] m-3 h-48 rounded-2xl flex-row justify-between items-center"
          key="1"
        >
          <View className="gap-2">
            <Text className="text-lg text-white font-bold">NEW COLLECTION</Text>
            <Text className="text-2xl text-white font-bold">45% OFF</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-neutral-700 w-[88px] p-2 rounded-lg"
            >
              <Text className="text-white text-sm font-bold text-center">
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/carousel.png")}
            className="h-48 w-44"
          />
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(100)}
          className="p-3 bg-[#255bfffd] m-3 h-48 rounded-2xl flex-row justify-between items-center"
          key="2"
        >
          <View className="gap-2">
            <Text className="text-lg text-white font-bold">NEW COLLECTION</Text>
            <Text className="text-2xl text-white font-bold">45% OFF</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-neutral-700 w-[88px] p-2 rounded-lg"
            >
              <Text className="text-white text-sm font-bold text-center">
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/carousel.png")}
            className="h-48 w-44"
          />
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(100)}
          className="p-3 bg-[#255bfffd] m-3 h-48 rounded-2xl flex-row justify-between items-center"
          key="3"
        >
          <View className="gap-2">
            <Text className="text-lg text-white font-bold">NEW COLLECTION</Text>
            <Text className="text-2xl text-white font-bold">45% OFF</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-neutral-700 w-[88px] p-2 rounded-lg"
            >
              <Text className="text-white text-sm font-bold text-center">
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/carousel.png")}
            className="h-48 w-44"
          />
        </Animated.View>
      </PagerView>

      {/* <View className="p-3">
        <Animated.Text
          entering={FadeIn.delay(150)}
          className="mb-4 text-2xl font-bold text-neutral-700"
        >
          Kategori Produk
        </Animated.Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {items &&
            items.map((cat) => (
              <Animated.View key={cat.id} entering={FadeIn.delay(200)}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  className="mr-1.5 bg-[#3466fc] py-2 px-4 rounded-full"
                >
                  <Text className="text-white">{cat.name}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
        </ScrollView>
      </View> */}

      <View className="p-3">
        <Animated.Text
          entering={FadeIn.delay(150)}
          className="mb-3 text-2xl font-bold text-neutral-700"
        >
          Rekomendasi Produk
        </Animated.Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {itemsProduct &&
            itemsProduct.map((item) => (
              <Animated.View
                key={item.id}
                entering={FadeIn.delay(250)}
                className="w-[160px] mr-4 items-center"
              >
                <TouchableOpacity activeOpacity={0.7} className="">
                  <View className="relative">
                    <Image
                      source={
                        item.imageUrl
                          ? { uri: item.imageUrl }
                          : require("../../../assets/imageNotFound.png")
                      }
                      className="w-[160px] h-[160px] rounded-[6px] bg-blue-100"
                    />
                    {/* <Text
                      numberOfLines={1}
                      className="absolute top-0 left-0 px-2 pr-3 py-1 text-sm bg-white border-b border-r border-gray-100 rounded-br-xl font-bold text-neutral-700"
                    >
                      {item.categories[0].name}
                    </Text> */}
                  </View>

                  <View className="mt-1">
                    <Text
                      numberOfLines={1}
                      className="text-lg font-bold text-neutral-700"
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-[16px] font-bold text-[#3466fc]"
                    >
                      Rp {item.price.toLocaleString("id-ID")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
