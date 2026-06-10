import { ClipboardList } from 'lucide-react';
import type { Todo, Priority } from '../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onSetPriority: (id: string, priority: Priority) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit, onSetPriority }: Props) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-300">
        <ClipboardList size={48} strokeWidth={1} />
        <p className="mt-3 text-sm">할 일이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onSetPriority={onSetPriority}
        />
      ))}
    </div>
  );
}
