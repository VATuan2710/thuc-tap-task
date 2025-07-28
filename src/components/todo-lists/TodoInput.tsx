import React, { useState } from "react";
import { Input, Button, DatePicker, Space, Typography } from "antd";
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons";
import type { TodoInputProps } from "../../types/todo";
import dayjs, { Dayjs } from "dayjs";

const { Text } = Typography;

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [expectedDate, setExpectedDate] = useState<Dayjs | null>(null);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const expectedCompletionDate = expectedDate
        ? expectedDate.toDate()
        : undefined;
      onAddTodo(inputValue.trim(), expectedCompletionDate);
      setInputValue("");
      setExpectedDate(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const disabledDate = (current: Dayjs) => {
    // Disable dates before today
    return current && current < dayjs().startOf("day");
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
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Text
            strong
            style={{ color: "#595959", marginBottom: "8px", display: "block" }}
          >
            Thêm công việc mới:
          </Text>
          <Input
            placeholder="Nhập việc cần làm..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            size="large"
          />
        </div>

        <div>
          <Text
            style={{ color: "#595959", marginBottom: "8px", display: "block" }}
          >
            <CalendarOutlined style={{ marginRight: "4px" }} />
            Thời gian dự kiến hoàn thành (tùy chọn):
          </Text>
          <DatePicker
            value={expectedDate}
            onChange={setExpectedDate}
            placeholder="Chọn ngày dự kiến hoàn thành"
            style={{ width: "100%" }}
            size="large"
            disabledDate={disabledDate}
            showTime={{ format: "HH:mm" }}
            format="DD/MM/YYYY HH:mm"
          />
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleSubmit}
          size="large"
          style={{ width: "100%" }}
          disabled={!inputValue.trim()}
        >
          Thêm công việc
        </Button>
      </Space>
    </div>
  );
};

export default TodoInput;
