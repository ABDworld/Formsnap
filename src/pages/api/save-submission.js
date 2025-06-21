export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { responses } = req.body;

    const supabaseRes = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        responses,
        submitted_at: new Date().toISOString(),
        email: responses[2], // ID du champ email
      }),
    });

    if (!supabaseRes.ok) {
      const text = await supabaseRes.text();
      console.error("❌ Supabase insert error:", text);
      return res.status(500).json({ error: 'Supabase insert failed' });
    }

    return res.status(200).json({ message: 'Saved successfully' });
  } catch (err) {
    console.error("❌ API error:", err);
    return res.status(500).json({ error: 'Server error' });
  }
}
