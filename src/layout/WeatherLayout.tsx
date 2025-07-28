import React from 'react';

interface WeatherLayoutProps {
  children: React.ReactNode;
}

const WeatherLayout: React.FC<WeatherLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default WeatherLayout; 