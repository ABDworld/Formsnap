import { useState } from "react";
import { supabase } from "../supabaseClient";
import PaymentButton from "./PaymentButton";

console.log("✅ FormSnapBuilder is loaded");

export default function FormSnapBuilder() {
  const [formFields, setFormFields] = useState([
    { id: 1, type: "shortAnswer", label: "Name" },
    { id: 2, type: "email", label: "Email" },
    {
      id: 3,
      type: "multipleChoice",
      label: "What are your primary goals for coaching?",
      options: [
        "Career advancement",
        "Improving relationships",
        "Work‑life balance"
      ]
    }
  ]);

  const [responses, setResponses] = useState({});

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

    try {
      const { error } = await supabase.from("responses").insert([
        {
          responses: responses,
          submitted_at: new Date().toISOString()
        }
      ]);

      if (error) {
        console.error("Supabase insert error:", error.message);
        alert("❌ Could not save your responses. Please try again.");
      } else {
        console.log("✅ Responses saved in Supabase");
        alert("✅ Form submitted successfully! Redirecting to payment…");
        window.location.href = "https://buy.stripe.com/test_14A9AV0xu4dagEu4hJ83C02";
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("❌ An unexpected error occurred.");
    }
  };

  const addField = (type) => {
    const newField = { id: Date.now(), type, label: `New ${type} field` };
    if (type === "multipleChoice") {
      newField.options = ["Option 1", "Option 2"];
    }
    setFormFields([...formFields, newField]);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">FormSnap</h1>

      {/* 🔵 Stripe Payment Button */}
      <PaymentButton />

      {/* Buttons to add new fields */}
      <div className="space-x-2">
        <button
          onClick={() => addField("shortAnswer")}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          + Short Answer
        </button>
        <button
          onClick={() => addField("email")}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          + Email
        </button>
        <button
          onClick={() => addField("multipleChoice")}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          + Multiple Choice
        </button>
      </div>

      {/* Actual form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id}>{renderField(field)}</div>
        ))}

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
