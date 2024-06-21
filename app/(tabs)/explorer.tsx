
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, Share } from 'react-native';
import { useFavoriteGifs } from '@/hooks/useFavoriteGifs';
import { fetchGifsByIds } from '@/utils/giphy';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabTwoScreen() {
  const { favorites, removeFavorite } = useFavoriteGifs();
  const [gifs, setGifs] = useState([]);

  const loadGifs = async () => {
    if (favorites.length > 0) {
      try {
        const results = await fetchGifsByIds(favorites);
        setGifs(results);
        console.log('Loaded GIFs:', results);
      } catch (error) {
        console.error('Error loading GIFs:', error);
      }
    } else {
      setGifs([]);
      console.log('No favorites found, setting GIFs to empty array');
    }
  };

  useEffect(() => {
    loadGifs();
    console.log('i fire once');
  }, [favorites]);

  const handleLongPress = async (url) => {
    try {
      await Share.share({
        message: `Check out this GIF: ${url}`,
      });
    } catch (error) {
      console.error('Error sharing GIF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>My Favorite</Text>
      </View>

      <FlatList
        data={gifs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.gifContainer}>
            <TouchableOpacity
              onLongPress={() => handleLongPress(item.images.fixed_height.url)}
              onPress={() => removeFavorite(item.id)}
            >
              <Image source={{ uri: item.images.fixed_height.url }} style={styles.gif} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.removeButton}>
              <Ionicons name="close-circle" size={30} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gifContainer: {
    position: 'relative',
  },
  headerTitleContainer: {
    padding: 16,
    backgroundColor: '#A1CEDC',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gif: {
    width: '100%',
    height: 200,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
