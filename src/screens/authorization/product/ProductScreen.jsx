import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import ProductApi from "../../../apis/ProductApi";

export default function ProductScreen() {
  const data = useSelector((state) => state.products);
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [queryDebounce] = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const getProducts = async (query = "", page = 1) => {
    await ProductApi.getProducts(query, page);
  };

  useEffect(() => {
    setPage(1);
    getProducts(queryDebounce, 1);
  }, [queryDebounce]);

  const loadMoreProducts = async () => {
    if (loadingMore || data.items.length >= data.total) return;

    setLoadingMore(true);
    await getProducts(queryDebounce, page + 1);
    setPage((prevPage) => prevPage + 1);
    setLoadingMore(false);
  };

  const renderItem = ({ item }) => (
    <Animated.View entering={FadeIn.delay(200)}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", { productId: item.id })
        }
        style={{
          backgroundColor: "white",
          padding: 16,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Image
          source={{
            uri:
              item.imageUrls && item.imageUrls.length > 0
                ? item.imageUrls[0]
                : "https://placehold.co/400x200/png",
          }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginBottom: 8,
          }}
          resizeMode="cover"
        />
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-md text-blue-950 text-ellipsis">
            Stock: {item.stock}
          </Text>
        </View>
        <Text className="mt-2 font-light text-gray-900">
          {item.description}
        </Text>
        <Text className="mt-2 font-bold text-xl text-blue-400">
          Rp {item.price.toLocaleString()}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Animated.Text
        entering={FadeIn.delay(100)}
        className="text-2xl font-bold mb-4 text-center"
      >
        Product List
      </Animated.Text>
      <Animated.View entering={FadeIn.delay(150)}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Cari Product..."
          style={{
            backgroundColor: "#f0f0f0",
            padding: 10,
            borderRadius: 8,
            marginBottom: 16,
            marginHorizontal: 14,
          }}
        />
      </Animated.View>

      <FlatList
        data={data.items}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
    </View>
  );
}
