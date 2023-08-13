import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const acceptRequest = async (friendRequestId) => {
    try {
      const response = await fetch(
        "http://192.168.0.104:8000/friend-request/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: userId,
          }),
        }
      );

      if (response.ok) {
        setFriendRequests(
          friendRequests.filter((request) => request._id !== friendRequestId)
        );
        navigation.navigate("Chats");
      }
    } catch (err) {
      console.log("error acceptin the friend request", err);
    }
  };
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          resizeMode: "cover",
        }}
        source={{ uri: item.image }}
      />
      <Pressable style={{ marginStart: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginVertical: 10, fontSize: 13, color: "gray" }}>
          {item?.email}
        </Text>
        <Pressable
          onPress={() => acceptRequest(item._id)}
          style={{
            backgroundColor: "#4A55A2",
            padding: 10,
            borderRadius: 6,
            width: 250,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Chấp nhận kết bạn
          </Text>
        </Pressable>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
