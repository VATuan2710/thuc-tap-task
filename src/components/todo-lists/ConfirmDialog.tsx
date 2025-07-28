import React from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  content,
  onConfirm,
  onCancel,
  okText = 'Xóa',
  cancelText = 'Hủy'
}) => {
  const handleOk = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
          {title}
        </div>
      }
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {cancelText}
        </Button>,
        <Button key="confirm" type="primary" danger onClick={handleOk}>
          {okText}
        </Button>
      ]}
    >
      <div style={{ paddingLeft: '24px' }}>
        {content}
      </div>
    </Modal>
  );
};

export default ConfirmDialog; 