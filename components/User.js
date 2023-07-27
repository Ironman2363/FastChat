import { StyleSheet, Text, View, Image } from "react-native";
import React,{useContext,useState} from "react";
import { Pressable } from "react-native";
import { UserType } from "../UserContext";

const User = ({ item }) => {
      const { userId, setUserId } = useContext(UserType);
        const [requestSent, setRequestSent] = useState(false);
      const sentFriendRequests = async (currentUserId, selectedUserId) => {
        try {
          const response = await fetch(
            "http://192.168.0.104:8000/friend-request",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ currentUserId, selectedUserId }),
            }
          );

          if (response.ok) {
            setRequestSent(true);
          }
        } catch (error) {
          console.log("error message", error);
        }
      };
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        />
      </View>
      <View style={{ marginStart: 16, flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#4A55A2" }}>
          {item.name}
        </Text>
        <Text style={{ marginTop: 5, color: "gray" }}>{item.email}</Text>
      </View>
      <Pressable
        onPress={() => sentFriendRequests(userId,item._id)}
        style={{
          backgroundColor: "#4A55A2",
          padding: 10,
          borderRadius: 6,
          width: 100,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Kết bạn</Text>
      </Pressable>
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
