export default function DashboardCard({ icon, title, children, accent }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <p className="font-semibold text-slate-800">{title}</p>
        {accent && (
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
            {accent}
          </span>
        )}
      </div>
      <div className="text-sm text-slate-600">{children}</div>
    </div>
  );
}
