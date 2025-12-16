import { useEffect, useState } from "react";
import "./dashboard.css";

type Order = {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  weight: number;
  pricePerKg: number;
  total: number;
  status: "Nhận đơn" | "Trả đơn & nhận tiền";
  createdAt: string;
  createdBy: string;
};

const PRESET_PRICE = 10000;

export default function Dashboard({
  role,
  currentUser,
  onLogout,
}: {
  role: string;
  currentUser: string;
  onLogout: () => void;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState(1);
  const [priceMode, setPriceMode] = useState<"preset" | "custom">("preset");
  const [pricePerKg, setPricePerKg] = useState<number>(PRESET_PRICE);

  // 🔥 Bubble text messages
  const messages = [
    "Nhập đơn cẩn thận nha mấy chế !",
    "Đừng quên kiểm tra cân nặng!",
    "Giữ đơn gọn gàng nhé!"
  ];

  const [currentText, setCurrentText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("bee_orders");
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bee_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (priceMode === "preset") setPricePerKg(PRESET_PRICE);
  }, [priceMode]);

  const total = weight * pricePerKg;

  const addOrder = () => {
    if (!name) return alert("Cần nhập tên khách");

    const order: Order = {
      id: Date.now(),
      name,
      phone,
      address,
      weight,
      pricePerKg,
      total,
      status: "Nhận đơn",
      createdAt: new Date().toLocaleString(),
      createdBy: currentUser,
    };

    setOrders([order, ...orders]);
    setName("");
    setPhone("");
    setAddress("");
    setWeight(1);
    setPriceMode("preset");
    setPricePerKg(PRESET_PRICE);
  };

  const updateStatus = (id: number) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: "Trả đơn & nhận tiền" } : o
      )
    );
  };

  const formatMoney = (n: number) => n.toLocaleString("vi-VN") + " đ";

  // 🔥 Typewriter bubble text effect
  useEffect(() => {
    if (messages.length === 0) return;

    if (charIndex < messages[msgIndex].length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + messages[msgIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setMsgIndex((msgIndex + 1) % messages.length);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [charIndex, msgIndex]);

  return (
    <div className="dashboard-page">
      <header className="top-bar">
        <h3>BEE Dashboard</h3>
        <div>
          {currentUser} <button onClick={onLogout}>Đăng xuất</button>
        </div>
      </header>

      {role === "user" && (
        <div className="card">
          <h4>Nhận đơn giặt</h4>
          <div className="field">
            <label>Tên khách *</label>
            <input
              placeholder="Ví dụ: Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Số điện thoại (không bắt buộc)</label>
            <input
              placeholder="090xxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Địa chỉ (không bắt buộc)</label>
            <input
              placeholder="Số nhà, đường..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Số kg *</label>
            <input
              type="number"
              min={1}
              placeholder="Ví dụ: 10"
              value={weight}
              onChange={(e) => setWeight(+e.target.value || 1)}
            />
          </div>
          <div className="field">
            <label>Đơn giá / kg</label>
            <select
              value={priceMode}
              onChange={(e) =>
                setPriceMode(e.target.value as "preset" | "custom")
              }
            >
              <option value="preset">10.000 đ / kg</option>
              <option value="custom">Tự nhập</option>
            </select>
          </div>
          {priceMode === "custom" && (
            <div className="field">
              <label>Nhập đơn giá (đ / kg)</label>
              <input
                type="number"
                min={1000}
                placeholder="Ví dụ: 20000"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(+e.target.value || 0)}
              />
            </div>
          )}
          <div className="total-box">
            <div>Đơn giá: {formatMoney(pricePerKg)} / kg</div>
            <strong>Tổng tiền: {formatMoney(total)}</strong>
          </div>
          <button className="primary" onClick={addOrder}>
            Nhận đơn
          </button>
        </div>
      )}

      <div className="card">
        <h4>Danh sách đơn</h4>
        <table>
          <thead>
            <tr>
              <th>Khách</th>
              <th>Kg</th>
              <th>Đơn giá</th>
              <th>Tiền</th>
              <th>Trạng thái</th>
              <th>Người nhập</th>
              <th>Thời gian</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  {o.name}
                  <div className="sub">{o.phone || "—"}</div>
                  <div className="sub">{o.address || "—"}</div>
                </td>
                <td>{o.weight}</td>
                <td>{formatMoney(o.pricePerKg)}</td>
                <td>{formatMoney(o.total)}</td>
                <td>{o.status}</td>
                <td>{o.createdBy}</td>
                <td>{o.createdAt}</td>
                <td>
                  {o.status === "Nhận đơn" && (
                    <button onClick={() => updateStatus(o.id)}>
                      Trả đơn
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cô gái góc dưới bên phải với bubble text */}
      <div className="girl-container">
        {currentText && (
          <div className="speech-bubble">
            <span>{currentText}</span>
            <div className="bubble-bottom"></div>
          </div>
        )}
        <img
          src="/bee-giat-say/girl-left.png"
          className="girl"
          alt="Girl"
        />
      </div>
    </div>
  );
}
