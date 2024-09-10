import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import AuthApi from "../apis/AuthApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("")

  const [username, setUsername] = useState("validUsername2");
  const [email, setEmail] = useState("validemail2@example.com");
  const [name, setName] = useState("validname");
  const [password, setPassword] = useState("Valid@123");
  const [confirmPassword, setConfirmPassword] = useState("Valid@123");

  const navigate = useNavigation();

  const handleValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (username.length < 4) {
      return "Username must be longer than or equal to 4 characters.";
    }

    if (!emailRegex.test(email)) {
      return "Email must be a valid email.";
    }

    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be longer than or equal to 8 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleRegister = async () => {
    const error = handleValidation();
    if (error) {
      Toast.show({
        type: "error",
        text1: "Register Gagal",
        text2: error,
        text1Style: {
          fontSize: 16,
          color: "#262626",
        },
        text2Style: {
          fontSize: 14,
          color: "#262626",
        },
      });
      return;
    }

    const res = await AuthApi.register({
      username,
      password,
    });

    if (res.status === 201) {
      Toast.show({
        type: "success",
        text1: "Register Berhasil",
        text2: "Akun telah dibuat, silahkan login!",
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
      Toast.show({
        type: "error",
        text1: "Register Gagal",
        text2: "Username atau Email sudah dipakai.",
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
    return null; // Validation passed
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Toast position="top" />
      <View style={styles.formContainer}>
        <Text style={styles.header}>Silahkan Register</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Masukkan username..."
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Masukkan email..."
          style={styles.input}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Masukkan name..."
          style={styles.input}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Masukkan password..."
            style={styles.input}
          />
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#223e90"
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Konfirmasi password..."
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
          activeOpacity={0.7}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Sudah Punya Akun? </Text>
          <TouchableOpacity onPress={() => navigate.navigate("Login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  formContainer: {
    width: "100%",
  },
  header: {
    fontSize: 24,
    color: "#223e90",
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  registerButton: {
    backgroundColor: "#314ea7",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  registerButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#223e90",
  },
  loginLink: {
    color: "#223e90",
    fontWeight: "bold",
  },
});
