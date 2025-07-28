import React, { useState, useEffect } from 'react';
import { Card, Input, Space, message } from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const { Search } = Input;

interface WeatherMapProps {
  onSearch: (city: string) => void;
  onLocationSelect: (lat: number, lon: number) => void;
}

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component để handle click events trên map
const MapClickHandler: React.FC<{ onLocationSelect: (lat: number, lon: number) => void }> = ({ onLocationSelect }) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
};

const WeatherMap: React.FC<WeatherMapProps> = ({ onSearch, onLocationSelect }) => {
  const [searchCity, setSearchCity] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([21.0285, 105.8542]); // Hanoi default

  const handleSearch = (value: string) => {
    if (value.trim()) {
      onSearch(value.trim());
      setSearchCity('');
    }
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    setSelectedPosition([lat, lon]);
    onLocationSelect(lat, lon);
    message.success(`Đã chọn vị trí: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
  };

  useEffect(() => {
    // Load CSS for Leaflet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Search Section */}
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

        {/* Map Section */}
        <div style={{ height: "350px", borderRadius: "8px", overflow: "hidden" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            marginBottom: "8px",
            fontSize: "14px",
            color: "#666"
          }}>
            <EnvironmentOutlined />
            <span>Nhấp vào bản đồ để chọn vị trí và xem thời tiết</span>
          </div>
          
          <MapContainer
            center={selectedPosition}
            zoom={6}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
            <MapClickHandler onLocationSelect={handleLocationSelect} />
          </MapContainer>
        </div>
      </Space>
    </Card>
  );
};

export default WeatherMap; 