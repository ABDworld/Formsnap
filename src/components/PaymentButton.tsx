import React from "react";

const PaymentButton = () => {
  const handlePay = async () => {
    try {
      const res = await fetch(
        "https://wcfielvrofhdaxgudprn.functions.supabase.co/create-checkout-session",
        {
          method: "POST",
        }
      );
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create Stripe session.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePay}
      style={{
        backgroundColor: "#635bff",
        color: "white",
        padding: "12px 24px",
        fontSize: "16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      Pay with Stripe
    </button>
  );
};

export default PaymentButton;
