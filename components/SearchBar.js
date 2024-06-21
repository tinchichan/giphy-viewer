// src/components/SearchBar.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for GIPHY GIFs"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={() => onSearch(query)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#D3D3D3'
  },
});
