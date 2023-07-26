import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  navigation = useNavigation();
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
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderRadius: 6,
                marginHorizontal: 16,
                opacity: 0.5,
              }}
              placeholder="Name"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderRadius: 6,
                marginHorizontal: 16,
                opacity: 0.5,
              }}
              placeholder="Email"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderRadius: 6,
                marginHorizontal: 16,
                opacity: 0.5,
              }}
              placeholder="Password"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{
                borderBottomColor: "gray",
                height: 46,
                fontSize: 18,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderRadius: 6,
                marginHorizontal: 16,
                opacity: 0.5,
              }}
              placeholder="Image"
            />
          </View>
          <Pressable
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
