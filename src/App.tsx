import { CodeIcon, LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AddHack from "./pages/addHack/AddHack";
import Hacks from "./pages/hacks/Hacks";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const onUser = (user: User) => {
    setUser(user);
  };

  const onLogout = () => {
    setUser(null);
    navigate("/hacks");
  };

  return (
    <>
      <header className="bg-slate-800 text-slate-100 flex justify-between px-4 border-r border-slate-50">
        {/* this div is there to bring the H1 to center */}
        <div></div>
        <h1 className="flex items-center space-x-3 text-xl font-black tracking-widest">
          <span>Hack Ideas</span>
          <CodeIcon className="w-6 h-6" />
        </h1>
        {!user ? (
          <Link to={"/login"}>
            <LoginIcon id="login" data-testid="login" className=" w-8 h-8" />
          </Link>
        ) : (
          <LogoutIcon
            id="logout"
            data-testid="logout"
            onClick={onLogout}
            className="w-8 h-8"
          />
        )}
      </header>
      {user && (
        <h1 className="text-center bg-green-200">Welcome {user.name}</h1>
      )}
      <main className="md:mx-5 lg:mx-7 xl:mx-64 p-3">
        <Routes>
          <Route path="/" element={<Navigate to="/hacks" replace />} />
          <Route path="/login" element={<Login onUser={onUser} />} />
          <Route path="/register" element={<Register onUser={onUser} />} />
          <Route
            path="/add"
            element={
              user ? (
                <AddHack user={user} />
              ) : (
                <Navigate to="/login" state={{ redirectTo: "/add" }} />
              )
            }
          />
          <Route path="/hacks" element={<Hacks user={user} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
