import { useEffect, useState } from "react";
import Login from "./ui/Login";
import Dashboard from "./ui/Dashboard";

export default function App() {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    setRole(localStorage.getItem("bee_role"));
    setUser(localStorage.getItem("bee_user") || "");
  }, []);

  if (!role) {
    return <Login onLogin={(r, u) => {
      setRole(r);
      setUser(u);
    }} />;
  }

  return (
    <Dashboard
      role={role}
      currentUser={user}
      onLogout={() => {
        localStorage.clear();
        setRole(null);
      }}
    />
  );
}
