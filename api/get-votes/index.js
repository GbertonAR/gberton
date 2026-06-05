/**
 * @system     FlowState AI
 * @module     get-votes/index.js
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-06-05
 * @summary    Lee los contadores de votos del AI Battle desde GitHub Gist.
 */

const https = require('https');

const GIST_ID = process.env.VOTES_GIST_ID;
const TOKEN   = process.env.GITHUB_GIST_TOKEN;
const FALLBACK = { claude: 0, gpt: 0, gemini: 0 };

function gistGet() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/gists/${GIST_ID}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'User-Agent': 'gberton-worldcup',
                'Accept': 'application/vnd.github+json',
            },
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
        req.on('error', reject);
        req.end();
    });
}

module.exports = async function (context, req) {
    if (req.method === 'OPTIONS') {
        context.res = { status: 204, headers: corsHeaders() };
        return;
    }

    if (!GIST_ID || !TOKEN) {
        context.res = { status: 200, headers: corsHeaders(), body: FALLBACK };
        return;
    }

    try {
        const gist = await gistGet();
        const file = gist.files?.['votes.json'];
        const votes = file ? JSON.parse(file.content) : FALLBACK;
        context.res = { status: 200, headers: corsHeaders(), body: votes };
    } catch (err) {
        context.log.error('[FAULT] get-votes:', err.message);
        context.res = { status: 200, headers: corsHeaders(), body: FALLBACK };
    }
};

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };
}
