import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'FAVORITE_GIFS';

export const useFavoriteGifs = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites != null) {
          setFavorites(JSON.parse(storedFavorites));
          console.log('Loaded favorites from storage:', JSON.parse(storedFavorites));
        } else {
          console.log('No favorites found in storage');
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      console.log('Saved favorites to storage:', newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = async (id) => {
    try {
      // Fetch current favorites from AsyncStorage
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      let newFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  
      // Add new favorite if it doesn't already exist
      if (!newFavorites.includes(id)) {
        newFavorites = [...new Set([...newFavorites, id])]; // Ensure no duplicates
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        setFavorites(newFavorites); // Update local state after saving to AsyncStorage
        console.log('Added favorite:', id);
      } else {
        console.log('Favorite already exists:', id);
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };
  const removeFavorite = async (id) => {
    try{
      {
        const newFavorites = favorites.filter((favorite) => favorite !== id);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        console.log('Removed favorite:', id);
        setFavorites(newFavorites);
      };
    }catch(e){
      console.log(error);
    }

  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
};