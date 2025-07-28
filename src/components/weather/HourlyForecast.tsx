import React from 'react';
import { Card, Space, Typography, Row, Col } from 'antd';
import { DropboxOutlined, SendOutlined, ThunderboltOutlined } from '@ant-design/icons';
import type { WeatherData } from '../../types/weather';

const { Text } = Typography;

interface HourlyForecastProps {
  hourlyForecast: WeatherData['hourlyForecast'];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyForecast }) => {
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  // Lấy 12 giờ đầu để hiển thị
  const displayHours = hourlyForecast.slice(0, 12);
  
  // Nhiệt độ hiện tại làm baseline để so sánh
  const currentTemp = displayHours[0]?.temperature || 25;

  return (
    <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
      <div style={{ display: 'flex', gap: '12px', minWidth: 'max-content', padding: '8px 0' }}>
        {displayHours.map((hour, index) => (
          <Card
            key={index}
            size="small"
            style={{
              minWidth: '120px',
              textAlign: 'center',
              borderRadius: '12px',
              background: hour.isNow ? '#e6f7ff' : 'white',
              border: hour.isNow ? '2px solid #1890ff' : '1px solid #d9d9d9',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            bodyStyle={{ padding: '12px 8px' }}
            hoverable
          >
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {/* Time */}
              <Text 
                strong={hour.isNow} 
                style={{ 
                  fontSize: '12px',
                  color: hour.isNow ? '#1890ff' : '#666'
                }}
              >
                {hour.time}
              </Text>
              
              {/* Weather Icon */}
              <div style={{ fontSize: '24px', margin: '4px 0' }}>
                {hour.icon}
              </div>
              
              {/* Temperature */}
              <Text 
                strong 
                style={{ 
                  fontSize: '16px',
                  color: hour.isNow ? '#1890ff' : '#000'
                }}
              >
                {formatTemp(hour.temperature)}
              </Text>
              
              {/* Rain Chance */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <DropboxOutlined style={{ fontSize: '10px', color: '#1890ff' }} />
                <Text style={{ fontSize: '10px', color: '#666' }}>
                  {hour.rainChance}%
                </Text>
              </div>
              
              {/* Additional Info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <SendOutlined style={{ fontSize: '8px', color: '#52c41a' }} />
                  <Text style={{ fontSize: '9px', color: '#666' }}>
                    {hour.windSpeed}
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <ThunderboltOutlined style={{ fontSize: '8px', color: '#fa8c16' }} />
                  <Text style={{ fontSize: '9px', color: '#666' }}>
                    {hour.humidity}%
                  </Text>
                </div>
              </div>
            </Space>
          </Card>
        ))}
      </div>
      
      {/* Temperature Trend Graph */}
      <div style={{ marginTop: '16px', padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
        <Text strong style={{ fontSize: '14px', marginBottom: '12px', display: 'block' }}>
          Xu hướng nhiệt độ 12h tới
        </Text>
        <div style={{ position: 'relative', height: '60px' }}>
          {/* Temperature line visualization */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'end', 
            justifyContent: 'space-between',
            height: '100%',
            position: 'relative'
          }}>
            {displayHours.map((hour, index) => {
              const maxTemp = Math.max(...displayHours.map(h => h.temperature));
              const minTemp = Math.min(...displayHours.map(h => h.temperature));
              const tempRange = maxTemp - minTemp || 1;
              const height = ((hour.temperature - minTemp) / tempRange) * 40 + 10;
              
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1
                  }}
                >
                  {/* Temperature value */}
                  <Text style={{ 
                    fontSize: '10px', 
                    marginBottom: '4px',
                    color: hour.isNow ? '#1890ff' : '#666',
                    fontWeight: hour.isNow ? 'bold' : 'normal'
                  }}>
                    {formatTemp(hour.temperature)}
                  </Text>
                  {/* Temperature bar */}
                                     <div
                     style={{
                       width: '4px',
                       height: `${height}px`,
                       background: hour.isNow ? '#1890ff' : 
                                   hour.temperature > currentTemp ? '#ff7875' : 
                                   hour.temperature < currentTemp ? '#69c0ff' : '#52c41a',
                       borderRadius: '2px',
                       transition: 'all 0.3s ease'
                     }}
                   />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px', 
          marginTop: '12px',
          fontSize: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '3px', background: '#ff7875', borderRadius: '1px' }} />
            <Text style={{ fontSize: '10px' }}>Nóng hơn</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '3px', background: '#52c41a', borderRadius: '1px' }} />
            <Text style={{ fontSize: '10px' }}>Bình thường</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '3px', background: '#69c0ff', borderRadius: '1px' }} />
            <Text style={{ fontSize: '10px' }}>Mát hơn</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast; 