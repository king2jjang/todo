import { useReducer, useEffect } from 'react';
import type { Todo, Priority, FilterType } from '../types';
import { loadTodos, saveTodos } from '../utils/storage';

type Action =
  | { type: 'ADD'; text: string; priority: Priority }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'EDIT'; id: string; text: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_PRIORITY'; id: string; priority: Priority };

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [
        {
          id: crypto.randomUUID(),
          text: action.text.trim(),
          completed: false,
          priority: action.priority,
          createdAt: Date.now(),
        },
        ...todos,
      ];
    case 'TOGGLE':
      return todos.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t,
      );
    case 'DELETE':
      return todos.filter((t) => t.id !== action.id);
    case 'EDIT':
      return todos.map((t) =>
        t.id === action.id ? { ...t, text: action.text } : t,
      );
    case 'CLEAR_COMPLETED':
      return todos.filter((t) => !t.completed);
    case 'SET_PRIORITY':
      return todos.map((t) =>
        t.id === action.id ? { ...t, priority: action.priority } : t,
      );
    default:
      return todos;
  }
}

export function useTodos(filter: FilterType) {
  const [todos, dispatch] = useReducer(reducer, [], loadTodos);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const visible = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return { todos: visible, activeCount, completedCount, dispatch };
}
