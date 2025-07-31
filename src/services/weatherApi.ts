import type { WeatherData } from '../types/weather';
import { validateApiConfig, logConfigStatus } from '../utils/apiValidation';

const { config } = validateApiConfig();
const API_KEY = config.apiKey;
const BASE_URL = config.baseUrl;

// Log configuration status on module load
logConfigStatus();

// Interface cho OpenWeatherMap API response
interface OpenWeatherResponse {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: { speed: number };
  visibility: number;
  coord: { lat: number; lon: number };
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: { speed: number };
    pop: number; // probability of precipitation
    rain?: { '3h': number }; // rain volume in last 3 hours
    dt_txt: string;
  }>;
}

// Function để convert weather condition sang emoji
const getWeatherIcon = (iconCode: string, description: string): string => {
  // OpenWeatherMap icon codes: https://openweathermap.org/weather-conditions
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  
  return iconMap[iconCode] || '🌤️';
};

// Function để tạo weather alerts dựa trên dữ liệu thật
const generateWeatherAlerts = (
  temp: number, 
  humidity: number, 
  windSpeed: number,
  description: string
): WeatherData['alerts'] => {
  const alerts: WeatherData['alerts'] = [];

  // Cảnh báo nhiệt độ
  if (temp > 38) {
    alerts.push({
      type: 'error',
      title: 'Cảnh báo nắng nóng cực đoan',
      description: 'Nhiệt độ rất cao, tránh ra ngoài trời từ 10h-16h. Uống nhiều nước và ở nơi thoáng mát.',
      urgency: 'high'
    });
  } else if (temp > 35) {
    alerts.push({
      type: 'warning',
      title: 'Cảnh báo nắng nóng',
      description: 'Nhiệt độ cao, hạn chế hoạt động ngoài trời vào giữa trưa.',
      urgency: 'medium'
    });
  } else if (temp < 10) {
    alerts.push({
      type: 'warning',
      title: 'Cảnh báo rét đậm',
      description: 'Nhiệt độ thấp, mặc ấm và chú ý sức khỏe.',
      urgency: 'medium'
    });
  }

  // Cảnh báo gió mạnh
  if (windSpeed > 15) {
    alerts.push({
      type: 'warning',
      title: 'Cảnh báo gió mạnh',
      description: 'Tốc độ gió cao, chú ý khi di chuyển và tránh các vật dễ đổ.',
      urgency: 'medium'
    });
  }

  // Cảnh báo mưa
  if (description.toLowerCase().includes('rain') || description.toLowerCase().includes('storm')) {
    alerts.push({
      type: 'info',
      title: 'Thông báo có mưa',
      description: 'Có khả năng có mưa, mang theo ô và chú ý khi di chuyển.',
      urgency: 'low'
    });
  }

  return alerts;
};

