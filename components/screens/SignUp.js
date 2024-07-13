import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ButtonComponent } from "../ButtonComponent";
import TextFieldComponent from "../TextFieldComponent";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "../../config/firebase";

const SignUpScreen = ({ navigation }) => {
  const auth = firebaseAuth;

  function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
      case "Firebase: Error (auth/invalid-password).":
        return "Password provided is not correct";
      case "Firebase: Error (auth/invalid-email).":
        return "Email provided is invalid";
      case "Firebase: Error (auth/email-already-in-use).":
        return "Email already in use";
      case "Firebase: Error (auth/missing-password).":
        return "Enter a password";
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return "Password should be at least 6 characters";
      default:
        return "Error";
    }
  }

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserDetails(response.user);
      navigation.navigate('HomePage');
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
    } catch (err) {
      alert(mapAuthCodeToMessage(err.message));
      console.log(err.message);
    }
  };

  const saveUserDetails = async (user) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        name: name,
        email: user.email,
      });
    } catch (err) {
      console.error("Error saving user details: ", err);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    let requiredMessage = "* Required Field";
    let errors = {};

    if (!name) errors.name = requiredMessage;
    if (!email) errors.email = requiredMessage;
    if (!password) errors.password = requiredMessage;
    if (!confirmPassword) {
      errors.confirmPassword = requiredMessage;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormError(Object.keys(errors).length ? "Required fields need to be filled" : "");
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      signUp();
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My App</Text>
      </View>
      {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}
      <View style={styles.formContainer}>
        <TextFieldComponent
          label="Name"
          placeholder="Name"
          value={name}
          onChangeText={setName}
          error={Boolean(formError && !name)}
        />
        <TextFieldComponent
          label="Email"
          placeholder="Email Address"
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
        <TextFieldComponent
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={Boolean(formError && !confirmPassword)}
          errorMessage={formError && password !== confirmPassword ? "Passwords do not match" : ""}
        />
        <ButtonComponent
          onPress={handleSubmit}
          text="Sign Up"
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.signUpLink}>
          Have an Account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.underlinedText}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#FFF",
  },
  formErrorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    marginHorizontal: 20,
  },
  bottomContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
  },
  signUpLink: {
    color: "#FFF",
    fontSize: 16,
  },
  underlinedText: {
    textDecorationLine: "underline",
    color: "#FFD482",
  },
});

export default SignUpScreen;
