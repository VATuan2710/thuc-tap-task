import React from 'react';
import { Typography, Tag } from 'antd';
import type { WeatherData } from '../../types/weather';

const { Title, Text } = Typography;

interface WeatherDisplayProps {
  data: WeatherData;
  getWeatherIcon: (description: string) => string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, getWeatherIcon }) => {
  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "72px", marginBottom: "8px" }}>
        {getWeatherIcon(data.description)}
      </div>
      <Title level={1} style={{ margin: 0, color: "#52c41a" }}>
        {formatTemp(data.temperature)}
      </Title>
      <Title level={3} style={{ margin: "8px 0", color: "#666" }}>
        {data.location}, {data.country}
      </Title>
      <Tag color="blue" style={{ fontSize: "14px", padding: "4px 12px" }}>
        {data.description}
      </Tag>
      <div style={{ marginTop: "8px" }}>
        <Text type="secondary">
          khoảng {formatTemp(data.feelsLike)}
        </Text>
      </div>
    </div>
  );
};

export default WeatherDisplay; 