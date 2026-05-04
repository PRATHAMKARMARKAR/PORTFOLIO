import { useEffect, useState } from "react";

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="fixed top-0 w-full h-7 bg-black/60 backdrop-blur flex items-center px-4 text-sm z-50">
      <span className="font-semibold">Portfolio</span>
      <div className="ml-auto">{time}</div>
    </div>
  );
}