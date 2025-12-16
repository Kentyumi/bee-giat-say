import { useState } from "react";
import "./login.css";

type Role = "admin" | "user";

const USERS = ["user1", "user2", "user3", "user4"];

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

      // ADMIN
      if (role === "admin" && u === "0901962534" && p === "Yumi170220") {
        success = true;
        localStorage.setItem("bee_role", "admin");
        localStorage.setItem("bee_user", "Admin");
        onLogin("admin", "Admin");
        return;
      }

      // USER THƯỜNG
      if (role === "user" && USERS.includes(u) && p === "Bee123") {
        success = true;
        localStorage.setItem("bee_role", "user");
        localStorage.setItem("bee_user", u);
        onLogin("user", u);
        return;
      }

      setLoading(false);
      if (!success) {
        setError("Sai tài khoản hoặc mật khẩu");
      }
    }, 1200);
  };

  return (
    <div className="login-page">
      <div className="center-container">
        {/* Cô gái bên trái */}
        <div className="girl-container">
          <div className="speech-bubble">
            <span>Chào mừng bạn gia nhập gia đình BEE</span>
            <div className="bubble-bottom"></div>
          </div>
          <img
            src="/bee-giat-say/girl-left.png"
            className="girl"
            alt="Girl Left"
          />
        </div>

        {/* Login Card */}
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
    </div>
  );
}
