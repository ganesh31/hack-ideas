import { CodeIcon, LoginIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const onUser = (user: User) => {
    setUser(user);
  };
  return (
    <>
      <header className="bg-slate-800 text-slate-100 flex justify-between px-4">
        {/* this div is there to bring the H1 to center */}
        <div></div>
        <h1 className="flex items-center space-x-3 text-xl font-black tracking-widest">
          <span>Hack Ideas</span>
          <CodeIcon className="w-6 h-6" />
        </h1>
        <Link to={"/login"}>
          <LoginIcon data-testid="login" className=" w-8 h-8" />
        </Link>
      </header>
      {user && <h1 className="text-center bg-green-200">Welcome {user.id}</h1>}
      <main className="md:mx-5 lg:mx-7 xl:mx-64 m-3">
        <Routes>
          <Route path="/login" element={<Login onUser={onUser} />} />
          <Route path="/register" element={<Register onUser={onUser} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
