import type { Todo } from '../types';

const KEY = 'vibe-todos';

export const loadTodos = (): Todo[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(KEY, JSON.stringify(todos));
};
