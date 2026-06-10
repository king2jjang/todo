import { useState, useRef, useEffect } from 'react';
import { Trash2, Check, Pencil } from 'lucide-react';
import type { Todo, Priority } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onSetPriority: (id: string, priority: Priority) => void;
}

const PRIORITY_STYLES: Record<Priority, { bar: string; badge: string; label: string }> = {
  low: { bar: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-600', label: '낮음' },
  medium: { bar: 'bg-amber-400', badge: 'bg-amber-50 text-amber-600', label: '중간' },
  high: { bar: 'bg-rose-400', badge: 'bg-rose-50 text-rose-600', label: '높음' },
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onSetPriority }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [composing, setComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.text) onEdit(todo.id, trimmed);
    else setDraft(todo.text);
    setEditing(false);
  };

  const p = PRIORITY_STYLES[todo.priority];

  return (
    <div
      className={`group relative flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100 transition-all hover:shadow-md ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      {/* Priority bar */}
      <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${p.bar}`} />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          todo.completed
            ? 'border-violet-500 bg-violet-500 text-white'
            : 'border-slate-300 hover:border-violet-400'
        }`}
      >
        {todo.completed && <Check size={11} strokeWidth={3} />}
      </button>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onCompositionStart={() => setComposing(true)}
            onCompositionEnd={() => setComposing(false)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !composing) commitEdit();
              if (e.key === 'Escape') { setDraft(todo.text); setEditing(false); }
            }}
            className="w-full text-sm text-slate-700 outline-none border-b border-violet-400 bg-transparent"
          />
        ) : (
          <span
            onDoubleClick={() => !todo.completed && setEditing(true)}
            className={`block truncate text-sm text-slate-700 ${
              todo.completed ? 'line-through text-slate-400' : ''
            }`}
            title={todo.text}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge */}
      <span
        onClick={() => {
          const order: Priority[] = ['low', 'medium', 'high'];
          const next = order[(order.indexOf(todo.priority) + 1) % 3];
          onSetPriority(todo.id, next);
        }}
        className={`flex-shrink-0 cursor-pointer rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.badge} transition-all hover:opacity-80`}
        title="클릭하여 우선순위 변경"
      >
        {p.label}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!todo.completed && (
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            title="수정"
          >
            <Pencil size={13} />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
          title="삭제"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
