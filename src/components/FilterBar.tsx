import type { FilterType } from '../types';

interface Props {
  filter: FilterType;
  onChange: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const TABS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

export default function FilterBar({
  filter,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              filter === tab.value
                ? 'bg-white text-violet-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400">
          {activeCount}개 남음
        </span>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs text-rose-400 hover:text-rose-600 transition-colors"
          >
            완료 삭제 ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}
