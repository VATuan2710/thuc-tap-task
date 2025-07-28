import React, { useState, useEffect, useMemo } from "react";
import { Card, Space, Typography, Divider, Row, Col, Button } from "antd";
import { CheckSquareOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TodoInput from "../components/todo-lists/TodoInput";
import TodoList from "../components/todo-lists/TodoList";
import TodoFilter from "../components/todo-lists/TodoFilter";
import TodoSort from "../components/todo-lists/TodoSort";
import ConfirmDialog from "../components/todo-lists/ConfirmDialog";
import {
  saveTodosToStorage,
  loadTodosFromStorage,
} from "../utils/localStorage";
import { sortTodos, filterTodos } from "../utils/todoUtils";
import type { Todo, FilterType, SortType, TodoStatus } from "../types/todo";

const { Title } = Typography;

const TodoPage: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortType, setSortType] = useState<SortType>("newest");
  const [nextOrder, setNextOrder] = useState<number>(1);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    content: "",
    okText: "Xóa",
    onConfirm: () => {},
  });

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = loadTodosFromStorage();

    // Handle migration from old format (completed boolean) to new format (status)
    const migratedTodos = savedTodos.map((todo, index) => {
      // @ts-ignore - handling migration from old format
      if (todo.completed !== undefined && !todo.status) {
        return {
          ...todo,
          // @ts-ignore
          status: todo.completed ? "completed" : ("pending" as TodoStatus),
          order: todo.order || index + 1,
          // For old completed todos, set completedAt to createdAt as fallback
          // @ts-ignore
          completedAt: todo.completed ? todo.createdAt : undefined,
          // @ts-ignore
          completed: undefined, // remove old field
        };
      }
      return {
        ...todo,
        order: todo.order || index + 1,
      };
    });

    setTodos(migratedTodos);
    setHasLoadedInitialData(true);

    // Set next order number
    const maxOrder = Math.max(
      0,
      ...migratedTodos.map((todo) => todo.order || 0)
    );
    setNextOrder(maxOrder + 1);
  }, []);

  // Save todos to localStorage whenever todos change (but not on initial load)
  useEffect(() => {
    if (!hasLoadedInitialData) {
      return;
    }

    // Always save, even if empty (user might have deleted all todos)
    saveTodosToStorage(todos);
  }, [todos, hasLoadedInitialData]);

  // Generate unique ID for new todos
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36);
  };

  // Add new todo
  const handleAddTodo = (text: string, expectedCompletionDate?: Date): void => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      status: "pending",
      createdAt: new Date(),
      expectedCompletionDate,
      order: nextOrder,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setNextOrder((prev) => prev + 1);
  };

  // Toggle todo completion status (legacy support)
  const handleToggleTodo = (id: string): void => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const newStatus =
            todo.status === "completed"
              ? "pending"
              : ("completed" as TodoStatus);
          const updatedTodo = { ...todo, status: newStatus };

          // Set completedAt when changing to completed
          if (newStatus === "completed") {
            updatedTodo.completedAt = new Date();
          }
          // Clear completedAt when changing from completed
          else {
            updatedTodo.completedAt = undefined;
          }

          return updatedTodo;
        }
        return todo;
      })
    );
  };

  // Edit todo text and expected completion date
  const handleEditTodo = (
    id: string,
    newText: string,
    expectedCompletionDate?: Date
  ): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, expectedCompletionDate }
          : todo
      )
    );
  };

  // Change todo status
  const handleStatusChange = (id: string, status: TodoStatus): void => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, status };

          // Set completedAt when status changes to completed
          if (status === "completed" && todo.status !== "completed") {
            updatedTodo.completedAt = new Date();
          }
          // Clear completedAt when status changes from completed to other status
          else if (status !== "completed" && todo.status === "completed") {
            updatedTodo.completedAt = undefined;
          }

          return updatedTodo;
        }
        return todo;
      })
    );
  };

  // Handle selection for bulk operations
  const handleSelectionChange = (id: string, selected: boolean): void => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, selected } : todo))
    );
  };

  // Delete single todo with confirmation
  const handleDeleteTodo = (id: string): void => {
    const todo = todos.find((t) => t.id === id);

    setConfirmDialog({
      open: true,
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa công việc "${todo?.text}"?`,
      okText: "Xóa",
      onConfirm: () => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        setConfirmDialog({ ...confirmDialog, open: false });
      },
    });
  };

  // Bulk delete selected todos with confirmation
  const handleBulkDelete = (): void => {
    const selectedTodos = todos.filter((todo) => todo.selected);
    const selectedCount = selectedTodos.length;

    if (selectedCount === 0) return;

    setConfirmDialog({
      open: true,
      title: "Xác nhận xóa hàng loạt",
      content: `Bạn có chắc chắn muốn xóa ${selectedCount} công việc đã chọn?`,
      okText: "Xóa tất cả",
      onConfirm: () => {
        setTodos((prev) => prev.filter((todo) => !todo.selected));
        setConfirmDialog({ ...confirmDialog, open: false });
      },
    });
  };

  // Handle confirm dialog cancel
  const handleConfirmCancel = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  // Filter and sort todos based on current filter and sort type
  const filteredAndSortedTodos = useMemo(() => {
    const filtered = filterTodos(todos, filter);
    return sortTodos(filtered, sortType);
  }, [todos, filter, sortType]);

  // Calculate todo counts for filter badges
  const todoCount = useMemo(
    () => ({
      all: todos.length,
      pending: todos.filter((todo) => todo.status === "pending").length,
      "in-progress": todos.filter((todo) => todo.status === "in-progress")
        .length,
      completed: todos.filter((todo) => todo.status === "completed").length,
    }),
    [todos]
  );

  // Calculate selected count
  const selectedCount = useMemo(
    () => todos.filter((todo) => todo.selected).length,
    [todos]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div style={{ textAlign: "center", flex: 1 }}>
              <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
                <CheckSquareOutlined style={{ marginRight: "8px" }} />
                Todo List
              </Title>
              <Typography.Text type="secondary">
                Quản lý công việc hàng ngày của bạn
              </Typography.Text>
            </div>
            <Button
              type="default"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              style={{ borderRadius: "8px" }}
            >
              Trang chủ
            </Button>
          </div>

          <Divider />

          {/* Main Content */}
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Add Todo Input */}
            <TodoInput onAddTodo={handleAddTodo} />

            {/* Filter and Sort */}
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <TodoFilter
                  currentFilter={filter}
                  onFilterChange={setFilter}
                  todoCount={todoCount}
                />
              </Col>
              <Col xs={24} sm={12}>
                <TodoSort currentSort={sortType} onSortChange={setSortType} />
              </Col>
            </Row>

            {/* Todo List */}
            <TodoList
              todos={filteredAndSortedTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
              onStatusChange={handleStatusChange}
              onSelectionChange={handleSelectionChange}
              onBulkDelete={handleBulkDelete}
              selectedCount={selectedCount}
            />
          </Space>

          {/* Footer Stats */}
          {todos.length > 0 && (
            <>
              <Divider />
              <div style={{ textAlign: "center" }}>
                <Typography.Text type="secondary">
                  Tổng: {todoCount.all} việc | Chưa hoàn thành:{" "}
                  {todoCount.pending} | Đang thực hiện:{" "}
                  {todoCount["in-progress"]} | Hoàn thành: {todoCount.completed}
                </Typography.Text>
              </div>
            </>
          )}
        </Card>

        {/* Confirm Dialog */}
        <ConfirmDialog
          open={confirmDialog.open}
          title={confirmDialog.title}
          content={confirmDialog.content}
          onConfirm={confirmDialog.onConfirm}
          onCancel={handleConfirmCancel}
          okText={confirmDialog.okText}
          cancelText="Hủy"
        />
      </div>
    </div>
  );
};

export default TodoPage;
