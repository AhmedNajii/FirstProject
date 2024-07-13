import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

export function ButtonComponent({ onPress, text }) {
  return (
    <Pressable style={styles.Background} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Background: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    boxSizing: "border-box",
    backgroundColor: "#FFD482",
    marginTop: 20,
  },
  text: {
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ButtonComponent;