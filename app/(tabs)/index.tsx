import React, { useState, useCallback } from 'react';
import { Text, Image, StyleSheet, ActivityIndicator, Share, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native';
import { fetchGifs } from '@/utils/giphy';
import { SearchBar } from '@/components/SearchBar';
import { useFavoriteGifs } from '@/hooks/useFavoriteGifs';

export default function HomeScreen() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const { addFavorite } = useFavoriteGifs();

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setOffset(0); // Reset offset for new search
    setLoading(true);
    const results = await fetchGifs(searchQuery);
    setGifs(results);
    setLoading(false);
  };

  const loadMoreGifs = async () => {
    if (!loading) {
      setLoading(true);
      const newOffset = offset + 3;
      const results = await fetchGifs(query, newOffset);
      setGifs((prevGifs) => [...prevGifs, ...results]);
      setOffset(newOffset);
      setLoading(false);
    }
  };

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
        <Text style={styles.headerTitle}>Search GIPHY</Text>
      </View>
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={gifs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item.images.fixed_height.url)} onPress={() => addFavorite(item.id)}>
            <Image source={{ uri: item.images.fixed_height.url }} style={styles.gif} />
          </TouchableOpacity>
        )}
        onEndReached={loadMoreGifs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
});
