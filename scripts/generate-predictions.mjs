/**
 * generate-predictions.mjs
 * Genera predicciones reales para los partidos del Mundial 2026
 * llamando a GPT-4o, Gemini 1.5 Pro y Claude Sonnet.
 *
 * Uso: node scripts/generate-predictions.mjs
 * Variables de entorno requeridas en .env:
 *   OPENAI_API_KEY
 *   GEMINI_API_KEY
 *   ANTHROPIC_API_KEY
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const MATCHES_PATH = resolve('public/data/matches.json');

// ── Prompt base ────────────────────────────────────────────────────────────────
const buildPrompt = (home, away) =>
    `Eres un experto analista de fútbol. Predecí el resultado del partido del Mundial 2026: ${home.name} vs ${away.name}.
Respondé SOLO con JSON válido, sin texto extra, con este formato exacto:
{
  "winner": "${home.name} | ${away.name} | Empate",
  "score": "X-Y",
  "reasoning": "Máximo 2 oraciones explicando la predicción."
}`;

// ── GPT-4o via Azure OpenAI ────────────────────────────────────────────────────
async function predictGPT(home, away) {
    const endpoint    = process.env.AZURE_OPENAI_ENDPOINT;   // https://xxxx.openai.azure.com
    const deployment  = process.env.AZURE_OPENAI_DEPLOYMENT; // nombre del deployment, ej: gpt-4o
    const apiVersion  = process.env.AZURE_OPENAI_API_VERSION || '2024-02-01';
    const apiKey      = process.env.AZURE_OPENAI_API_KEY;

    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
        body: JSON.stringify({
            messages: [{ role: 'user', content: buildPrompt(home, away) }],
            temperature: 0.3,
            max_tokens: 300,
        }),
    });
    const data = await res.json();
    if (!res.ok || !data.choices) {
        console.error('  GPT raw error:', JSON.stringify(data));
        throw new Error(data.error?.message || `HTTP ${res.status}`);
    }
    const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
    return JSON.parse(text);
}

// ── Gemini 2.0 Flash ───────────────────────────────────────────────────────────
async function predictGemini(home, away) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: buildPrompt(home, away) }] }] }),
    });
    const data = await res.json();
    if (!res.ok || !data.candidates) {
        console.error('  Gemini raw error:', JSON.stringify(data));
        throw new Error(data.error?.message || `HTTP ${res.status}`);
    }
    const text = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
    return JSON.parse(text);
}

// ── Claude Sonnet ──────────────────────────────────────────────────────────────
async function predictClaude(home, away) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-5',
            max_tokens: 300,
            messages: [{ role: 'user', content: buildPrompt(home, away) }],
        }),
    });
    const data = await res.json();
    if (!res.ok || !data.content) {
        console.error('  Claude raw error:', JSON.stringify(data));
        throw new Error(data.error?.message || `HTTP ${res.status}`);
    }
    const text = data.content[0].text.replace(/```json|```/g, '').trim();
    return JSON.parse(text);
}

// ── Main ───────────────────────────────────────────────────────────────────────
const matchesData = JSON.parse(readFileSync(MATCHES_PATH, 'utf-8'));
let updated = 0;

for (const match of matchesData.matches) {
    if (match.status !== 'upcoming') continue;
    const pred = match.predictions;
    const needsUpdate = !pred.gpt.winner || !pred.gemini.winner || !pred.claude.winner;
    if (!needsUpdate) { console.log(`⏭  ${match.id} — ya tiene predicciones`); continue; }

    const { home, away } = match;
    console.log(`\n⚽ Generando predicciones: ${home.name} vs ${away.name}...`);

    const [gpt, gemini, claude] = await Promise.allSettled([
        predictGPT(home, away),
        predictGemini(home, away),
        predictClaude(home, away),
    ]);

    if (gpt.status    === 'fulfilled') { match.predictions.gpt    = gpt.value;    console.log(`  🟢 GPT-4o    → ${gpt.value.winner} ${gpt.value.score}`); }
    else console.error(`  ❌ GPT-4o    falló:`, gpt.reason?.message);

    if (gemini.status === 'fulfilled') { match.predictions.gemini = gemini.value; console.log(`  🔵 Gemini    → ${gemini.value.winner} ${gemini.value.score}`); }
    else console.error(`  ❌ Gemini    falló:`, gemini.reason?.message);

    if (claude.status === 'fulfilled') { match.predictions.claude = claude.value; console.log(`  🟠 Claude    → ${claude.value.winner} ${claude.value.score}`); }
    else console.error(`  ❌ Claude    falló:`, claude.reason?.message);

    updated++;
    await new Promise(r => setTimeout(r, 1000)); // rate limit
}

writeFileSync(MATCHES_PATH, JSON.stringify(matchesData, null, 2));
console.log(`\n✅ Listo. ${updated} partido(s) actualizados en matches.json`);
console.log('   Hacé push para publicar las predicciones.');
