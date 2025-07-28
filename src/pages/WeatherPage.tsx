import React from 'react';
import { Card, Spin, Typography } from 'antd';
import { useWeather } from '../hooks/useWeather';
import WeatherLayout from '../layout/WeatherLayout';
import WeatherHeader from '../components/weather/WeatherHeader';
import WeatherMap from '../components/weather/WeatherMap';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import WeatherDetails from '../components/weather/WeatherDetails';
import RainAndEnvironment from '../components/weather/RainAndEnvironment';
import ForecastCards from '../components/weather/ForecastCards';
import HourlyForecast from '../components/weather/HourlyForecast';
import WeatherAlerts from '../components/weather/WeatherAlerts';

const { Text } = Typography;

const WeatherPage: React.FC = () => {
  const { 
    data, 
    loading, 
    error, 
    fetchWeather,
    fetchWeatherByCoords,
    getWeatherIcon 
  } = useWeather();

  return (
    <WeatherLayout>
      {/* Header */}
      <WeatherHeader />

      {/* Search and Map */}
      <WeatherMap 
        onSearch={fetchWeather}
        onLocationSelect={fetchWeatherByCoords}
      />

      {/* Weather Display */}
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
            <div style={{ marginTop: "16px" }}>
              <Text>Đang tải dữ liệu thời tiết...</Text>
            </div>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Text type="danger">{error}</Text>
          </div>
        ) : data ? (
          <div>
            <WeatherDisplay data={data} getWeatherIcon={getWeatherIcon} />
          </div>
        ) : null}
      </Card>

      {/* Weather Details - Only show when data is available */}
      {data && !loading && (
        <>
          <WeatherDetails data={data} />
          <RainAndEnvironment data={data} />
          <ForecastCards forecast={data.forecast} />
          <HourlyForecast hourlyForecast={data.hourlyForecast} />
          <WeatherAlerts alerts={data.alerts} />
        </>
      )}
    </WeatherLayout>
  );
};

export default WeatherPage; 