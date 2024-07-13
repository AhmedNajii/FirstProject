import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://thronesapi.com/api/v2/Characters');
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const handleNextCharacter = () => {
    setCurrentCharacterIndex(prevIndex =>
      prevIndex < characters.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousCharacter = () => {
    setCurrentCharacterIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  if (characters.length === 0) {
    return <Text >Loading...</Text>; // Display loading indicator while fetching data
  }

  const character = characters[currentCharacterIndex];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.nametitle}>{character.fullName}</Text>
        <Image
          style={styles.image}
          source={{ uri: character.imageUrl }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.details}><Text style={styles.label}>ID :  </Text>{character.id}</Text>
          <Text style={styles.details}><Text style={styles.label}>First Name :  </Text>{character.firstName}</Text>
          <Text style={styles.details}><Text style={styles.label}>Last Name :  </Text>{character.lastName}</Text>
          <Text style={styles.details}><Text style={styles.label}>Full Name :  </Text>{character.fullName}</Text>
          <Text style={styles.details}><Text style={styles.label}>Family :  </Text>{character.family}</Text>
          <Text style={styles.details}><Text style={styles.label}>Title :  </Text>{character.title}</Text>
          <Text style={styles.details}><Text style={styles.label}>Image :  </Text>{character.image}</Text>
          <Text style={styles.details}><Text style={styles.label}>Image URL :  </Text>{character.imageUrl}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePreviousCharacter}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.countText}>
          {currentCharacterIndex + 1} of {characters.length}
        </Text>

        <TouchableOpacity style={styles.arrowButton} onPress={handleNextCharacter}>
          <Icon name="chevron-right" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: '#ccc',
  },
  arrowButton: {
    padding: 15,
  },
  countText: {
    fontSize: 20,
    color: '#fff',
  },
  detailsContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  image: {
    width: 300,
    height: 350,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#ccc',
  },
  nametitle: {
    fontSize: 25,
    marginBottom: 10,
    color: '#fff',
    fontWeight: '800',
  },
  details: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff',
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomePage;
