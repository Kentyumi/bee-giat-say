import { useState, useEffect } from "react";
import "./login.css";

type Role = "admin" | "user";

const USERS = ["user1", "user2", "user3", "user4"];
const NUM_BEES = 16;

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
      if (!success) setError("Sai tài khoản hoặc mật khẩu");
    }, 1200);
  };

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const bees = Array.from({ length: NUM_BEES });

  // Leader path offset
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  return (
    <div className="login-page">
      {bees.map((_, i) => {
        const angle = (i / NUM_BEES) * Math.PI * 2 + Date.now() / 2000;
        const radius = 100 + 10 * i; // khoảng cách ra xa dần
        const x = centerX + Math.cos(angle + i) * radius + Math.sin(mouse.x / 80 + i) * 20;
        const y = centerY + Math.sin(angle + i) * radius + Math.cos(mouse.y / 80 + i) * 20;

        const distance = Math.hypot(mouse.x - x, mouse.y - y);
        const flapScale = distance < 120 ? 1.5 : 1;

        return (
          <div
            key={i}
            className={`bee mouse-follow bee-${i}`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              className="bee-svg"
              style={{ transform: `scale(${flapScale})` }}
            >
              <ellipse cx="32" cy="36" rx="10" ry="16" fill="#FFD93B" stroke="#000" strokeWidth="1"/>
              <rect x="22" y="28" width="20" height="4" fill="#000"/>
              <rect x="22" y="36" width="20" height="4" fill="#000"/>
              <rect x="22" y="44" width="20" height="4" fill="#000"/>
              <ellipse cx="24" cy="20" rx="5" ry="10" fill="rgba(255,255,255,0.6)" className="wing-left"/>
              <ellipse cx="40" cy="20" rx="5" ry="10" fill="rgba(255,255,255,0.6)" className="wing-right"/>
              <circle cx="28" cy="32" r="1.5" fill="#000"/>
              <circle cx="36" cy="32" r="1.5" fill="#000"/>
              <line x1="22" y1="48" x2="18" y2="54" stroke="#000" strokeWidth="1.2"/>
              <line x1="42" y1="48" x2="46" y2="54" stroke="#000" strokeWidth="1.2"/>
            </svg>
          </div>
        );
      })}

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
