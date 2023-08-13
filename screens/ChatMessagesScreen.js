import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const ChatMessagesScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F0F0F0" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Set behavior for iOS
    >
      <View style={{ flex: 1 }}>
        <ScrollView></ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
        }}
      >
        <Entypo name="emoji-happy" size={24} color="#0099CC" />
        <FontAwesome
          style={{ marginHorizontal: 20 }}
          name="camera"
          size={24}
          color="#0099CC"
        />
        <FontAwesome name="microphone" size={24} color="#0099CC" />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
            marginHorizontal: 10,
          }}
          placeholder="Type your message"
        />

        <Pressable>
          <FontAwesome
            style={{ marginHorizontal: 5 }}
            name="send"
            size={24}
            color="#0099CC"
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
