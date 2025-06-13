import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.1.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY")!, {
  apiVersion: "2022-11-15",
});

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const baseUrl = Deno.env.get("FRONTEND_BASE_URL") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "FormSnap - Paiement formulaire",
            },
            unit_amount: 1000, // montant en centimes (10€)
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Stripe session error:", err);
    return new Response("Erreur serveur", { status: 500 });
  }
});
