/**
 * @system     FlowState AI
 * @module     WorldCupBattle.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-06-05
 * @summary    AI Battle · FIFA World Cup 2026 — Predicciones reales de GPT-4o, Gemini y Claude.
 *             Dos scoreboards: popularidad por votos vs precisión real de predicciones.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiX, FiAward, FiBarChart2, FiTarget, FiClock } from 'react-icons/fi';

const AI_CONFIG = {
    claude:  { name: 'Claude Sonnet', maker: 'Anthropic', emoji: '🟠', color: '#D97706', bg: 'from-amber-900/40 to-amber-800/20', border: 'border-amber-500/40', badge: 'bg-amber-500' },
    gpt:     { name: 'GPT-4o',        maker: 'OpenAI',    emoji: '🟢', color: '#10A37F', bg: 'from-emerald-900/40 to-emerald-800/20', border: 'border-emerald-500/40', badge: 'bg-emerald-500' },
    gemini:  { name: 'Gemini 1.5',    maker: 'Google',    emoji: '🔵', color: '#4285F4', bg: 'from-blue-900/40 to-blue-800/20', border: 'border-blue-500/40', badge: 'bg-blue-500' },
};

// ── Countdown ──────────────────────────────────────────────────────────────────
const useCountdown = (targetDate) => {
    const calc = useCallback(() => {
        const diff = new Date(targetDate) - new Date();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
        return {
            days:    Math.floor(diff / 86400000),
            hours:   Math.floor((diff % 86400000) / 3600000),
            minutes: Math.floor((diff % 3600000) / 60000),
            seconds: Math.floor((diff % 60000) / 1000),
            over: false,
        };
    }, [targetDate]);

    const [time, setTime] = useState(calc);
    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, [calc]);
    return time;
};

const CountUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[72px] text-center">
            <span className="text-4xl font-heading font-extrabold text-white tabular-nums">
                {String(value).padStart(2, '0')}
            </span>
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{label}</span>
    </div>
);

// ── Vote Modal ─────────────────────────────────────────────────────────────────
const VoteModal = ({ ai, matchId, onClose, onVoted }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const cfg = AI_CONFIG[ai];

    const submit = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
        setStatus('loading');
        try {
            const res = await fetch('/api/register-vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, voted_for: ai, match_id: matchId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setStatus('success');
            setTimeout(() => { onVoted(ai); onClose(); }, 1800);
        } catch {
            setStatus('error');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(5,8,17,0.85)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="relative bg-[#0D0F26] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white p-1">
                    <FiX className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <div className="text-5xl mb-3">{cfg.emoji}</div>
                    <h3 className="text-xl font-bold text-white">Votás por <span style={{ color: cfg.color }}>{cfg.name}</span></h3>
                    <p className="text-slate-400 text-sm mt-1">Ingresá tu email para registrar el voto y seguir los resultados.</p>
                    <p className="text-slate-600 text-xs mt-2">Al votar aceptás recibir novedades de FlowState AI. Sin spam.</p>
                </div>

                {status === 'success' ? (
                    <div className="text-center py-4">
                        <div className="text-4xl mb-2">✅</div>
                        <p className="text-emerald-400 font-bold">¡Voto registrado!</p>
                    </div>
                ) : (
                    <form onSubmit={submit} className="space-y-3">
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="tu@email.com" required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-white/30 text-sm"
                        />
                        <button
                            type="submit" disabled={status === 'loading'}
                            className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all"
                            style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}99)` }}
                        >
                            {status === 'loading' ? 'Registrando...' : `⚽ Confirmar voto por ${cfg.name}`}
                        </button>
                        {status === 'error' && <p className="text-red-400 text-xs text-center">Error al registrar. Intentá de nuevo.</p>}
                    </form>
                )}
            </motion.div>
        </motion.div>
    );
};

// ── Scoreboard ─────────────────────────────────────────────────────────────────
const Scoreboard = ({ votes, accuracy, totalPredicted }) => {
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    const keys = ['gpt', 'gemini', 'claude'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Votos */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FiBarChart2 className="text-flow-cyan w-5 h-5" />
                    <h4 className="font-bold text-white">🗳️ ¿A quién le confían?</h4>
                    <span className="text-xs text-slate-500 ml-auto">{totalVotes} votos</span>
                </div>
                <div className="space-y-3">
                    {keys.sort((a, b) => votes[b] - votes[a]).map(key => {
                        const pct = totalVotes ? Math.round((votes[key] / totalVotes) * 100) : 0;
                        const cfg = AI_CONFIG[key];
                        return (
                            <div key={key}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">{cfg.emoji} {cfg.name}</span>
                                    <span className="font-bold text-white">{pct}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: cfg.color }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Precisión */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FiTarget className="text-innovation-magenta w-5 h-5" />
                    <h4 className="font-bold text-white">🎯 ¿Quién acierta?</h4>
                    <span className="text-xs text-slate-500 ml-auto">{totalPredicted} partidos jugados</span>
                </div>
                {totalPredicted === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">
                        Los resultados aparecen después de cada partido.
                        <br />Torneo inicia el 11/06/2026 🏆
                    </p>
                ) : (
                    <div className="space-y-3">
                        {keys.sort((a, b) => accuracy[b] - accuracy[a]).map((key, idx) => {
                            const pct = totalPredicted ? Math.round((accuracy[key] / totalPredicted) * 100) : 0;
                            const cfg = AI_CONFIG[key];
                            const medals = ['🥇', '🥈', '🥉'];
                            return (
                                <div key={key}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-300">{medals[idx]} {cfg.name}</span>
                                        <span className="font-bold text-white">{accuracy[key]}/{totalPredicted} ({pct}%)</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            className="h-full rounded-full"
                                            style={{ background: cfg.color }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export const WorldCupBattle = () => {
    const [matchesData, setMatchesData] = useState(null);
    const [featured, setFeatured]       = useState(null);
    const [voteModal, setVoteModal]     = useState(null);
    const [localVotes, setLocalVotes]   = useState({ claude: 0, gpt: 0, gemini: 0 });
    const [votedMatch, setVotedMatch]   = useState(null);

    const OPENING = '2026-06-11T21:00:00Z';
    const countdown = useCountdown(OPENING);

    useEffect(() => {
        fetch('/data/matches.json')
            .then(r => r.json())
            .then(data => {
                setMatchesData(data);
                setLocalVotes(data.scoreboard.votes);
                const next = data.matches.find(m => m.status === 'upcoming' && m.is_featured) || data.matches[0];
                setFeatured(next);
            })
            .catch(() => {});
    }, []);

    const handleVoted = (ai) => {
        setLocalVotes(prev => ({ ...prev, [ai]: prev[ai] + 1 }));
        setVotedMatch(featured?.id);
    };

    if (!matchesData || !featured) return null;

    const { scoreboard } = matchesData;
    const alreadyVoted = votedMatch === featured.id;

    return (
        <section className="py-20 relative overflow-hidden border-t border-white/5">
            {/* Fondo campo de fútbol */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a2a0a_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0003_1px,transparent_1px),linear-gradient(to_bottom,#00ff0003_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
                        <span className="animate-pulse">⚽</span> FIFA World Cup 2026 · AI Battle
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-3">
                        ¿Cuál AI predice mejor?
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        GPT-4o, Gemini 1.5 y Claude compiten en predicciones reales. Votá por tu favorita y seguí quién acerta más.
                    </p>
                </motion.div>

                {/* Countdown */}
                <div className="flex flex-col items-center mb-12">
                    <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest mb-4">
                        <FiClock className="w-3.5 h-3.5" />
                        {countdown.over ? 'El torneo ya comenzó' : 'Arranca en'}
                    </div>
                    {!countdown.over && (
                        <div className="flex items-end gap-3">
                            <CountUnit value={countdown.days}    label="días" />
                            <span className="text-3xl text-slate-600 mb-4">:</span>
                            <CountUnit value={countdown.hours}   label="horas" />
                            <span className="text-3xl text-slate-600 mb-4">:</span>
                            <CountUnit value={countdown.minutes} label="min" />
                            <span className="text-3xl text-slate-600 mb-4">:</span>
                            <CountUnit value={countdown.seconds} label="seg" />
                        </div>
                    )}
                </div>

                {/* Partido destacado */}
                <div className="text-center mb-6">
                    <span className="text-xs text-slate-500 uppercase tracking-widest">Próximo a predecir</span>
                    <div className="flex items-center justify-center gap-6 mt-3">
                        <div className="text-center">
                            <div className="text-5xl">{featured.home.flag}</div>
                            <div className="text-white font-bold mt-1">{featured.home.name}</div>
                        </div>
                        <div className="text-slate-500 font-bold text-xl">VS</div>
                        <div className="text-center">
                            <div className="text-5xl">{featured.away.flag}</div>
                            <div className="text-white font-bold mt-1">{featured.away.name}</div>
                        </div>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">
                        {featured.phase} · {new Date(featured.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                {/* 3 Paneles AI */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {['gpt', 'gemini', 'claude'].map(key => {
                        const cfg = AI_CONFIG[key];
                        const pred = featured.predictions[key];
                        const hasPredict = pred?.winner !== null;

                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: key === 'gpt' ? 0 : key === 'gemini' ? 0.1 : 0.2 }}
                                className={`bg-gradient-to-b ${cfg.bg} border ${cfg.border} rounded-2xl p-5 flex flex-col`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">{cfg.emoji}</span>
                                    <div>
                                        <div className="font-bold text-white text-sm">{cfg.name}</div>
                                        <div className="text-xs text-slate-500">{cfg.maker}</div>
                                    </div>
                                </div>

                                {hasPredict ? (
                                    <>
                                        <div className="text-center py-3 mb-3 bg-white/5 rounded-xl">
                                            <div className="text-sm text-slate-400 mb-1">Predicción</div>
                                            <div className="font-extrabold text-white">{pred.winner}</div>
                                            {pred.score && <div className="text-xs text-slate-500 mt-0.5">{pred.score}</div>}
                                        </div>
                                        {pred.reasoning && (
                                            <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">{pred.reasoning}</p>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center py-6">
                                        <p className="text-slate-600 text-xs text-center">Predicción disponible<br/>antes del partido</p>
                                    </div>
                                )}

                                <button
                                    onClick={() => !alreadyVoted && setVoteModal(key)}
                                    disabled={alreadyVoted}
                                    className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all mt-auto ${
                                        alreadyVoted
                                        ? 'bg-white/5 text-slate-600 cursor-not-allowed'
                                        : 'text-white hover:-translate-y-0.5 hover:shadow-lg active:scale-95'
                                    }`}
                                    style={!alreadyVoted ? { background: `linear-gradient(135deg, ${cfg.color}cc, ${cfg.color}66)` } : {}}
                                >
                                    {alreadyVoted ? '✓ Voto registrado' : `Voto por ${cfg.name.split(' ')[0]}`}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Scoreboards */}
                <Scoreboard
                    votes={localVotes}
                    accuracy={scoreboard.accuracy}
                    totalPredicted={scoreboard.total_predicted}
                />

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <p className="text-slate-500 text-sm">
                        ¿Querés IA agentica en tu empresa?{' '}
                        <a href="/contact" className="text-flow-cyan hover:underline font-semibold">
                            Hablemos →
                        </a>
                    </p>
                </motion.div>
            </div>

            {/* Vote Modal */}
            <AnimatePresence>
                {voteModal && (
                    <VoteModal
                        ai={voteModal}
                        matchId={featured.id}
                        onClose={() => setVoteModal(null)}
                        onVoted={handleVoted}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};
