import React from "react";
import { Select, Space, Badge, Typography } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { TodoFilterProps, FilterType } from "../../types/todo";

const { Text } = Typography;
const { Option } = Select;

const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  todoCount,
}) => {
  const handleFilterChange = (value: FilterType) => {
    onFilterChange(value);
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
          Bộ lọc:
        </Text>
        <Select
          value={currentFilter}
          onChange={handleFilterChange}
          style={{ width: "100%" }}
          size="middle"
          placeholder="Chọn bộ lọc"
        >
          <Option value="all">
            <Space>
              <UnorderedListOutlined style={{ color: "#1890ff" }} />
              <span>Tất cả</span>
              <Badge
                count={todoCount.all}
                style={{ backgroundColor: "#1890ff" }}
              />
            </Space>
          </Option>
          <Option value="pending">
            <Space>
              <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
              <span>Chưa hoàn thành</span>
              <Badge
                count={todoCount.pending}
                style={{ backgroundColor: "#ff4d4f" }}
              />
            </Space>
          </Option>
          <Option value="in-progress">
            <Space>
              <ClockCircleOutlined style={{ color: "#faad14" }} />
              <span>Đang thực hiện</span>
              <Badge
                count={todoCount["in-progress"]}
                style={{ backgroundColor: "#faad14" }}
              />
            </Space>
          </Option>
          <Option value="completed">
            <Space>
              <CheckCircleOutlined style={{ color: "#52c41a" }} />
              <span>Hoàn thành</span>
              <Badge
                count={todoCount.completed}
                style={{ backgroundColor: "#52c41a" }}
              />
            </Space>
          </Option>
        </Select>
      </Space>
    </div>
  );
};

export default TodoFilter;
