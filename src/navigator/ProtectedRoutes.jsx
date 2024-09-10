import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Animated from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/authorization/HomeScreen";
import ProductScreen from "../screens/authorization/product/ProductScreen";
import ProductDetail from "../screens/authorization/product/ProductDetail";
import ProfileScreen from "../screens/authorization/ProfileScreen";
import SettingScreen from "../screens/authorization/SettingScreen";

const Stack = createNativeStackNavigator();

function ProductStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='ProductScreen' options={{ headerShown: true }} component={ProductScreen} />
			<Stack.Screen name='ProductDetail' options={{ headerShown: true }} component={ProductDetail} />
		</Stack.Navigator>
	);
}

export default function ProtectedRoutes() {
	const navigation = useNavigation();
	const _renderIcon = (routeName, selectedTab) => {
		let icon = "";

		switch (routeName) {
			case "Home":
				icon = "home-outline";
				break;
			case "Product":
				icon = "file-tray-stacked-outline";
				break;
			case "Product1":
				icon = "settings-outline";
				break;
			case "Profile":
				icon = "person-outline";
				break;
		}

		return <Ionicons name={icon} size={25} color={routeName === selectedTab ? "black" : "gray"} />;
	};

	const renderTabBar = ({ routeName, selectedTab, navigate }) => {
		return (
			<TouchableOpacity onPress={() => navigate(routeName)} style={styles.tabbarItem}>
				{_renderIcon(routeName, selectedTab)}
			</TouchableOpacity>
		);
	};

	return (
		<CurvedBottomBarExpo.Navigator
			type='DOWN'
			style={styles.bottomBar}
			shadowStyle={styles.shawdow}
			height={55}
			circleWidth={50}
			bgColor='white'
			initialRouteName='Home'
			borderTopLeftRight
			screenOptions={{ headerShown: false }}
			renderCircle={({ selectedTab, navigate }) => (
				<Animated.View style={styles.btnCircleUp}>
					<TouchableOpacity style={styles.button} onPress={() => navigate("Cart")}>
						<Ionicons name={"cart-outline"} color='gray' size={25} />
					</TouchableOpacity>
				</Animated.View>
			)}
			tabBar={renderTabBar}
		>
			<CurvedBottomBarExpo.Screen name='Home' position='LEFT' component={() => <HomeScreen />} />
			<CurvedBottomBarExpo.Screen name='Product' position='LEFT' component={() => <ProductScreen />} />
			<CurvedBottomBarExpo.Screen name='Product1' component={() => <SettingScreen />} position='RIGHT' />
			<CurvedBottomBarExpo.Screen name='Profile' component={() => <ProfileScreen />} position='RIGHT' />
		</CurvedBottomBarExpo.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	shawdow: {
		shadowColor: "#DDDDDD",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 1,
		shadowRadius: 5,
	},
	button: {
		flex: 1,
		justifyContent: "center",
	},
	bottomBar: {},
	btnCircleUp: {
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#E8E8E8",
		bottom: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 1,
	},
	imgCircle: {
		width: 30,
		height: 30,
		tintColor: "gray",
	},
	tabbarItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	img: {
		width: 30,
		height: 30,
	},
	screen1: {
		flex: 1,
		backgroundColor: "#BFEFFF",
	},
	screen2: {
		flex: 1,
		backgroundColor: "#FFEBCD",
	},
});
