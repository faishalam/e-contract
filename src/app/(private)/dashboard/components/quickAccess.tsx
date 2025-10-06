import useDashboard from '../hooks';

export default function QuickAccess() {
  const { quickAccess } = useDashboard();
  return (
    <>
      <h2 className="font-bold text-lg text-black mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickAccess.map((q, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center gap-2 p-4 py-7 rounded-md cursor-pointer hover:shadow bg-gray-50`}
          >
            {q.icon}
            <p className="text-sm font-medium text-gray-700">{q.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
