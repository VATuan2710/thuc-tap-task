export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  feelsLike: number;
  icon: string;
  rainChance: number;
  rainAmount: number;
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
    rainChance: number;
    icon: string;
  }[];
  hourlyForecast: {
    time: string;
    hour: number;
    temperature: number;
    condition: string;
    rainChance: number;
    windSpeed: number;
    humidity: number;
    icon: string;
    isNow?: boolean;
  }[];
  alerts: {
    type: 'info' | 'warning' | 'error';
    title: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
  }[];
}

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export type { WeatherState }; 