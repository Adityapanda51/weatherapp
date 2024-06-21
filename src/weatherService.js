import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherByCityName = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    const dataByDate = {};
    response.data.list.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0];
      if (!dataByDate[date]) {
        dataByDate[date] = entry;
      }
    });
    return Object.values(dataByDate);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
