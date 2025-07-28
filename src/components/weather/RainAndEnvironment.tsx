import React from 'react';
import { Card, Row, Col, Progress, Space, Typography } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';
import type { WeatherData } from '../../types/weather';

const { Text } = Typography;

interface RainAndEnvironmentProps {
  data: WeatherData;
}

const RainAndEnvironment: React.FC<RainAndEnvironmentProps> = ({ data }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card style={{ borderRadius: "8px" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <DropboxOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
              <Text strong>Khả năng có mưa</Text>
            </div>
            <Progress 
              percent={data.rainChance} 
              strokeColor="#1890ff"
              format={(percent) => `${percent}%`}
              size="small"
            />
            <Text type="secondary">Lượng mưa dự kiến: {data.rainAmount}mm</Text>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default RainAndEnvironment; 