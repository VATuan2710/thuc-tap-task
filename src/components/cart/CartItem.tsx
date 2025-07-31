import React from 'react';
import { Card, Button, InputNumber, Typography, Image, Space, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import type { CartItem as CartItemType } from '../../types/cart';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { formatPrice } from '../../data/mockProducts';

const { Text, Title } = Typography;

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart({ itemId: item.id }));
  };

  const handleQuantityChange = (newQuantity: number | null) => {
    if (newQuantity && newQuantity > 0) {
      dispatch(updateQuantity({ itemId: item.id, quantity: newQuantity }));
    }
  };

  const handleIncrement = () => {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= item.product.stock) {
      dispatch(updateQuantity({ itemId: item.id, quantity: newQuantity }));
    }
  };

  const handleDecrement = () => {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ itemId: item.id, quantity: newQuantity }));
    } else {
      handleRemove();
    }
  };

  const totalPrice = item.product.price * item.quantity;

  return (
    <Card 
      size="small" 
      style={{ marginBottom: '12px' }}
      bodyStyle={{ padding: '16px' }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {/* Product Image */}
        <div style={{ flexShrink: 0 }}>
          <Image
            src={item.product.image}
            alt={item.product.name}
            width={80}
            height={80}
            style={{ borderRadius: '8px', objectFit: 'cover' }}
            preview={false}
          />
        </div>

        {/* Product Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
            {item.product.name}
          </Title>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {item.product.category}
          </Text>
          <div style={{ marginTop: '8px' }}>
            <Text strong style={{ color: '#ff4d4f' }}>
              {formatPrice(item.product.price)}
            </Text>
            <Text type="secondary" style={{ marginLeft: '8px', fontSize: '12px' }}>
              × {item.quantity} = {formatPrice(totalPrice)}
            </Text>
          </div>
        </div>

        {/* Quantity Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            size="small"
            icon={<MinusOutlined />}
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
          />
          
          <InputNumber
            size="small"
            min={1}
            max={item.product.stock}
            value={item.quantity}
            onChange={handleQuantityChange}
            style={{ width: '60px' }}
            controls={false}
          />
          
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={handleIncrement}
            disabled={item.quantity >= item.product.stock}
          />
        </div>

        {/* Remove Button */}
        <div style={{ flexShrink: 0 }}>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?"
            onConfirm={handleRemove}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              style={{ color: '#ff4d4f' }}
            />
          </Popconfirm>
        </div>
      </div>

      {/* Stock Warning */}
      {item.quantity >= item.product.stock && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
          <Text type="warning" style={{ fontSize: '12px' }}>
            Bạn đã chọn tối đa số lượng có sẵn ({item.product.stock})
          </Text>
        </div>
      )}

      {/* Added Date */}
      <div style={{ marginTop: '8px', textAlign: 'right' }}>
        <Text type="secondary" style={{ fontSize: '11px' }}>
          Thêm vào: {new Date(item.addedAt).toLocaleDateString('vi-VN')} {new Date(item.addedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </div>
    </Card>
  );
};

export default CartItem; 