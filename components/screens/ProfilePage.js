import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ButtonComponent } from "../ButtonComponent";
import { firebaseAuth, firestore } from '../../config/firebase';  // Adjust import path as necessary
import { doc, getDoc } from 'firebase/firestore';

const ProfilePage = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebaseAuth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
          setUserEmail(userData.email);
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No user is signed in');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();  // Sign out the user using Firebase Authentication
      navigation.navigate('SignIn');  // Navigate back to the SignIn screen
    } catch (error) {
      console.error('Error signing out:', error.message);
      // Optionally handle sign out error
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Profile </Text> */}
        <Text style={styles.infoText}>Name: {userName}</Text>
        <Text style={styles.infoText}>Email: {userEmail}</Text>
      </View>

      <View style={styles.bottomcontainer}>
        <ButtonComponent
          onPress={handleLogout}  // Call handleLogout function on button press
          text="Log Out"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor:"#2b2b2b",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 30,
  },
  bottomcontainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
    paddingHorizontal: 10,
    marginHorizontal: 20,

  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom:30,
  },
  infoText: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 5,
  },
});

export default ProfilePage;
