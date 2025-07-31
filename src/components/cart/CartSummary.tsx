import React from 'react';
import { Card, Button, Divider, Typography, Space, Alert } from 'antd';
import { ShoppingOutlined, CreditCardOutlined, GiftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartSummary, selectCartItems, selectCartTotalQuantity, clearCart } from '../../store/cartSlice';
import { formatPrice } from '../../data/mockProducts';

const { Title, Text } = Typography;

const CartSummary: React.FC = () => {
  const dispatch = useDispatch();
  const cartSummary = useSelector(selectCartSummary);
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  


  const handleCheckout = () => {
    // Simulate checkout process
    alert(`Thanh toán thành công! 
Tổng: ${formatPrice(cartSummary.total)}
Số lượng: ${cartSummary.itemCount} sản phẩm
Cảm ơn bạn đã mua hàng!`);
    
    // Clear cart after successful checkout
    dispatch(clearCart());
  };



  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingOutlined />
          <span>Tóm tắt đơn hàng</span>
        </div>
      }
      extra={
        <Text type="secondary">
          {totalQuantity} sản phẩm
        </Text>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {/* Subtotal */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Tạm tính:</Text>
          <Text strong>{formatPrice(cartSummary.subtotal)}</Text>
        </div>

        {/* Tax */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Thuế VAT (10%):</Text>
          <Text>{formatPrice(cartSummary.tax)}</Text>
        </div>

        {/* Shipping */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Text>Phí vận chuyển:</Text>
            {cartSummary.shipping === 0 && (
              <GiftOutlined style={{ color: '#52c41a' }} />
            )}
          </div>
          <div>
            {cartSummary.shipping === 0 ? (
              <Text style={{ color: '#52c41a' }}>Miễn phí</Text>
            ) : (
              <Text>{formatPrice(cartSummary.shipping)}</Text>
            )}
          </div>
        </div>

        {/* Free shipping notice */}
        {cartSummary.shipping > 0 && cartSummary.subtotal < 50000000 && (
          <Alert
            message={`Mua thêm ${formatPrice(50000000 - cartSummary.subtotal)} để được miễn phí vận chuyển!`}
            type="info"
            showIcon
            style={{ fontSize: '12px' }}
          />
        )}

        <Divider style={{ margin: '12px 0' }} />

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>
            Tổng cộng:
          </Title>
          <Title level={3} style={{ margin: 0, color: '#ff4d4f' }}>
            {formatPrice(cartSummary.total)}
          </Title>
        </div>

        {/* Checkout Button */}
        <Button
          type="primary"
          size="large"
          icon={<CreditCardOutlined />}
          onClick={handleCheckout}
          block
          style={{
            height: '48px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '16px'
          }}
        >
          Thanh toán ngay
        </Button>

        {/* Payment Methods */}
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
           Hỗ trợ: Visa, MasterCard, Momo, ZaloPay
          </Text>
        </div>

        {/* Security Notice */}
        <div style={{ 
          backgroundColor: '#f6ffed', 
          padding: '8px', 
          borderRadius: '6px',
          border: '1px solid #b7eb8f'
        }}>
          <Text style={{ fontSize: '11px', color: '#389e0d' }}>
            Thanh toán an toàn với mã hóa SSL 256-bit
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default CartSummary; 