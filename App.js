import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./components/screens/SignIn";
import SignUpScreen from "./components/screens/SignUp";
import HomePage from "./components/screens/HomePage";
import ProfilePage from "./components/screens/ProfilePage";
import { Ionicons } from "@expo/vector-icons";  // Make sure you have the required icons library installed

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen 
            name="SignIn" 
            component={SignInScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="HomePage" 
            component={HomePage} 
            options={({ navigation }) => ({
              title: 'Characters',
              headerTitleAlign: "center", // Center align the title
              headerRight: () => (
                <Ionicons 
                  name="person-circle-outline" 
                  size={24} 
                  color="white" 
                  style={{ marginRight: 15 }} 
                  onPress={() => navigation.navigate('ProfilePage')}
                />
              ),
              headerLeft: () => null, // This removes the back button
              headerStyle: {
                backgroundColor: '#2A2A2A',
              },
              headerTintColor: '#FFF',
            })} 
          />
          <Stack.Screen 
            name="ProfilePage" 
            component={ProfilePage} 
            options={{ title: 'Profile' , headerTitleAlign: "center", // Center align the title
            headerStyle: {
              backgroundColor: '#2A2A2A',
            }, 
            headerTintColor: "#fff",

            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#2A2A2A",
  },
});
