import { CodeIcon, LoginIcon } from "@heroicons/react/outline";

function App() {
  return (
    <header className="bg-slate-800 text-slate-100 flex justify-between px-4">
      {/* this div is there to bring the H1 to center */}
      <div></div>
      <h1 className="flex items-center space-x-3 text-xl font-black tracking-widest">
        <span>Hack Ideas</span>
        <CodeIcon className="w-6 h-6" />
      </h1>
      <LoginIcon data-testid="login" className=" w-8 h-8" />
    </header>
  );
}

export default App;
