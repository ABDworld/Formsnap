import React from 'react';

const PaymentButton = () => {
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
    <button onClick={handleClick} style={{ marginTop: "20px" }}>
      Pay with Stripe
    </button>
  );
};

export default PaymentButton;
