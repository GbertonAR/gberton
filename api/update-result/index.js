module.exports = async function (context, req) {
    if (req.method === 'OPTIONS') {
        context.res = { status: 204, headers: corsHeaders() };
        return;
    }

    // Token de admin requerido
    const token = req.headers['x-admin-token'] || req.query.token;
    if (token !== process.env.ADMIN_TOKEN) {
        context.res = { status: 401, headers: corsHeaders(), body: { error: 'No autorizado.' } };
        return;
    }

    const { match_id, winner, score_home, score_away } = req.body || {};

    if (!match_id || !winner) {
        context.res = { status: 400, headers: corsHeaders(), body: { error: 'match_id y winner son requeridos.' } };
        return;
    }

    // En producción esto actualizaría una DB — por ahora retorna el payload
    // para que el cliente actualice matches.json manualmente o via script
    context.res = {
        status: 200,
        headers: corsHeaders(),
        body: {
            ok: true,
            match_id,
            result: { winner, score_home, score_away },
            timestamp: new Date().toISOString(),
        },
    };
};

function corsHeaders() {
    return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, x-admin-token', 'Content-Type': 'application/json' };
}
