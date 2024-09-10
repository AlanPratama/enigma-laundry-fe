import { useNavigation } from "@react-navigation/native";
import { Animated, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { useSelector } from "react-redux";

const ConfirmationScreen = () => {
	const { products, totalPrice } = useSelector((state) => state.cart);
	const navigation = useNavigation();

	const renderItem = ({ item }) => (
		<Animated.View entering={FadeIn.delay(200)}>
			<View className={`border-2 rounded-xl p-2 flex flex-row justify-between mx-4 mt-2 border-gray-400`}>
				<View>
					<Image
						source={item.imageUrl ? { uri: item.imageUrl } : require("../../../assets/imageNotFound.png")}
						className='w-[60px] h-[60px] rounded-[6px] bg-blue-100'
					/>
				</View>
				<View className='flex-grow ml-4 justify-around'>
					<Text className='text-gray-500'>{item.name}</Text>
					<Text className='font-bold'>
						{item.quantity} x Rp {item.price.toLocaleString("id-ID")}
					</Text>
				</View>
			</View>
		</Animated.View>
	);

	return (
		<View className='flex-1'>
			<View className='flex-1'>
				<View className='p-4 flex gap-2'>
					<Text>Alamat Pengiriman</Text>
					<TextInput autoFocus placeholder='Input Address' className='border border-gray-500 px-2 rounded-lg' />
				</View>
				<View className='flex-1'>
					<Text className='px-4'>List Items</Text>
					<FlatList
						data={products.filter((item) => item.selected == true)}
						showsVerticalScrollIndicator={false}
						renderItem={renderItem}
						keyExtractor={(item) => item.id.toString()}
					/>
				</View>
				<View className='p-4 gap-2'>
					<Text className='font-bold'>Ringkasan Pembelian</Text>
					<View className='flex-row justify-between'>
						<Text className='text-gray-500'>Total Barang</Text>
						<Text>Rp {totalPrice.toLocaleString("id-ID")}</Text>
					</View>
					<View className='flex-row justify-between'>
						<Text className='text-gray-500'>Total Ongkir</Text>
						<Text className='line-through text-gray-500'>Rp {(totalPrice / 1000 + 30000).toLocaleString("id-ID")}</Text>
					</View>
					<View className='flex-row justify-between'>
						<Text className='text-gray-500'>Total Asuransi</Text>
						<Text className='text-gray-500'>Rp {(totalPrice / 10000).toLocaleString("id-ID")}</Text>
					</View>
					<View className='flex-row justify-between'>
						<Text className='text-gray-500'>Biaya Jasa Aplikasi</Text>
						<Text className='text-gray-500'>Rp {(2000).toLocaleString("id-ID")}</Text>
					</View>
					<View className='flex-row justify-between border-t border-gray-500 pt-2'>
						<Text className='font-bold'>Total Belanja</Text>
						<Text className='font-bold'>Rp {(2000 + totalPrice / 10000 + totalPrice).toLocaleString("id-ID")}</Text>
					</View>
				</View>
			</View>
			<View className='py-2 px-4 border border-t-1 border-t-gray-200 shadow-lg'>
				<View className='flex gap-4 flex-row'>
					<TouchableOpacity
						className={`flex-1 py-3 px-6 rounded-xl ${totalPrice == 0 ? "bg-gray-500" : "bg-[#314ea7]"}`}
						disabled={totalPrice == 0}
						onPress={() => navigation.navigate("Payment")}
					>
						<Text className='text-center text-white text-base'>Select Payment</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ConfirmationScreen;
