export default function StatusBadge({ status }) {
  const colors = {
    'Present': 'bg-emerald-100 text-emerald-700',
    'Absent': 'bg-rose-100 text-rose-700',
    'Weekly Off': 'bg-slate-200 text-slate-700',
    'Leave': 'bg-amber-100 text-amber-700',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}