import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const TextFieldComponent = ({ placeholder, value, onChangeText, secureTextEntry, error }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={styles.input.placeholderTextColor}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#6b6b6b",
    color: "#fff",
    borderColor: "#6b6b6b", // Default border color
    borderWidth: 2, // Default border width
    placeholderTextColor: "#fff", // Placeholder color
  },
  errorInput: {
    borderColor: "red", // Error border color
  },
});

export default TextFieldComponent;
