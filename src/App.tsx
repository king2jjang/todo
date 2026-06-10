import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import type { FilterType, Priority } from './types';
import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';

export default function App() {
  const [filter, setFilter] = useState<FilterType>('all');
  const { todos, activeCount, completedCount, dispatch } = useTodos(filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-slate-50 to-indigo-50">
      <div className="mx-auto max-w-lg px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-200">
              <CheckSquare size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">My Todos</h1>
          <p className="mt-1 text-sm text-slate-400">오늘 할 일을 관리하세요</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white shadow-xl shadow-slate-200/50 p-6 flex flex-col gap-5">
          <TodoInput
            onAdd={(text, priority) => dispatch({ type: 'ADD', text, priority })}
          />

          <FilterBar
            filter={filter}
            onChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          />

          <TodoList
            todos={todos}
            onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
            onDelete={(id) => dispatch({ type: 'DELETE', id })}
            onEdit={(id, text) => dispatch({ type: 'EDIT', id, text })}
            onSetPriority={(id, priority: Priority) =>
              dispatch({ type: 'SET_PRIORITY', id, priority })
            }
          />
        </div>

        <p className="mt-4 text-center text-xs text-slate-300">
          더블클릭으로 수정 · 우선순위 클릭으로 변경
        </p>
      </div>
    </div>
  );
}
