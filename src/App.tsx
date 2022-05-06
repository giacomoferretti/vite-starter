import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((count) => count + 1);
  };

  return (
    <div className="h-full bg-neutral-900 flex items-center justify-center flex-col">
      <h1 className="font-bold text-4xl text-white mb-4">Vite Starter</h1>
      <button
        className="bg-blue-500 p-4 rounded text-white"
        type="button"
        onClick={onClick}>
        Count is: <span className="font-bold">{count}</span>
      </button>
    </div>
  );
};

export default App;
