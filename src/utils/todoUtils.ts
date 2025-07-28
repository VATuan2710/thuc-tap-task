import type { Todo, SortType, FilterType } from '../types/todo';

export const sortTodos = (todos: Todo[], sortType: SortType): Todo[] => {
  const sortedTodos = [...todos];

  switch (sortType) {
    case 'newest':
      return sortedTodos.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    
    case 'oldest':
      return sortedTodos.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    
    case 'alphabetical':
      return sortedTodos.sort((a, b) => 
        a.text.toLowerCase().localeCompare(b.text.toLowerCase(), 'vi', { 
          numeric: true, 
          sensitivity: 'base' 
        })
      );
    
    case 'reverse-alphabetical':
      return sortedTodos.sort((a, b) => 
        b.text.toLowerCase().localeCompare(a.text.toLowerCase(), 'vi', { 
          numeric: true, 
          sensitivity: 'base' 
        })
      );
    
    default:
      return sortedTodos;
  }
};

export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case 'pending':
      return todos.filter(todo => todo.status === 'pending');
    case 'in-progress':
      return todos.filter(todo => todo.status === 'in-progress');
    case 'completed':
      return todos.filter(todo => todo.status === 'completed');
    default:
      return todos;
  }
}; 