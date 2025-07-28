import React from 'react';
import { Row, Col, Card, Space, Typography } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';
import type { WeatherData } from '../../types/weather';

const { Text } = Typography;

interface ForecastCardsProps {
  forecast: WeatherData['forecast'];
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ forecast }) => {
  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

  return (
    <Row gutter={[8, 8]}>
      {forecast.map((day, index) => (
        <Col xs={24} sm={4.8} key={index}>
          <Card 
            size="small" 
            style={{ 
              textAlign: "center", 
              borderRadius: "8px",
              background: index === 0 ? "#f6ffed" : "white"
            }}
          >
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Text strong style={{ color: index === 0 ? "#52c41a" : "inherit" }}>
                {day.day}
              </Text>
              <div style={{ fontSize: "24px" }}>
                {day.icon}
              </div>
              <div>
                <Text strong>{formatTemp(day.high)}</Text>
                <Text type="secondary" style={{ marginLeft: "4px" }}>
                  {formatTemp(day.low)}
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <DropboxOutlined style={{ fontSize: "12px", color: "#1890ff" }} />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {day.rainChance}%
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ForecastCards; 