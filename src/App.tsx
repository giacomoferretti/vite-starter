import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((count) => count + 1);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center bg-neutral-900">
      <img src="/vite.svg" className="mb-4 h-16" alt="Vite logo" />
      <h1 className="mb-4 text-4xl font-bold text-white">Vite Starter</h1>
      <button
        className="rounded bg-blue-500 p-4 text-white"
        type="button"
        onClick={onClick}>
        Count is: <strong className="font-bold">{count}</strong>
      </button>
    </div>
  );
};

export default App;
