import axios from 'axios';
import Config from 'react-native-config';

const weatherApiKey = Config.WEATHER_API_KEY;

export const fetchWeather = async (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    //console.log(weatherApiKey);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=metric&include=current&key=${weatherApiKey}&contentType=json`;
    const response = await axios.get(url);
    //console.log(response.data);
    return await response.data;

};