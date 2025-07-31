import React from 'react';
import { Card, Button, Typography, Space, Row, Col } from 'antd';
import { CheckSquareOutlined, CloudOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          textAlign: "center",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Title level={1} style={{ color: "#1890ff", marginBottom: "8px" }}>
              Welcome to My Apps
            </Title>
            <Paragraph style={{ fontSize: "16px", color: "#666" }}>
              Chọn ứng dụng bạn muốn sử dụng
            </Paragraph>
          </div>

          <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
            <Col xs={24} md={8}>
              <Card
                hoverable
                style={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "12px",
                  border: "2px solid #1890ff",
                }}
                onClick={() => navigate('/todo')}
              >
                <Space direction="vertical" size="middle" style={{ textAlign: "center" }}>
                  <CheckSquareOutlined 
                    style={{ 
                      fontSize: "48px", 
                      color: "#1890ff" 
                    }} 
                  />
                  <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
                    Todo List
                  </Title>
                  <Paragraph style={{ margin: 0, color: "#666" }}>
                    Quản lý công việc hàng ngày
                  </Paragraph>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                hoverable
                style={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "12px",
                  border: "2px solid #52c41a",
                }}
                onClick={() => navigate('/weather')}
              >
                <Space direction="vertical" size="middle" style={{ textAlign: "center" }}>
                  <CloudOutlined 
                    style={{ 
                      fontSize: "48px", 
                      color: "#52c41a" 
                    }} 
                  />
                  <Title level={3} style={{ margin: 0, color: "#52c41a" }}>
                    Weather App
                  </Title>
                  <Paragraph style={{ margin: 0, color: "#666" }}>
                    Dự báo thời tiết
                  </Paragraph>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                hoverable
                style={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "12px",
                  border: "2px solid #ff4d4f",
                }}
                onClick={() => navigate('/shopping')}
              >
                <Space direction="vertical" size="middle" style={{ textAlign: "center" }}>
                  <ShoppingCartOutlined 
                    style={{ 
                      fontSize: "48px", 
                      color: "#ff4d4f" 
                    }} 
                  />
                  <Title level={3} style={{ margin: 0, color: "#ff4d4f" }}>
                    Shopping Cart
                  </Title>
                  <Paragraph style={{ margin: 0, color: "#666" }}>
                    Mua sắm 
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: "32px" }}>
            <Space size="middle" wrap>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/todo')}
                style={{ 
                  borderRadius: "8px",
                  padding: "0 24px",
                  height: "48px"
                }}
              >
                <CheckSquareOutlined />
                Todo List
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/weather')}
                style={{ 
                  backgroundColor: "#52c41a",
                  borderColor: "#52c41a",
                  borderRadius: "8px",
                  padding: "0 24px",
                  height: "48px"
                }}
              >
                <CloudOutlined />
                Weather App
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/shopping')}
                style={{ 
                  backgroundColor: "#ff4d4f",
                  borderColor: "#ff4d4f",
                  borderRadius: "8px",
                  padding: "0 24px",
                  height: "48px"
                }}
              >
                <ShoppingCartOutlined />
                Shopping Cart
              </Button>
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default HomePage; 