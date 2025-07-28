export type TodoStatus = 'pending' | 'in-progress' | 'completed';

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  createdAt: Date;
  completedAt?: Date;
  expectedCompletionDate?: Date;
  order: number;
  selected?: boolean;
}

export type FilterType = 'all' | 'pending' | 'in-progress' | 'completed';

export type SortType = 'newest' | 'oldest' | 'alphabetical' | 'reverse-alphabetical';

export interface TodoInputProps {
  onAddTodo: (text: string, expectedCompletionDate?: Date) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, expectedCompletionDate?: Date) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onSelectionChange: (id: string, selected: boolean) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, expectedCompletionDate?: Date) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onSelectionChange: (id: string, selected: boolean) => void;
  onBulkDelete: () => void;
  selectedCount: number;
}

export interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCount: {
    all: number;
    pending: number;
    'in-progress': number;
    completed: number;
  };
}

export interface TodoSortProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
} 