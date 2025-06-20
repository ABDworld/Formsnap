import React, { useState } from 'react';

export default function FormSnapBuilder() {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Envoie les données à Supabase (si tu veux les enregistrer)
      const response = await fetch('https://your-supabase-url.supabase.co/rest/v1/form_submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de l’enregistrement');

      setStatus('saved');

      // 2. Crée une session de paiement Stripe via la fonction Vercel
      const checkoutRes = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await checkoutRes.json();

      if (!checkoutRes.ok || !data.url) throw new Error('Erreur Stripe');

      // 3. Redirige vers Stripe Checkout
      window.location.href = data.url;

    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">FormSnap</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Votre e-mail"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Envoi…' : 'Envoyer + Payer'}
        </button>

        {status === 'error' && (
          <p className="text-red-500">Une erreur est survenue.</p>
        )}
      </form>
    </div>
  );
}
