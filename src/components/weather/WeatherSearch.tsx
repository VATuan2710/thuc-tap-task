import React, { useState } from 'react';
import { Card, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState<string>('');

  const handleSearch = (value: string) => {
    if (value.trim()) {
      onSearch(value.trim());
      setSearchCity('');
    }
  };

  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Search
            placeholder="Nhập tên thành phố..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onSearch={handleSearch}
            style={{ flex: 1 }}
            size="large"
            enterButton={<SearchOutlined />}
          />
        </div>
      </Space>
    </Card>
  );
};

export default WeatherSearch; 