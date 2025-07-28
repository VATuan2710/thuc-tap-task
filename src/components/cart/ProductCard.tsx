import React from 'react';
import { Card, Button, Typography, Rate, Tag, Image } from 'antd';
import { ShoppingCartOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { Product } from '../../types/cart';
import { addToCart, selectCartItems } from '../../store/cartSlice';
import { formatPrice } from '../../data/mockProducts';

const { Title, Text, Paragraph } = Typography;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  
  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.product.id === product.id);
  const cartItem = cartItems.find(item => item.product.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const getStockStatusColor = (stock: number) => {
    if (stock > 20) return 'success';
    if (stock > 5) return 'warning';
    return 'error';
  };

  const getStockStatusText = (stock: number) => {
    if (stock > 20) return 'Còn hàng';
    if (stock > 5) return 'Sắp hết';
    if (stock > 0) return 'Còn ít';
    return 'Hết hàng';
  };

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <div style={{ height: 200, overflow: 'hidden' }}>
          <Image
            alt={product.name}
            src={product.image}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
            preview={false}
          />
        </div>
      }
      actions={[
        <Button
          key="add-to-cart"
          type={isInCart ? "default" : "primary"}
          icon={isInCart ? <CheckOutlined /> : <ShoppingCartOutlined />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={{ width: '90%' }}
        >
          {isInCart 
            ? `Đã thêm (${cartItem?.quantity})` 
            : product.stock === 0 
              ? 'Hết hàng' 
              : 'Thêm vào giỏ'
          }
        </Button>
      ]}
    >
      <div style={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
        {/* Category */}
        <Tag color="blue" style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
          {product.category}
        </Tag>

        {/* Product Name */}
        <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
          {product.name}
        </Title>

        {/* Rating */}
        <div style={{ marginBottom: '8px' }}>
          <Rate disabled defaultValue={product.rating} style={{ fontSize: '14px' }} />
          <Text type="secondary" style={{ marginLeft: '8px', fontSize: '12px' }}>
            ({product.rating})
          </Text>
        </div>

        {/* Description */}
        <Paragraph 
          ellipsis={{ rows: 2 }}
          type="secondary"
          style={{ fontSize: '13px', margin: '0 0 auto 0' }}
        >
          {product.description}
        </Paragraph>

        {/* Price and Stock */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <Text strong style={{ fontSize: '16px', color: '#ff4d4f' }}>
              {formatPrice(product.price)}
            </Text>
            <Tag color={getStockStatusColor(product.stock)}>
              {getStockStatusText(product.stock)}
            </Tag>
          </div>
          
          {product.stock > 0 && product.stock <= 10 && (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Chỉ còn {product.stock} sản phẩm
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard; 