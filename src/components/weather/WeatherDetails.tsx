import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { EyeOutlined, ThunderboltOutlined, SendOutlined, DashboardOutlined } from '@ant-design/icons';
import type { WeatherData } from '../../types/weather';

const { Text } = Typography;

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={12} sm={6}>
        <Card 
          size="small" 
          style={{ textAlign: "center", borderRadius: "8px" }}
        >
          <EyeOutlined style={{ fontSize: "24px", color: "#1890ff", marginBottom: "8px" }} />
          <div>
            <Text strong>{data.visibility} km</Text>
          </div>
          <div>
            <Text type="secondary">Tầm nhìn</Text>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card 
          size="small" 
          style={{ textAlign: "center", borderRadius: "8px" }}
        >
          <ThunderboltOutlined style={{ fontSize: "24px", color: "#fa8c16", marginBottom: "8px" }} />
          <div>
            <Text strong>{data.humidity}%</Text>
          </div>
          <div>
            <Text type="secondary">Độ ẩm</Text>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card 
          size="small" 
          style={{ textAlign: "center", borderRadius: "8px" }}
        >
          <SendOutlined style={{ fontSize: "24px", color: "#52c41a", marginBottom: "8px" }} />
          <div>
            <Text strong>{data.windSpeed} km/h</Text>
          </div>
          <div>
            <Text type="secondary">Tốc độ gió</Text>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card 
          size="small" 
          style={{ textAlign: "center", borderRadius: "8px" }}
        >
          <DashboardOutlined style={{ fontSize: "24px", color: "#722ed1", marginBottom: "8px" }} />
          <div>
            <Text strong>{data.pressure} hPa</Text>
          </div>
          <div>
            <Text type="secondary">Áp suất</Text>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default WeatherDetails; 