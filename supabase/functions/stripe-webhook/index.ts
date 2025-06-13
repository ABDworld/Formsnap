import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe";

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

serve(async (req) => {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  // ✅ Gérer uniquement checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Paiement réussi pour session ID:", session.id);
    console.log("Metadata:", session.metadata);

    // 🎯 Ici tu peux par exemple :
    // - Mettre à jour Supabase (via fetch ou client)
    // - Marquer un formulaire comme "payé"
  }

  return new Response("OK", { status: 200 });
});
