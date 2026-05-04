export default function Window({ title, children }) {
  return (
    <div className="bg-surface rounded-xl shadow-xl border border-white/10 max-w-4xl mx-auto my-10 overflow-hidden">
      <div className="flex items-center px-3 py-2 bg-[#2d2d2d]">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <span className="mx-auto text-xs opacity-70">{title}</span>
      </div>

      <div className="p-6">{children}</div>
    </div>
  );
}