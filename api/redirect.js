export default async function handler(req, res) {
  const { email, university, company, type } = req.query;
  const linkRaw = req.query.link || "";
  const link = decodeURIComponent(decodeURIComponent(linkRaw)); // ✅ 이중 디코딩

  const scriptUrl = "https://script.google.com/macros/s/AKfycbzgNi6Vnr_kF_3moMtoNVPbsrOtBfH1GCAJNjfzgC6lmaz1QxbYsJmP9cdOpaB3EpR7/exec";

  if (!scriptUrl || !link) {
    return res.status(400).json({ error: "Invalid request. Missing scriptUrl or link." });
  }

  try {
    await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: type || "click",
        email,
        university,
        company,
        link,
        time: new Date().toISOString(),
      }),
    });

    res.writeHead(302, { Location: link });
    res.end();
  } catch (err) {
    console.error("🔥 redirect error:", err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
}
