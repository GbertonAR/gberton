const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
    // CORS preflight
    if (req.method === 'OPTIONS') {
        context.res = { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } };
        return;
    }

    const { nombre, email, telefono, motivo, tema } = req.body || {};

    if (!nombre || !email || !motivo) {
        context.res = { status: 400, body: { error: 'Campos requeridos incompletos.' } };
        return;
    }

    // Verificar que las env vars están cargadas
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
        context.log.error('[FAULT] Variables de entorno EMAIL_* no configuradas');
        context.res = { status: 500, body: { error: 'Configuración de email incompleta en el servidor.' } };
        return;
    }

    const transporter = nodemailer.createTransport({
        host:   process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
        port:   parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
    });

    const motivoLabel = {
        laboral:    'Oportunidad Laboral / Postulación',
        b2b:        'Consultoría B2B / Servicios FlowState AI',
        networking: 'Networking / Prensa',
    }[motivo] || motivo;

    try {
        await transporter.sendMail({
            from:    `"Formulario Web" <${process.env.EMAIL_USERNAME}>`,
            to:      process.env.EMAIL_NOTIFICATIONS_TO || 'gberton1967@gmail.com',
            replyTo: email,
            subject: `[Web] Contacto de ${nombre} — ${motivoLabel}`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:auto">
                  <h2 style="color:#1A6EF5">Nuevo contacto desde gberton.com</h2>
                  <table style="width:100%;border-collapse:collapse">
                    <tr><td style="padding:8px;font-weight:bold;width:140px">Nombre</td><td style="padding:8px">${nombre}</td></tr>
                    <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
                    <tr><td style="padding:8px;font-weight:bold">Teléfono</td><td style="padding:8px">${telefono || '—'}</td></tr>
                    <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Motivo</td><td style="padding:8px">${motivoLabel}</td></tr>
                  </table>
                  ${tema ? `<div style="margin-top:16px;padding:12px;background:#f9f9f9;border-left:3px solid #1A6EF5"><strong>Mensaje:</strong><br/>${tema.replace(/\n/g, '<br/>')}</div>` : ''}
                </div>
            `,
        });

        context.res = { status: 200, body: { ok: true } };
    } catch (err) {
        context.log.error('[FAULT] send-contact SMTP:', err.message, err.code);
        context.res = { status: 500, body: { error: err.message } };
    }
};
