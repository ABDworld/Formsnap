import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("🚨 STRIPE_SECRET_KEY is missing!");
    return res.status(500).json({ error: 'Stripe secret key not configured' });
  }

  try {
    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email, // facultatif mais utile
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'FormSnap - Form Payment',
            },
            unit_amount: 1000, // 10.00 €
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe error:", err);
    return res.status(500).json({ error: 'Stripe session creation failed' });
  }
}
