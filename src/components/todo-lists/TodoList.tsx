import React from "react";
import { List, Empty, Button, Space, Typography } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import TodoItem from "./TodoItem";
import type { TodoListProps } from "../../types/todo";

const { Text } = Typography;

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onStatusChange,
  onSelectionChange,
  onBulkDelete,
  selectedCount,
}) => {
  if (todos.length === 0) {
    return (
      <Empty
        image={<InboxOutlined style={{ fontSize: "64px", color: "#d9d9d9" }} />}
        description="Chưa có việc nào cần làm"
        style={{ padding: "40px 0" }}
      />
    );
  }

  return (
    <div>
      {selectedCount > 0 && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px",
            backgroundColor: "#e6f7ff",
            borderRadius: "6px",
            border: "1px solid #91d5ff",
          }}
        >
          <Space>
            <Text>Đã chọn {selectedCount} việc</Text>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={onBulkDelete}
              size="small"
            >
              Xóa đã chọn
            </Button>
          </Space>
        </div>
      )}

      <List
        style={{
          backgroundColor: "#fafafa",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
        }}
        dataSource={todos}
        renderItem={(todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
            onSelectionChange={onSelectionChange}
          />
        )}
      />
    </div>
  );
};

export default TodoList;