export const weatherApi = {
  // Get current weather
  async getCurrentWeather(city: string): Promise<OpenWeatherResponse> {
    if (!API_KEY) {
      throw new Error('API key không được cấu hình. Vui lòng kiểm tra file .env');
    }

    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=vi`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404');
      } else if (response.status === 401) {
        throw new Error('401');
      } else if (response.status === 429) {
        throw new Error('429');
      }
      throw new Error(`Weather API Error: ${response.statusText}`);
    }
    
    return response.json();
  },

  // Get current weather by coordinates
  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<OpenWeatherResponse> {
    if (!API_KEY) {
      throw new Error('API key không được cấu hình. Vui lòng kiểm tra file .env');
    }

    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=vi`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404');
      } else if (response.status === 401) {
        throw new Error('401');
      } else if (response.status === 429) {
        throw new Error('429');
      }
      throw new Error(`Weather API Error: ${response.statusText}`);
    }
    
    return response.json();
  },

  // Get 5-day forecast
  async getForecast(city: string): Promise<OpenWeatherForecastResponse> {
    if (!API_KEY) {
      throw new Error('API key không được cấu hình. Vui lòng kiểm tra file .env');
    }

    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=vi`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404');
      } else if (response.status === 401) {
        throw new Error('401');
      } else if (response.status === 429) {
        throw new Error('429');
      }
      throw new Error(`Forecast API Error: ${response.statusText}`);
    }
    
    return response.json();
  },

  // Get 5-day forecast by coordinates
  async getForecastByCoords(lat: number, lon: number): Promise<OpenWeatherForecastResponse> {
    if (!API_KEY) {
      throw new Error('API key không được cấu hình. Vui lòng kiểm tra file .env');
    }

    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=vi`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404');
      } else if (response.status === 401) {
        throw new Error('401');
      } else if (response.status === 429) {
        throw new Error('429');
      }
      throw new Error(`Forecast API Error: ${response.statusText}`);
    }
    
    return response.json();
  },

  // Transform API response to our WeatherData interface
  async transformToWeatherData(city: string): Promise<WeatherData> {
    try {
      // Parallel API calls for better performance
      const [currentWeather, forecast] = await Promise.all([
        this.getCurrentWeather(city),
        this.getForecast(city)
      ]);

      // Process forecast data
      const dailyForecast = this.processDailyForecast(forecast.list);
      const hourlyForecast = this.processHourlyForecast(forecast.list);

      // Calculate rain data
      const rainData = this.calculateRainData(forecast.list);

      return {
        location: currentWeather.name,
        country: currentWeather.sys.country,
        temperature: Math.round(currentWeather.main.temp),
        description: currentWeather.weather[0].description,
        humidity: currentWeather.main.humidity,
        windSpeed: Math.round(currentWeather.wind.speed * 3.6), // m/s to km/h
        pressure: currentWeather.main.pressure,
        visibility: Math.round((currentWeather.visibility || 10000) / 1000), // meters to km
        feelsLike: Math.round(currentWeather.main.feels_like),
        icon: getWeatherIcon(currentWeather.weather[0].icon, currentWeather.weather[0].description),
        rainChance: rainData.chance,
        rainAmount: rainData.amount,
        forecast: dailyForecast,
        hourlyForecast,
        alerts: generateWeatherAlerts(
          currentWeather.main.temp,
          currentWeather.main.humidity,
          currentWeather.wind.speed * 3.6,
          currentWeather.weather[0].description
        )
      };
    } catch (error) {
      console.error('Weather API Error:', error);
      throw new Error('Không thể lấy dữ liệu thời tiết. Vui lòng thử lại sau.');
    }
  },

  // Transform API response to our WeatherData interface by coordinates
  async transformToWeatherDataByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      // Parallel API calls for better performance
      const [currentWeather, forecast] = await Promise.all([
        this.getCurrentWeatherByCoords(lat, lon),
        this.getForecastByCoords(lat, lon)
      ]);

      // Process forecast data
      const dailyForecast = this.processDailyForecast(forecast.list);
      const hourlyForecast = this.processHourlyForecast(forecast.list);

      // Calculate rain data
      const rainData = this.calculateRainData(forecast.list);

      return {
        location: currentWeather.name,
        country: currentWeather.sys.country,
        temperature: Math.round(currentWeather.main.temp),
        description: currentWeather.weather[0].description,
        humidity: currentWeather.main.humidity,
        windSpeed: Math.round(currentWeather.wind.speed * 3.6), // m/s to km/h
        pressure: currentWeather.main.pressure,
        visibility: Math.round((currentWeather.visibility || 10000) / 1000), // meters to km
        feelsLike: Math.round(currentWeather.main.feels_like),
        icon: getWeatherIcon(currentWeather.weather[0].icon, currentWeather.weather[0].description),
        rainChance: rainData.chance,
        rainAmount: rainData.amount,
        forecast: dailyForecast,
        hourlyForecast,
        alerts: generateWeatherAlerts(
          currentWeather.main.temp,
          currentWeather.main.humidity,
          currentWeather.wind.speed * 3.6,
          currentWeather.weather[0].description
        )
      };
    } catch (error) {
      console.error('Weather API Error:', error);
      throw new Error('Không thể lấy dữ liệu thời tiết. Vui lòng thử lại sau.');
    }
  },

  // Process daily forecast (5 days)
  processDailyForecast(forecastList: OpenWeatherForecastResponse['list']): WeatherData['forecast'] {
    const dailyData = new Map<string, any>();
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!dailyData.has(dateKey)) {
        dailyData.set(dateKey, {
          date,
          temps: [],
          conditions: [],
          rainChances: [],
          icons: []
        });
      }
      
      const day = dailyData.get(dateKey);
      day.temps.push(item.main.temp);
      day.conditions.push(item.weather[0].main);
      day.rainChances.push(item.pop * 100);
      day.icons.push(item.weather[0].icon);
    });

    const dayNames = ['Today', 'Tomorrow', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
    
    return Array.from(dailyData.values()).slice(0, 5).map((day, index) => ({
      day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : 
           day.date.toLocaleDateString('vi-VN', { weekday: 'short' }),
      high: Math.round(Math.max(...day.temps)),
      low: Math.round(Math.min(...day.temps)),
      condition: day.conditions[0],
      rainChance: Math.round(Math.max(...day.rainChances)),
      icon: getWeatherIcon(day.icons[0], day.conditions[0])
    }));
  },

  // Process hourly forecast (24 hours)
  processHourlyForecast(forecastList: OpenWeatherForecastResponse['list']): WeatherData['hourlyForecast'] {
    return forecastList.slice(0, 8).map((item, index) => { // 8 items = 24 hours (3-hour intervals)
      const date = new Date(item.dt * 1000);
      const hour = date.getHours();
      
      return {
        time: index === 0 ? 'Bây giờ' : `${hour.toString().padStart(2, '0')}:00`,
        hour,
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main,
        rainChance: Math.round(item.pop * 100),
        windSpeed: Math.round(item.wind.speed * 3.6),
        humidity: item.main.humidity,
        icon: getWeatherIcon(item.weather[0].icon, item.weather[0].description),
        isNow: index === 0
      };
    });
  },

  // Calculate rain data from forecast
  calculateRainData(forecastList: OpenWeatherForecastResponse['list']): { chance: number; amount: number } {
    const next24Hours = forecastList.slice(0, 8);
    const rainChances = next24Hours.map(item => item.pop * 100);
    const maxRainChance = Math.max(...rainChances);
    
    // Calculate estimated rain amount from weather data
    let totalRainAmount = 0;
    next24Hours.forEach(item => {
      if (item.rain && item.rain['3h']) {
        totalRainAmount += item.rain['3h'];
      } else if (item.pop > 0.3) {
        totalRainAmount += item.pop * 2; 
      }
    });
    
    return {
      chance: Math.round(maxRainChance),
      amount: Math.round(totalRainAmount) || 0
    };
  }
}; 