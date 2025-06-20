import { useState } from "react";

export default function FormSnapBuilder() {
  const [formFields, setFormFields] = useState([
    { id: 1, type: "shortAnswer", label: "Name" },
    { id: 2, type: "email", label: "Email" },
    {
      id: 3,
      type: "multipleChoice",
      label: "What are your primary goals for coaching?",
      options: ["Career advancement", "Improving relationships", "Work-life balance"]
    }
  ]);

  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const renderField = (field) => {
    switch (field.type) {
      case "shortAnswer":
        return (
          <input
            type="text"
            placeholder={field.label}
            className="border p-2 rounded w-full"
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "email":
        return (
          <input
            type="email"
            placeholder={field.label}
            className="border p-2 rounded w-full"
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "multipleChoice":
        return (
          <div>
            <p className="font-semibold mb-1">{field.label}</p>
            {field.options.map((opt, idx) => (
              <label key={idx} className="block cursor-pointer mb-1">
                <input
                  type="radio"
                  name={`field-${field.id}`}
                  value={opt}
                  className="mr-2"
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = formFields.find(f => f.type === "email")?.id;
    const emailValue = responses[email];

    try {
      // 1. Save to Supabase (optional)
      await fetch("/api/save-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });

      // 2. Call Stripe Checkout
      const stripeRes = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      const data = await stripeRes.json();
      if (!data.url) throw new Error("Stripe session failed");

      window.location.href = data.url;
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">FormSnap</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id}>{renderField(field)}</div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {loading ? "Processing..." : "Submit & Pay with Stripe"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
