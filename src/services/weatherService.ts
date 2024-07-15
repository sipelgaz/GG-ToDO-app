import axios from 'axios';

const weatherApiKey = 'AKSYR9VEAD5ZVFCH2NJZZBCXY';

export const fetchWeather = async (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    console.log(encodedLocation);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=metric&include=current&key=${weatherApiKey}&contentType=json`;
    const response = await axios.get(url);
    //console.log(response.data);
    return await response.data;

};