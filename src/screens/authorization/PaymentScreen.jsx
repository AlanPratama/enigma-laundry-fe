import { useNavigation } from "@react-navigation/native";
import { Alert, Animated, FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { pembayaran } from "../../constants/payment.constant";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const PaymentScreen = () => {
	const { totalPrice } = useSelector((state) => state.cart);
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation();

	const handlerButtonPay = () => {
		if (totalPrice <= selectedPayment?.saldo) {
			setModalVisible(true);
		} else {
			Alert.alert("Your saldo on not enough", "Select other method payment with more enough saldo!");
		}
	};

	const renderItem = ({ item }) => (
		<Animated.View entering={FadeIn.delay(200)}>
			<TouchableOpacity
				className={`border-2 rounded-xl p-2 flex flex-row justify-between mx-4 mt-2 ${
					selectedPayment?.name == item.name ? "border-blue-400 bg-blue-50" : "border-gray-400"
				}`}
				onPress={() => setSelectedPayment(item)}
			>
				<View>
					<Image
						source={item.imageUrl ? { uri: item.imageUrl } : require("../../../assets/imageNotFound.png")}
						className='w-[60px] h-[60px] rounded-[6px] bg-blue-100'
					/>
				</View>
				<View className='flex-grow ml-4 justify-around'>
					<Text className='text-gray-500'>{item.name}</Text>
					<Text className='font-bold'>Rp {item.saldo.toLocaleString("id-ID")}</Text>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);

	return (
		<View className='flex-1'>
			<View className='flex-1'>
				<FlatList data={pembayaran} showsVerticalScrollIndicator={false} renderItem={renderItem} keyExtractor={(item) => item.name} />
			</View>
			<View className='px-4 py-2 flex-row flex-shrink-0 justify-between items-center border border-t-1 border-t-gray-200 shadow-lg'>
				<View className='flex flex-col justify-around text-black'>
					<Text className='text-gray-500'>Total</Text>
					<Text className='text-base font-bold'>Rp {totalPrice.toLocaleString("id-ID")}</Text>
				</View>
				<TouchableOpacity
					className={`flex-shrink-0 w-1/2 py-2 px-4 rounded-xl ${totalPrice == 0 ? "bg-gray-500" : "bg-[#314ea7]"}`}
					disabled={totalPrice == 0}
					onPress={handlerButtonPay}
				>
					<Text className='text-center text-white text-base'>Pay</Text>
				</TouchableOpacity>
			</View>
			<Modal
				animationType='slide'
				className='fixed'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View className='bg-white flex-1 relative'>
					<View className='flex-1 justify-center items-center gap-4'>
						<View className='w-full items-center'>
							<TextInput
								className='border border-gray-500 rounded-lg px-4 py-2 text-3xl text-center w-1/2 leading-loose'
								inputMode='numeric'
								textContentType='password'
								secureTextEntry={true}
							/>
						</View>
						<Text>Masukan PIN untuk konfirmasi pembayaran</Text>
						<TouchableOpacity className='py-4 bg-[#314ea7] w-1/2 rounded-lg' onPress={() => navigation.navigate("Home", { transactionDone: true })}>
							<Text className='text-white font-bold text-center'>Konfirmasi</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity className='absolute top-2 left-2 p-4' onPress={() => setModalVisible(!modalVisible)}>
						<Ionicons name='close' size={24} color={"black"} />
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
};

export default PaymentScreen;
