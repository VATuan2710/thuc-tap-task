import React from 'react';
import { Space, Button } from 'antd';

interface QuickActionsProps {
  onCitySelect: (city: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onCitySelect }) => {
  const cities = [
    { name: 'TP.HCM', value: 'Ho Chi Minh City' },
    { name: 'Hà Nội', value: 'Hanoi' },
    { name: 'Đà Nẵng', value: 'Da Nang' },
    { name: 'Cần Thơ', value: 'Can Tho' }
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "24px" }}>
      <Space wrap>
        {cities.map((city) => (
          <Button 
            key={city.value}
            onClick={() => onCitySelect(city.value)}
          >
            {city.name}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default QuickActions; 