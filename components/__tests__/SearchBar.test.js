
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../../components/SearchBar'; // Adjust the path as per your project structure

describe('SearchBar', () => {
  it('should call onSearch with the correct query', () => {
    // Mock onSearch function
    const onSearch = jest.fn();

    // Render the SearchBar component
    const { getByPlaceholderText, getByText } = render(<SearchBar onSearch={onSearch} />);

    // Get the TextInput and Button elements
    const input = getByPlaceholderText('Search for GIPHY GIFs');
    const button = getByText('Search');

    // Type into the TextInput
    fireEvent.changeText(input, 'cats');

    // Press the Search button
    fireEvent.press(button);

    // Expect onSearch to have been called with 'cats'
    expect(onSearch).toHaveBeenCalledWith('cats');
  });

  // Additional test cases can be added for edge cases, UI interactions, etc.
});
