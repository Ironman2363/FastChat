import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import { Pressable } from "react-native";
import { UserType } from "../UserContext";

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);

  const sentFriendRequests = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch("http://192.168.0.104:8000/friend-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });

      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  return (
    <Pressable
      style={styles.userContainer}
      onPress={() => {
        /* Handle user press if needed */
      }}
    >
      <View style={styles.userImageContainer}>
        <Image style={styles.userImage} source={{ uri: item.image }} />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Pressable
          onPress={() => sentFriendRequests(userId, item._id)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonLabel}>Kết bạn</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  userImageContainer: {
    marginRight: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#4A55A2",
  },
  userEmail: {
    marginVertical: 10,
    color: "gray",
    fontSize: 13,
  },
  addButton: {
    backgroundColor: "#4A55A2",
    padding: 10,
    borderRadius: 6,
    width: 260,
  },
  addButtonLabel: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default User;
