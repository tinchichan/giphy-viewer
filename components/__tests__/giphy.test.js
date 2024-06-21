import { fetchGifs } from '@/utils/giphy';

jest.mock('@/utils/giphy', () => ({
  fetchGifs: jest.fn(),
}));

describe('fetchGifs', () => {
  it('fetches GIFs based on query', async () => {
    const mockResponse = [{ id: '1', images: { fixed_height: { url: 'http://example.com/gif1.gif' } } }];
    fetchGifs.mockResolvedValueOnce(mockResponse);

    const result = await fetchGifs('query');
    expect(result).toEqual(mockResponse);
    expect(fetchGifs).toHaveBeenCalledWith('query');
  });

  it('handles errors', async () => {
    fetchGifs.mockRejectedValueOnce(new Error('API error'));

    await expect(fetchGifs('query')).rejects.toThrow('API error');
  });
});
