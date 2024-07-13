import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ButtonComponent } from "../ButtonComponent";
import TextFieldComponent from "../TextFieldComponent";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase";  // Adjust the path as necessary

const SignInScreen = ({ navigation }) => {
  const auth = firebaseAuth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [authError, setAuthError] = useState("");

  const validateForm = () => {
    let errors = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setFormError(Object.keys(errors).length ? "Required fields need to be filled" : "");
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        navigation.navigate('HomePage');
        setEmail("");
        setPassword("");
        setErrors({});
        setAuthError("");
      } catch (error) {
        console.error(error);
        setAuthError("Please check your credentials and try again.");  // Set auth error message
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My App</Text>
      </View>

      <View style={styles.formContainer}>
        {authError ? <Text style={styles.authErrorText}>{authError}</Text> : null}
        <TextFieldComponent
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          error={Boolean(formError && !email)}
        />
        <TextFieldComponent
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={Boolean(formError && !password)}
        />
        <ButtonComponent
          onPress={handleSubmit}
          text="Sign In"
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.signUpLink}>
          Don't have an Account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.underlinedText}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#2a2a2a",
  },
  titleContainer: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#fff",
  },
  formContainer: {
    flex: 5,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpLink: {
    color: "#FFF",
    fontSize: 16,
    // backgroundColor: "blue",
    // marginBottom: 10,

  },
  underlinedText: {
    textDecorationLine: "underline",
    color: "#FFD482",
    fontSize: 16,
    // backgroundColor: "red",
    
  },
  authErrorText:{
    color: "red",
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign:"center",
  },
});

export default SignInScreen;
