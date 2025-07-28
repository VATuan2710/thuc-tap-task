import React from "react";
import { Select, Space, Typography } from "antd";
import { ClockCircleOutlined, FontSizeOutlined } from "@ant-design/icons";
import type { TodoSortProps, SortType } from "../../types/todo";

const { Text } = Typography;
const { Option } = Select;

const TodoSort: React.FC<TodoSortProps> = ({ currentSort, onSortChange }) => {
  const handleSortChange = (value: SortType) => {
    onSortChange(value);
  };
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        border: "1px solid #f0f0f0",
      }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Text strong style={{ color: "#595959" }}>
          Sắp xếp:
        </Text>
        <Select
          value={currentSort}
          onChange={handleSortChange}
          style={{ width: "100%" }}
          size="middle"
          placeholder="Chọn cách sắp xếp"
        >
          <Option value="newest">
            <Space>
              <ClockCircleOutlined style={{ color: "#1890ff" }} />
              <span>Mới nhất trước</span>
            </Space>
          </Option>
          <Option value="oldest">
            <Space>
              <ClockCircleOutlined style={{ color: "#faad14" }} />
              <span>Cũ nhất trước</span>
            </Space>
          </Option>
          <Option value="alphabetical">
            <Space>
              <FontSizeOutlined style={{ color: "#52c41a" }} />
              <span>A → Z</span>
            </Space>
          </Option>
          <Option value="reverse-alphabetical">
            <Space>
              <FontSizeOutlined style={{ color: "#f5222d" }} />
              <span>Z → A</span>
            </Space>
          </Option>
        </Select>
      </Space>
    </div>
  );
};

export default TodoSort;
