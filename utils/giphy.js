const API_KEY = 'kO4lHwhjfHrXdIkTcQJqP2wWl6YfiQSs';

export const fetchGifs = async (query, offset = 0) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=2&offset=${offset}`);
  const data = await response.json();
  return data.data;
};


export const fetchGifsByIds = async (ids) => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids.join(',')}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch GIFs, status ${response.status}`);
    }else{
      console.log("success fetch.");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    throw error; // Re-throw the error to propagate it
  }
};
