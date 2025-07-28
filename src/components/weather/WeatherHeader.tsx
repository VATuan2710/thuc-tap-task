import React from 'react';
import { Card, Button, Typography } from 'antd';
import { CloudOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const WeatherHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ textAlign: "center", flex: 1 }}>
          <Title level={2} style={{ margin: 0, color: "#52c41a" }}>
            <CloudOutlined style={{ marginRight: "8px" }} />
            Weather App
          </Title>
          <Text type="secondary">
            Dự báo thời tiết chính xác
          </Text>
        </div>
        <Button
          type="default"
          icon={<HomeOutlined />}
          onClick={() => navigate('/')}
          style={{ borderRadius: "8px" }}
        >
          Trang chủ
        </Button>
      </div>
    </Card>
  );
};

export default WeatherHeader; 