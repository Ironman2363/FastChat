import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          // navigation.replace("Home");
        } else {
          // token not found , show the login screen itself
        }
      } catch (error) {
        
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.0.104:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);

        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email or password");
        console.log("Login Error", error);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4A55A2", fontSize: 36, fontWeight: "900" }}>
            Đăng nhập
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{}}>
            <TextInput
              mode="outlined"
              label="Email"
              outlineStyle="focused"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                marginHorizontal: 16,
                opacity: 0.8,
              }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                marginHorizontal: 16,
                opacity: 0.8,
              }}
            />
          </View>
          <Pressable
            onPress={handleLogin}
            style={{
              backgroundColor: "#4A55A2",
              padding: 14,
              marginTop: 30,
              marginHorizontal: 16,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Đăng nhập
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", opacity: 0.5 }}>
              Bạn chưa có tài khoản ?
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
