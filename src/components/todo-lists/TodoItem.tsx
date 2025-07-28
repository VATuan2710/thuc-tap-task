import React, { useState } from "react";
import {
  List,
  Checkbox,
  Button,
  Typography,
  Space,
  Input,
  Select,
  Tag,
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { TodoItemProps, TodoStatus } from "../../types/todo";
import dayjs, { Dayjs } from "dayjs";

const { Text } = Typography;
const { Option } = Select;

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onStatusChange,
  onSelectionChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editStatus, setEditStatus] = useState(todo.status);
  const [editExpectedDate, setEditExpectedDate] = useState<Dayjs | null>(
    todo.expectedCompletionDate ? dayjs(todo.expectedCompletionDate) : null
  );

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditStatus(todo.status);
    setEditExpectedDate(
      todo.expectedCompletionDate ? dayjs(todo.expectedCompletionDate) : null
    );
  };

  const handleSave = () => {
    if (editText.trim()) {
      const expectedCompletionDate = editExpectedDate
        ? editExpectedDate.toDate()
        : undefined;
      onEdit(todo.id, editText.trim(), expectedCompletionDate);
      onStatusChange(todo.id, editStatus);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditStatus(todo.status);
    setEditExpectedDate(
      todo.expectedCompletionDate ? dayjs(todo.expectedCompletionDate) : null
    );
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleSelection = (checked: boolean) => {
    onSelectionChange(todo.id, checked);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const getStatusIcon = (status: TodoStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "in-progress":
        return <ClockCircleOutlined style={{ color: "#faad14" }} />;
      case "pending":
        return <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />;
      default:
        return <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />;
    }
  };

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case "completed":
        return "#f6ffed";
      case "in-progress":
        return "#fffbe6";
      case "pending":
        return "#fff2f0";
      default:
        return "#fff";
    }
  };

  const getStatusTag = (status: TodoStatus) => {
    const statusMap = {
      pending: { text: "Chưa hoàn thành", color: "red" },
      "in-progress": { text: "Đang thực hiện", color: "orange" },
      completed: { text: "Hoàn thành", color: "green" },
    };
    const statusInfo = statusMap[status];
    return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
  };

  return (
    <List.Item
      style={{
        padding: "12px 16px",
        backgroundColor: getStatusColor(todo.status),
        borderRadius: "6px",
        marginBottom: "8px",
        border: "1px solid #f0f0f0",
      }}
      actions={
        isEditing
          ? [
              <Button
                key="save"
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                size="small"
              >
                Lưu
              </Button>,
              <Button
                key="cancel"
                icon={<CloseOutlined />}
                onClick={handleCancel}
                size="small"
              >
                Hủy
              </Button>,
            ]
          : [
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={handleEdit}
                size="small"
              >
                Sửa
              </Button>,
              <Button
                key="delete"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                size="small"
              >
                Xóa
              </Button>,
            ]
      }
    >
      <List.Item.Meta
        avatar={
          <Space>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor:
                  todo.status === "completed" ? "#52c41a" : "#1890ff",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {todo.order}
            </div>
            <Checkbox
              checked={todo.selected || false}
              onChange={(e) => handleSelection(e.target.checked)}
            />
          </Space>
        }
        title={
          isEditing ? (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onPressEnter={handleSave}
                placeholder="Nhập nội dung việc cần làm..."
              />
              <Space style={{ width: "100%" }}>
                <Select
                  value={editStatus}
                  onChange={setEditStatus}
                  style={{ width: 200 }}
                >
                  <Option value="pending">Chưa hoàn thành</Option>
                  <Option value="in-progress">Đang thực hiện</Option>
                  <Option value="completed">Hoàn thành</Option>
                </Select>
                <DatePicker
                  value={editExpectedDate}
                  onChange={setEditExpectedDate}
                  placeholder="Ngày dự kiến"
                  style={{ flex: 1 }}
                  showTime={{ format: "HH:mm" }}
                  format="DD/MM/YYYY HH:mm"
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
              </Space>
            </Space>
          ) : (
            <Space>
              {getStatusIcon(todo.status)}
              <Text
                style={{
                  textDecoration:
                    todo.status === "completed" ? "line-through" : "none",
                  color: todo.status === "completed" ? "#999" : "#000",
                }}
              >
                {todo.text}
              </Text>
              {getStatusTag(todo.status)}
            </Space>
          )
        }
        description={
          <div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Tạo lúc: {formatDate(todo.createdAt)}
            </Text>

            {todo.expectedCompletionDate && (
              <>
                <br />
                <Text
                  type="secondary"
                  style={{ fontSize: "12px", color: "#faad14" }}
                >
                  Dự kiến hoàn thành: {formatDate(todo.expectedCompletionDate)}
                </Text>
              </>
            )}

            {todo.completedAt && (
              <>
                <br />
                <Text
                  type="secondary"
                  style={{ fontSize: "12px", color: "#52c41a" }}
                >
                  Hoàn thành lúc: {formatDate(todo.completedAt)}
                </Text>
              </>
            )}
          </div>
        }
      />
    </List.Item>
  );
};

export default TodoItem;
