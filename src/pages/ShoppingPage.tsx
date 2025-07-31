import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Select,
  Input,
  Button,
  Drawer,
  Badge,
  Alert,
  Spin,
  Empty,
} from "antd";
import {
  ShoppingCartOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cart/ProductCard";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { mockProducts, getAllCategories } from "../data/mockProducts";
import {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartError,
  clearError,
} from "../store/cartSlice";
import type { Product } from "../types/cart";

const { Title, Text } = Typography;
const { Search } = Input;

const ShoppingPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const cartError = useSelector(selectCartError);
  


  // Local state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cartDrawerVisible, setCartDrawerVisible] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading effect
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // Filter products based on category and search term
  useEffect(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm]);

  const categories = getAllCategories();

  const handleClearError = () => {
    dispatch(clearError());
  };



  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Tech Store
          </Title>
          <Text type="secondary">
            Khám phá những sản phẩm công nghệ
          </Text>
        </div>

        {/* Cart Button */}
        <Badge count={totalQuantity} size="small">
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={() => setCartDrawerVisible(true)}
          >
            Giỏ hàng
          </Button>
        </Badge>
      </div>

      {/* Error Alert */}
      {cartError && (
        <Alert
          message={cartError}
          type="error"
          closable
          onClose={handleClearError}
          style={{ marginBottom: "16px" }}
        />
      )}

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={8}>
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            size="large"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select
            size="large"
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ width: "100%" }}
            placeholder="Chọn danh mục"
            suffixIcon={<FilterOutlined />}
          >
            <Select.Option value="all">Tất cả danh mục</Select.Option>
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={8}>
          <div
            style={{ display: "flex", alignItems: "center", height: "40px" }}
          >
            <Text type="secondary">
              Hiển thị {filteredProducts.length} / {mockProducts.length} sản
              phẩm
            </Text>
          </div>
        </Col>
      </Row>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Empty
          description="Không tìm thấy sản phẩm nào"
          style={{ marginTop: "60px" }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}

      {/* Cart Drawer */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShoppingCartOutlined />
            <span>Giỏ hàng của bạn</span>
            {totalQuantity > 0 && (
              <Badge count={totalQuantity} style={{ marginLeft: "8px" }} />
            )}
          </div>
        }
        placement="right"
        onClose={() => setCartDrawerVisible(false)}
        open={cartDrawerVisible}
        width={480}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* Cart Items */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              paddingBottom: "0",
            }}
          >
            {cartItems.length === 0 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '200px',
                color: '#999'
              }}>
                <ShoppingCartOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <Text type="secondary">Giỏ hàng trống</Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Hãy thêm sản phẩm vào giỏ hàng
                </Text>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))
            )}
          </div>

          {/* Cart Summary */}
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              padding: "16px",
              backgroundColor: "#fafafa",
            }}
          >
            <CartSummary />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ShoppingPage;
