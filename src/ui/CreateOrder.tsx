import { useState } from "react";
import "./order.css";


export default function CreateOrder({ currentUser }: { currentUser: string }) {
  const [kg, setKg] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="order-page">
      <div className="order-card">
        <h2>Tạo đơn giặt</h2>
        <p className="user-line">Người nhập: {currentUser}</p>

        {/* TÊN */}
        <div className="field">
          <label>Tên khách</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
          />
        </div>

        {/* SỐ ĐIỆN THOẠI */}
        <div className="field">
          <label>Số điện thoại (không bắt buộc)</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="090xxxxxxx"
          />
        </div>

        {/* 🔥 SỐ KG – ĐÃ FIX */}
        <div className="field">
          <label>
            Số kg <span className="required">*</span>
          </label>
          <input
            type="number"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            placeholder="Ví dụ: 5"
          />
        </div>

        {/* ĐỊA CHỈ */}
        <div className="field">
          <label>Địa chỉ (không bắt buộc)</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Số nhà, đường..."
          />
        </div>

        <button className="primary-btn">Lưu đơn</button>
      </div>
    </div>
  );
}
