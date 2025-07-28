import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    const todosJSON = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, todosJSON);
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};

export const loadTodosFromStorage = (): Todo[] => {
  try {
    const todosJSON = localStorage.getItem(STORAGE_KEY);
    
    if (todosJSON) {
      const todos = JSON.parse(todosJSON);
      
      // Convert all date strings back to Date objects and ensure order exists
      return todos.map((todo: any, index: number) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
        expectedCompletionDate: todo.expectedCompletionDate ? new Date(todo.expectedCompletionDate) : undefined,
        order: todo.order !== undefined ? todo.order : index + 1
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

export const clearTodosFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing todos from localStorage:', error);
  }
}; 