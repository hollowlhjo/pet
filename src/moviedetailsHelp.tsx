import axios from 'axios';

const API_KEY = '89fb00a7179879e61d76ce1f542de91e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}