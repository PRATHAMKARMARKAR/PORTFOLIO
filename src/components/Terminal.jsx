import { useState } from "react";

const commands = {
  help: () => "Commands: help, whoami, projects, clear",
  whoami: () => "Pratham Karmarkar — Fullstack Dev & ML Engineer",
  projects: () => "Brain Tumor Detection | BaggageBugs | Tyre CV System",
};

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [index, setIndex] = useState(-1);

  const runCommand = (cmd) => {
    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const output = commands[cmd]
      ? commands[cmd]()
      : `command not found: ${cmd}`;

    setHistory([...history, `$ ${cmd}`, output]);
  };

  return (
    <div className="bg-black rounded-lg p-4 text-sm h-80 overflow-y-auto">
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <div className="flex">
        <span className="text-green-400">$</span>
        <input
          className="bg-transparent outline-none ml-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runCommand(input);
              setCmdHistory([input, ...cmdHistory]);
              setInput("");
              setIndex(-1);
            }

            if (e.key === "ArrowUp") {
              const next = Math.min(index + 1, cmdHistory.length - 1);
              setIndex(next);
              setInput(cmdHistory[next] || "");
            }

            if (e.key === "ArrowDown") {
              const next = Math.max(index - 1, -1);
              setIndex(next);
              setInput(next >= 0 ? cmdHistory[next] : "");
            }
          }}
        />
      </div>
    </div>
  );
}