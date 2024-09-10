import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Switch,
  Text,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function SettingScreen() {
  const navigation = useNavigation();

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);
  const [isSafeMode, setIsSafeMode] = useState(false);
  const [imageQuality, setImageQuality] = useState("high");

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  const toggleSafeMode = () => setIsSafeMode(previousState => !previousState);
  const toggleAutoPlay = () => setIsAutoPlayEnabled(previousState => !previousState);

  return (
    <View className="flex-1 bg-white p-4">
      <Animated.Text
        entering={FadeIn.delay(100)}
        className="text-2xl font-bold mb-4 text-center"
      >
        Settings
      </Animated.Text>

      <Animated.View entering={FadeIn.delay(150)} style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
          thumbColor={isNotificationsEnabled ? "#ff6b18" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#ff6b18" }}
        />
      </Animated.View>

      <Animated.View entering={FadeIn.delay(200)} style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? "#ff6b18" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#ff6b18" }}
        />
      </Animated.View>

      <Animated.View entering={FadeIn.delay(250)} style={styles.settingItem}>
        <Text style={styles.settingText}>Safe Mode</Text>
        <Switch
          value={isSafeMode}
          onValueChange={toggleSafeMode}
          thumbColor={isSafeMode ? "#ff6b18" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#ff6b18" }}
        />
      </Animated.View>
      <Text style={styles.descriptionText}>
        Hasil pencarian aman untuk segala usia
      </Text>

      <Animated.View entering={FadeIn.delay(300)} style={styles.settingItem}>
        <Text style={styles.settingText}>Putar Video Otomatis</Text>
        <Switch
          value={isAutoPlayEnabled}
          onValueChange={toggleAutoPlay}
          thumbColor={isAutoPlayEnabled ? "#ff6b18" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#ff6b18" }}
        />
      </Animated.View>

      <Animated.View entering={FadeIn.delay(350)} style={styles.settingItem}>
        <Text style={styles.settingText}>Kualitas Gambar</Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(250)} style={styles.settingItem}>
        <Text style={styles.settingText}>Language</Text>
      </Animated.View>
    </View>
  );
}

const styles = {
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  settingText: {
    fontSize: 18,
  },
  descriptionText: {
    fontSize: 14,
    color: "gray",
    marginHorizontal: 16,
    marginBottom: 16,
  }, 
};
