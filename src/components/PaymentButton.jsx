import React from 'react';

const PaymentButton = () => {
  console.log("🟣 PaymentButton is rendered");

  const handleClick = async () => {
    try {
      const res = await fetch("/functions/v1/create-checkout-session", {
        method: "POST",
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("No checkout URL received.");
        console.error("Invalid response:", data);
      }
    } catch (error) {
      alert("Error creating checkout session.");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        marginTop: "20px",
        backgroundColor: "#635bff",
        color: "#ffffff",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        display: "inline-block"
      }}
    >
      Pay with Stripe
    </button>
  );
};

export default PaymentButton;
