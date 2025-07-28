import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import type { WeatherData, WeatherState } from '../types/weather';
import { weatherApi } from '../services/weatherApi';

export const useWeather = () => {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null
  });

  // Function để get weather icon từ description (fallback)
  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('sun') || desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️';
    if (desc.includes('storm') || desc.includes('thunder')) return '⛈️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  // Function để gọi weather API thực tế
  const fetchWeather = useCallback(async (city: string) => {
    setWeatherState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Gọi API thực tế thông qua service layer
      const weatherData = await weatherApi.transformToWeatherData(city);
      
      setWeatherState({
        data: weatherData,
        loading: false,
        error: null
      });
      
      message.success(`Đã tải thời tiết cho ${weatherData.location}`);
      
    } catch (error: any) {
      console.error('Weather API Error:', error);
      
      let errorMessage = 'Không thể lấy dữ liệu thời tiết. Vui lòng thử lại.';
      
      // Handle specific error cases
      if (error.message.includes('404')) {
        errorMessage = 'Không tìm thấy thành phố. Vui lòng kiểm tra tên thành phố.';
      } else if (error.message.includes('401')) {
        errorMessage = 'API key không hợp lệ. Vui lòng kiểm tra file .env và đảm bảo API key đúng.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Đã vượt quá giới hạn API calls (1000/day). Vui lòng thử lại sau.';
      } else if (error.message.includes('API key không được cấu hình')) {
        errorMessage = 'API key chưa được cấu hình. Vui lòng kiểm tra file .env';
      } else if (!navigator.onLine) {
        errorMessage = 'Không có kết nối internet. Vui lòng kiểm tra mạng.';
      }
      
      setWeatherState({
        data: null,
        loading: false,
        error: errorMessage
      });
      
      message.error(errorMessage);
    }
  }, []);

  // Function để gọi weather API bằng coordinates
  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setWeatherState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Gọi API thực tế thông qua service layer
      const weatherData = await weatherApi.transformToWeatherDataByCoords(lat, lon);
      
      setWeatherState({
        data: weatherData,
        loading: false,
        error: null
      });
      
      message.success(`Đã tải thời tiết cho ${weatherData.location}`);
      
    } catch (error: any) {
      console.error('Weather API Error:', error);
      
      let errorMessage = 'Không thể lấy dữ liệu thời tiết. Vui lòng thử lại.';
      
      // Handle specific error cases
      if (error.message.includes('404')) {
        errorMessage = 'Không tìm thấy dữ liệu thời tiết cho vị trí này.';
      } else if (error.message.includes('401')) {
        errorMessage = 'API key không hợp lệ. Vui lòng kiểm tra file .env và đảm bảo API key đúng.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Đã vượt quá giới hạn API calls (1000/day). Vui lòng thử lại sau.';
      } else if (error.message.includes('API key không được cấu hình')) {
        errorMessage = 'API key chưa được cấu hình. Vui lòng kiểm tra file .env';
      } else if (!navigator.onLine) {
        errorMessage = 'Không có kết nối internet. Vui lòng kiểm tra mạng.';
      }
      
      setWeatherState({
        data: null,
        loading: false,
        error: errorMessage
      });
      
      message.error(errorMessage);
    }
  }, []);

  // Function để lấy weather mặc định khi component mount
  useEffect(() => {
    fetchWeather('Hanoi');
  }, [fetchWeather]);

  return {
    ...weatherState,
    fetchWeather,
    fetchWeatherByCoords,
    getWeatherIcon
  };
}; 