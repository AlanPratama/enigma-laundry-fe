import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Share,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { addProduct } from "../../../redux/cart/cartSlice";
import store from "../../../redux/store";
import PagerView from "react-native-pager-view";
import Animated, { FadeIn } from "react-native-reanimated";

export default function ProductDetail({ route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const { products: cartProduct } = useSelector((state) => state.cart);
  const [isOnCart, setIsOnCart] = React.useState(false);
  const navigation = useNavigation();

  const { productId } = route.params;
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === productId)
  );

  const checkProduct = () => {
    const isProductOnCart = cartProduct.find(
      (product) => product.id == productId
    );
    setIsOnCart(isProductOnCart);
  };

  const addedToCart = () => {
    store.dispatch(addProduct(product));
    setIsOnCart(true);
    Toast.show({
      type: "success",
      text1: "Sukses",
      text2: "Berhasil menambahkan ke keranjang!",
      text1Style: {
        fontSize: 16,
        color: "#262626",
      },
      text2Style: {
        fontSize: 14,
        color: "#262626",
      },
    });
  };

  React.useEffect(() => {
    checkProduct();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={[product]}
          renderItem={({ item }) => (
            <ProductDetailComponent
              product={item}
              setIsOnCart={setIsOnCart}
              isOnCart={isOnCart}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View className="fixed -mb-20">
        <View className="flex-row justify-around space-x-4 h-fit px-8 py-2 bg-white border-t border-t-gray-300">
          <Pressable
            className="p-3 my-auto border bg-white border-blue-600 w-1/2 rounded-lg"
            onPress={() => {
              isOnCart ? navigation.navigate("Cart") : addedToCart();
            }}
          >
            <Text className="text-blue-600 text-center font-bold">
              {isOnCart ? "Already on Cart" : "+ Add to Cart"}
            </Text>
          </Pressable>
          <Pressable
            className="bg-blue-600 border border-blue-600 p-3 my-auto w-1/2 rounded-lg"
            onPress={() => {
              !isOnCart && addedToCart();
              navigation.navigate("Confirmation");
            }}
          >
            <Text className="text-white text-center font-bold">Buy Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function ProductDetailComponent({ product, setIsOnCart }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [readMore, setIsReadMore] = React.useState(false);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Cek produk ini: ${
          product.name
        }\nHarga: Rp ${product.price.toLocaleString()}\n${
          product.description
        }\n\nHanya di Enigma Shop`,
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //   } else {
      //   }
      // } else if (result.action === Share.dismissedAction) {
      // }
    } catch (error) {
      alert(error.message);
      Toast.show({
        type: "error",
        text1: "Terjadi kesalahan",
        text2: error.message,
        text1Style: {
          fontSize: 16,
          color: "#262626",
        },
        text2Style: {
          fontSize: 14,
          color: "#262626",
        },
      });
    }
  };

  return (
    <View className="flex flex-1 h-full">
      <View className="items-center">
        {product.imageUrls ? (
          <>
            <PagerView
              className="w-full h-80"
              initialPage={0}
              onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
              {product.imageUrls.map((image, index) => {
                return (
                  <Animated.View entering={FadeIn.delay(100)} key={index}>
                    <Image
                      source={{
                        uri: image,
                      }}
                      className="h-full w-full"
                    />
                  </Animated.View>
                );
              })}
            </PagerView>

            <View className="flex-row justify-center fixed bottom-8 z-10">
              {product.imageUrls.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${
                    index === currentPage ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </View>
          </>
        ) : (
          <View className="w-full h-60 bg-gray-300 justify-center items-center">
            <Text className="text-lg font-bold text-gray-500">
              Tidak ada gambar
            </Text>
          </View>
        )}
      </View>

      <View className="rounded-t-3xl -mt-6 p-6 flex flex-col flex-1 bg-white">
        <View className="h-fit mb-12">
          {/* <Text className="text-gray-400">{product.categories[0]?.name}</Text> */}
          <View className="flex flex-row justify-between">
            <Text className="text-2xl font-bold text-black w-3/4">
              {product.name}
            </Text>
            <View className="flex flex-row gap-2">
              <Pressable className="my-auto" onPress={handleShare}>
                <Ionicons name="share-social-outline" color="black" size={24} />
              </Pressable>
              <Pressable className="my-auto" onPress={() => setLiked(!liked)}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  color={liked ? "red" : "black"}
                  size={24}
                />
              </Pressable>
            </View>
          </View>
          <Text className="text-xl font-bold text-blue-600">
            Rp {product.price.toLocaleString()}
          </Text>
          <Text
            className="text-gray-400 mt-2"
            numberOfLines={readMore ? 999 : 5}
          >
            {product.description ? product.description : "Tidak ada deskripsi"}
          </Text>
          <Pressable onPress={() => setIsReadMore(!readMore)}>
            {product.description && (
              <Text className="text-gray-600">
                {readMore ? "Show Less" : "Read More"}
              </Text>
            )}
          </Pressable>
          <Text className="text-sm text-gray-500 mt-2">
            Stok: <Text className="text-red-400">{product.stock}</Text>
          </Text>
        </View>

        <View className="w-full">
          <View className="flex flex-row">
            <Text className="text-2xl font-bold mb-2 w-1/2">Reviews</Text>
            <View className="flex flex-col w-1/2 items-end">
              <Text className="font-bold text-xl">4.6</Text>
              <Text className="flex flex-row">
                <Ionicons name="star" color="orange" size={20} />
                <Ionicons name="star" color="orange" size={20} />
                <Ionicons name="star" color="orange" size={20} />
                <Ionicons name="star" color="orange" size={20} />
                <Ionicons name="star-half" color="orange" size={20} />
              </Text>
              <Text className="text-gray-400">100 Reviews</Text>
            </View>
          </View>

          <View className="mt-4 w-full space-y-4">
            <View className="border-b-gray-400 border-b pb-4">
              <View className="flex flex-row space-x-2 mb-1">
                <Image
                  className="h-10 w-10 my-auto rounded-full"
                  resizeMode="cover"
                  source={{
                    uri: "https://www.shutterstock.com/image-photo/handsome-curly-black-man-tshirt-600nw-1308959878.jpg",
                  }}
                />
                <View className="-space-y-2">
                  <Text className="font-bold text-lg">Alan Login</Text>
                  <Text className="font-light text-xs">01/01/1970</Text>
                </View>
              </View>
              <View className="flex flex-row space-x-2">
                <Text className="font-bold">Muantap cik</Text>
                <Text className="my-auto">
                  4.2 <Ionicons name="star" color="orange" size={12} />
                </Text>
              </View>
              <Text>
                Seller fast response, barang belum dicoba kalo bagus ditambah
                bintangnya
              </Text>
            </View>

            <View className="border-b-gray-400 border-b pb-4">
              <View className="flex flex-row space-x-2 mb-1">
                <Image
                  className="h-10 w-10 my-auto rounded-full"
                  resizeMode="cover"
                  source={{
                    uri: "https://www.shutterstock.com/image-photo/handsome-curly-black-man-tshirt-600nw-1308959878.jpg",
                  }}
                />
                <View className="-space-y-2">
                  <Text className="font-bold text-lg">Fauzan Product</Text>
                  <Text className="font-light text-xs">01/01/1970</Text>
                </View>
              </View>
              <View className="flex flex-row space-x-2">
                <Text className="font-bold">Barang OK</Text>
                <Text className="my-auto">
                  6.9 <Ionicons name="star" color="orange" size={12} />
                </Text>
              </View>
              <Text>Setuju bang</Text>
            </View>

            <View className="border-b-gray-400 border-b pb-4">
              <View className="flex flex-row space-x-2 mb-1">
                <Image
                  className="h-10 w-10 my-auto rounded-full"
                  resizeMode="cover"
                  source={{
                    uri: "https://www.shutterstock.com/image-photo/handsome-curly-black-man-tshirt-600nw-1308959878.jpg",
                  }}
                />
                <View className="-space-y-2">
                  <Text className="font-bold text-lg">Zul Darkmode</Text>
                  <Text className="font-light text-xs">01/01/1970</Text>
                </View>
              </View>
              <View className="flex flex-row space-x-2">
                <Text className="font-bold">Sesuai ekspektasi</Text>
                <Text className="my-auto">
                  5.0 <Ionicons name="star" color="orange" size={12} />
                </Text>
              </View>
              <Text>Sesuai ekspektasi</Text>
            </View>
          </View>

          {/* <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
          /> */}
        </View>
      </View>
    </View>
  );
}
