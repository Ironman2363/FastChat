import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { TextInput } from "react-native-paper";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    axios
      .post("http://192.168.0.104:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Đăng ký thành công",
          "Bạn đã đăng ký tài khoản thành công"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Đăng ký thất bại", "Bạn đã đăng ký tài khoản thất bại");
        console.log("Lỗi: ", error);
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
            marginTop: 140,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4A55A2", fontSize: 36, fontWeight: "900" }}>
            Đăng ký
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{}}>
            <TextInput
              mode="outlined"
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                marginHorizontal: 16,
                opacity: 0.8,
              }}
              label="Name"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              mode="outlined"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                marginHorizontal: 16,
                opacity: 0.8,
              }}
              label="Email"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              mode="outlined"
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
              label="Password"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              mode="outlined"
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                marginHorizontal: 16,
                opacity: 0.8,
              }}
              label="Image"
            />
          </View>
          <Pressable
            onPress={handleRegister}
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
              Đăng ký
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", opacity: 0.5 }}>
              Bạn đã có tài khoản ?
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
