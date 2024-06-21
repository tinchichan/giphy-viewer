import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavoriteGifs } from '../../hooks/useFavoriteGifs';  

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useFavoriteGifs', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  test('should load favorites from storage', async () => {
    const mockFavorites = JSON.stringify(['gif1', 'gif2']);
    AsyncStorage.getItem.mockResolvedValueOnce(mockFavorites);

    const { result, waitForNextUpdate } = renderHook(() => useFavoriteGifs());

    await waitForNextUpdate();

    expect(result.current.favorites).toEqual(['gif1', 'gif2']);
    expect(result.current.favorites).toBeInstanceOf(Array);
  });


  test('removeFavorite should correctly remove the specified favorite and store the updated list as JSON', async () => {
    const mockFavorites = JSON.stringify(['gif1', 'gif2']);
    AsyncStorage.getItem.mockResolvedValueOnce(mockFavorites);

    const { result, waitForNextUpdate } = renderHook(() => useFavoriteGifs());

    await waitForNextUpdate();

    await act(async () => {
      await result.current.removeFavorite('gif1');
    });

    expect(result.current.favorites).toEqual(['gif2']);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('FAVORITE_GIFS', JSON.stringify(['gif2']));
  });

  it('should load favorites from AsyncStorage on mount', async () => {
    // Mock AsyncStorage.getItem to return stored favorites
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(['gif1', 'gif2']));

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useFavoriteGifs());

    // Wait for useEffect to complete
    await waitForNextUpdate();

    expect(result.current.favorites).toEqual(['gif1', 'gif2']);
  });


  it('should remove a favorite and update AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(['gif1', 'gif2', 'gif3']));

    const { result } = renderHook(() => useFavoriteGifs());

    act(() => {
      result.current.removeFavorite('gif2');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('FAVORITE_GIFS', JSON.stringify([]));
    expect(result.current.favorites).toEqual([]);
  });


  test('removeFavorite should correctly remove the specified favorite and update AsyncStorage and state', async () => {
    const mockFavorites = ['gif1', 'gif2', 'gif3'];

    // Mock initial favorites in AsyncStorage
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));

    // Render the hook
    const { result } = renderHook(() => useFavoriteGifs());

    // Act: Remove a favorite
    await act(async () => {
      await result.current.removeFavorite('gif2');
    });

    // Assert: Check updated favorites in state and AsyncStorage
    expect(result.current.favorites).toEqual([]);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('FAVORITE_GIFS', JSON.stringify([]));
  });

  test('addFavorite should not add a duplicate favorite', async () => {
    const mockFavorites = ['gif1', 'gif2'];

    // Mock initial favorites in AsyncStorage
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));

    // Render the hook
    const { result } = renderHook(() => useFavoriteGifs());

    // Act: Add an existing favorite
    await act(async () => {
      await result.current.addFavorite('gif1');
    });

    // Assert: Check that the favorite remains unchanged
    expect(result.current.favorites).toHaveLength(1);
  });

  

});
