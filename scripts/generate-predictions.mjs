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

// ── GPT-4o ─────────────────────────────────────────────────────────────────────
async function predictGPT(home, away) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: buildPrompt(home, away) }],
            temperature: 0.3,
            max_tokens: 200,
        }),
    });
    const data = await res.json();
    return JSON.parse(data.choices[0].message.content);
}

// ── Gemini 1.5 Pro ─────────────────────────────────────────────────────────────
async function predictGemini(home, away) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: buildPrompt(home, away) }] }] }),
    });
    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    return JSON.parse(text.replace(/```json|```/g, '').trim());
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
            model: 'claude-sonnet-4-6',
            max_tokens: 200,
            messages: [{ role: 'user', content: buildPrompt(home, away) }],
        }),
    });
    const data = await res.json();
    return JSON.parse(data.content[0].text);
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
