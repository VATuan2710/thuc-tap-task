import React from 'react';
import { Space, Alert } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import type { WeatherData } from '../../types/weather';

interface WeatherAlertsProps {
  alerts: WeatherData['alerts'];
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  // Function để get alert icon
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'warning': return <WarningOutlined style={{ color: '#faad14' }} />;
      default: return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          type={alert.type}
          icon={getAlertIcon(alert.type)}
          message={alert.title}
          description={alert.description}
          style={{ borderRadius: "8px" }}
          showIcon
        />
      ))}
    </Space>
  );
};

export default WeatherAlerts; 