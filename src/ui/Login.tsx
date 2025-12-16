import { useState, useEffect } from "react";
import "./login.css";

type Role = "admin" | "user";

const USERS = ["user1", "user2", "user3", "user4"];
const NUM_BEES = 4;

const bees = Array.from({ length: 4 });
const [mouse, setMouse] = useState({ x: 0, y: 0 });

useEffect(() => {
  const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);

{bees.map((_, i) => (
  <div
    key={i}
    className={`bee mouse-follow bee-${i}`}
    style={{
      transform: `translate(${Math.sin(mouse.x / 50 + i) * 30}px, ${Math.cos(mouse.y / 50 + i) * 30}px)`,
    }}
  >
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#FFD93B" />
      <circle cx="24" cy="24" r="4" fill="#000" />
      <circle cx="40" cy="24" r="4" fill="#000" />
      <path d="M32 40C28 44 28 52 32 52C36 52 36 44 32 40Z" fill="#000"/>
    </svg>
  </div>
))}

export default function Login({
  onLogin,
}: {
  onLogin: (role: Role, user: string) => void;
}) {
  const [role, setRole] = useState<Role>("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (loading) return;
    setError("");
    setLoading(true);

    setTimeout(() => {
      const u = username.trim();
      const p = password.trim();

      let success = false;

      if (role === "admin" && u === "0901962534" && p === "Yumi170220") {
        success = true;
        localStorage.setItem("bee_role", "admin");
        localStorage.setItem("bee_user", "Admin");
        onLogin("admin", "Admin");
        return;
      }

      if (role === "user" && USERS.includes(u) && p === "Bee123") {
        success = true;
        localStorage.setItem("bee_role", "user");
        localStorage.setItem("bee_user", u);
        onLogin("user", u);
        return;
      }

      setLoading(false);
      if (!success) setError("Nhập lại cho đúng đi chế ơi! không phải nhân viên BEE thì đừng vào nha!!");
    }, 1200);
  };

  const bees = Array.from({ length: NUM_BEES });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Theo dõi chuột
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="login-page">
      {/* 4 ONG BAY */}
      {bees.map((_, i) => (
        <div
          key={i}
          className={`bee bee-${i}`}
          style={{
            transform: `translate(${Math.sin(mouse.x / 50 + i) * 30}px, ${
              Math.cos(mouse.y / 50 + i) * 30
            }px)`,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="32" fill="#FFD93B" />
            <circle cx="24" cy="24" r="4" fill="#000" />
            <circle cx="40" cy="24" r="4" fill="#000" />
            <path d="M32 40C28 44 28 52 32 52C36 52 36 44 32 40Z" fill="#000" />
          </svg>
        </div>
      ))}

      <div className={`login-card ${loading ? "loading" : ""}`}>
        <h1 className="logo">Giặt Sấy BEE</h1>

        <div className="role-switch">
          <button
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <input
          placeholder={role === "admin" ? "Số điện thoại" : "Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && <div className="error-text">{error}</div>}

        <button
          className={`login-btn ${loading ? "loading" : ""}`}
          onClick={handleLogin}
        >
          {loading ? <span className="spinner"></span> : "Đăng nhập"}
        </button>
      </div>
    </div>
  );
}
