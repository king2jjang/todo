import { useState, type KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: '낮음', color: 'text-emerald-600' },
  { value: 'medium', label: '중간', color: 'text-amber-500' },
  { value: 'high', label: '높음', color: 'text-rose-500' },
];

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [composing, setComposing] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !composing) handleAdd();
  };

  return (
    <div className="flex gap-2">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
        <input
          className="flex-1 bg-transparent text-slate-700 placeholder:text-slate-400 outline-none text-sm"
          placeholder="새 할 일을 입력하세요... (Enter로 추가)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          onKeyDown={handleKey}
          autoFocus
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className={`text-xs font-medium bg-transparent outline-none cursor-pointer ${PRIORITY_OPTIONS.find((p) => p.value === priority)?.color}`}
        >
          {PRIORITY_OPTIONS.map((p) => (
            <option key={p.value} value={p.value} className="text-slate-700">
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAdd}
        disabled={!text.trim()}
        className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-violet-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <Plus size={16} />
        추가
      </button>
    </div>
  );
}
