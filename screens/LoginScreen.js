import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
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
