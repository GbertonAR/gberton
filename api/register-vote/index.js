const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
    if (req.method === 'OPTIONS') {
        context.res = { status: 204, headers: corsHeaders() };
        return;
    }

    const { email, voted_for, match_id } = req.body || {};

    if (!email || !voted_for || !match_id) {
        context.res = { status: 400, headers: corsHeaders(), body: { error: 'Faltan campos requeridos.' } };
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        context.res = { status: 400, headers: corsHeaders(), body: { error: 'Email inválido.' } };
        return;
    }

    const aiNames = { claude: 'Claude Sonnet (Anthropic)', gpt: 'GPT-4o (OpenAI)', gemini: 'Gemini 1.5 Pro (Google)' };
    const aiName = aiNames[voted_for] || voted_for;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD },
        tls: { rejectUnauthorized: false },
    });

    try {
        await transporter.sendMail({
            from: `"World Cup AI Battle" <${process.env.EMAIL_USERNAME}>`,
            to: process.env.EMAIL_NOTIFICATIONS_TO || 'gberton1967@gmail.com',
            replyTo: email,
            subject: `⚽ Nuevo voto — ${aiName} | Partido ${match_id}`,
            html: `
                <div style="font-family:sans-serif;max-width:500px;margin:auto;background:#0a0f1e;color:#fff;padding:24px;border-radius:12px">
                  <h2 style="color:#00d4ff">⚽ AI Battle · World Cup 2026</h2>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Vota por:</strong> ${aiName}</p>
                  <p><strong>Partido ID:</strong> ${match_id}</p>
                  <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                  <hr style="border-color:#ffffff20"/>
                  <p style="color:#888;font-size:12px">Este lead fue capturado desde gberton.com · FlowState AI</p>
                </div>`,
        });

        context.res = { status: 200, headers: corsHeaders(), body: { ok: true, message: '¡Voto registrado! Gracias por participar.' } };
    } catch (err) {
        context.log.error('[FAULT] register-vote:', err.message);
        context.res = { status: 500, headers: corsHeaders(), body: { error: 'Error al registrar el voto.' } };
    }
};

function corsHeaders() {
    return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json' };
}
