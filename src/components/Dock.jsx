export default function Dock() {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-xl px-6 py-3 rounded-2xl flex gap-4">
      {["🏠", "💻", "📦", "✉"].map((icon, i) => (
        <div
          key={i}
          className="text-2xl hover:scale-125 transition cursor-pointer"
        >
          {icon}
        </div>
      ))}
    </div>
  );
}