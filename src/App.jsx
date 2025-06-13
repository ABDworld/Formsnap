import React from "react";
import PaymentButton from "./components/PaymentButton";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>FormSnap</h1>

      {/* 🔵 Stripe Payment Button */}
      <PaymentButton />

      {/* 🔵 Example Form */}
      <form style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Your name:
            <input type="text" name="name" style={{ marginLeft: "10px" }} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
