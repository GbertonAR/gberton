/**
 * @system     FlowState AI
 * @module     WorldCupPage.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-06-05
 * @summary    Página dedicada FIFA World Cup 2026 AI Battle — historial de equipos,
 *             técnicos, estilos de juego y predicciones de 3 IAs en competencia.
 */

import { motion } from 'framer-motion';
import { WorldCupBattle } from './WorldCupBattle';
import { WorldCupGlobe } from './3d/WorldCupGlobe';
import { FiStar, FiShield, FiZap, FiUser, FiClock } from 'react-icons/fi';
import { useCountdown } from '../hooks/useCountdown';

// ── Data histórica de los equipos ─────────────────────────────────────────────
const TEAMS = [
    {
        flag: '🇲🇽', name: 'México', group: 'Grupo A',
        worldCups: 17, bestResult: 'Cuartos de Final (1970, 1986)',
        coach: 'Javier Aguirre', coachNotes: 'Veterano de 3 Mundiales como jugador. Volvió para el gran momento local.',
        style: 'Bloque medio + contraataque letal. Intensidad en mediocampo.',
        stars: ['Guillermo Ochoa', 'Santiago Giménez', 'Hirving Lozano', 'Edson Álvarez'],
        color: 'from-green-800 to-green-600', accent: '#16a34a',
        fact: 'El Estadio Azteca es el único recinto en albergar dos finales de Copa del Mundo (1970 y 1986). El partido inaugural del 2026 se juega ahí.'
    },
    {
        flag: '🇦🇷', name: 'Argentina', group: 'Grupo B',
        worldCups: 18, bestResult: '🏆 Campeón (1978, 1986, 2022)',
        coach: 'Lionel Scaloni', coachNotes: 'El técnico más exitoso de la historia albiceleste. Campeón de América 2 veces + Qatar 2022.',
        style: 'Posesión inteligente, bloque compacto y transiciones explosivas con Messi como eje.',
        stars: ['Lionel Messi', 'Julián Álvarez', 'Rodrigo De Paul', 'Emiliano Martínez'],
        color: 'from-sky-700 to-sky-500', accent: '#0284c7',
        fact: 'Argentina llega como bicampeón de Copa América (2021, 2024) y campeón mundial vigente. Messi juega su último Mundial a los 38 años.'
    },
    {
        flag: '🇧🇷', name: 'Brasil', group: 'Grupo C',
        worldCups: 22, bestResult: '🏆 Campeón (1958,1962,1970,1994,2002)',
        coach: 'Dorival Júnior', coachNotes: 'Nuevo ciclo post-crisis. Ganó Copa de Brasil y Libertadores con Flamengo.',
        style: 'Velocidad extrema en bandas con Vinicius y Rodrygo. Sólido atrás con Alisson.',
        stars: ['Vinicius Jr.', 'Rodrygo', 'Raphinha', 'Alisson Becker'],
        color: 'from-yellow-700 to-yellow-500', accent: '#ca8a04',
        fact: 'Brasil es el único pentacampeón mundial pero no gana desde 2002. La presión por el sexto título es inmensa. Vinicius Jr. llega como uno de los mejores del mundo.'
    },
    {
        flag: '🇺🇸', name: 'USA', group: 'Grupo A',
        worldCups: 11, bestResult: '3er Puesto (1930)',
        coach: 'Mauricio Pochettino', coachNotes: 'Ex-PSG y Chelsea. Lleva 18 meses armando una identidad de juego ambiciosa.',
        style: 'Intensidad física, pressing alto. Generación joven de la MLS y Europa.',
        stars: ['Christian Pulisic', 'Weston McKennie', 'Tyler Adams', 'Folarin Balogun'],
        color: 'from-red-700 to-blue-600', accent: '#dc2626',
        fact: 'Como co-anfitrión, USA busca demostrar que el fútbol llegó para quedarse en Norteamérica. Pulisic es el mejor jugador americano de la historia.'
    },
    {
        flag: '🇨🇴', name: 'Colombia', group: 'Grupo A',
        worldCups: 6, bestResult: 'Cuartos de Final (2014)',
        coach: 'Néstor Lorenzo', coachNotes: 'Ex-ayudante de Bielsa. Construyó el mejor Colombia en décadas.',
        style: 'Juego técnico-ofensivo, dominio del mediocampo con James, presión en bandas con Díaz.',
        stars: ['James Rodríguez', 'Luis Díaz', 'Davinson Sánchez', 'Jhon Córdoba'],
        color: 'from-yellow-600 to-red-600', accent: '#d97706',
        fact: 'Colombia fue finalista de Copa América 2024 y llegó invicta a la final. James Rodríguez ganó el Balón de Oro del Mundial 2014. Viene su revancha.'
    },
    {
        flag: '🇪🇨', name: 'Ecuador', group: 'Grupo A',
        worldCups: 4, bestResult: 'Octavos de Final (2006)',
        coach: 'Sebastián Beccacece', coachNotes: 'Argentino formado en el sistema Bielsa. Juego intenso y estructurado.',
        style: 'Pressing alto, juego directo y físico. Moisés Caicedo domina el centro.',
        stars: ['Moisés Caicedo', 'Enner Valencia', 'Piero Hincapié', 'Ángelo Preciado'],
        color: 'from-yellow-500 to-blue-600', accent: '#eab308',
        fact: 'Ecuador sorprendió al mundo en Qatar 2022 ganando el partido inaugural ante el anfitrión Qatar. Busca repetir la hazaña ante México.'
    },
    {
        flag: '🇨🇱', name: 'Chile', group: 'Grupo B',
        worldCups: 9, bestResult: '3er Puesto (1962)',
        coach: 'Ricardo Gareca', coachNotes: 'El Tigre, histórico del fútbol sudamericano. Llevó a Perú a un Mundial tras 36 años.',
        style: 'En transición generacional. Intenta recuperar el pressing de la era dorada.',
        stars: ['Alexis Sánchez', 'Víctor Dávila', 'Paulo Díaz', 'Sebastián Vegas'],
        color: 'from-red-700 to-red-500', accent: '#dc2626',
        fact: 'Chile ganó 2 Copas América consecutivas (2015, 2016) con la Generación Dorada de Vidal y Alexis. Esa era terminó y busca una nueva identidad.'
    },
    {
        flag: '🇵🇾', name: 'Paraguay', group: 'Grupo C',
        worldCups: 9, bestResult: 'Cuartos de Final (2010)',
        coach: 'Gustavo Morínigo', coachNotes: 'Sólido trabajo con el plantel local. Paraguay difícil de batir.',
        style: 'Bloque bajo, solidez defensiva y salida rápida a los extremos.',
        stars: ['Miguel Almirón', 'Antonio Sanabria', 'Julio Enciso', 'Robert Rojas'],
        color: 'from-red-600 to-blue-700', accent: '#7c3aed',
        fact: 'Paraguay es históricamente difícil de golear. En el Mundial 2010 llegó a cuartos sin ganar un solo partido en 90 minutos. Almirón es su gran figura.'
    },
    {
        flag: '🇵🇪', name: 'Perú', group: 'Grupo B',
        worldCups: 5, bestResult: '4to Puesto (1975 Copa América)',
        coach: 'Jorge Fossati', coachNotes: 'Uruguayo histórico en CONMEBOL. Intentó la recuperación post-Gareca.',
        style: 'Compacto, salida prolija. Depende mucho de Cueva y Lapadula en ataque.',
        stars: ['Christian Cueva', 'Gianluca Lapadula', 'André Carrillo', 'Pedro Gallese'],
        color: 'from-red-600 to-white', accent: '#dc2626',
        fact: 'Perú retornó a los Mundiales en 2018 tras 36 años. Lapadula, nacido en Italia, eligió representar a Perú y se convirtió en ídolo popular.'
    }
];

// ── Team Card ─────────────────────────────────────────────────────────────────
const TeamCard = ({ team, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 group"
    >
        {/* Header */}
        <div className={`bg-gradient-to-r ${team.color} p-5 flex items-center gap-4`}>
            <span className="text-5xl">{team.flag}</span>
            <div>
                <h3 className="text-xl font-heading font-extrabold text-white">{team.name}</h3>
                <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">{team.group}</span>
            </div>
            <div className="ml-auto text-right">
                <div className="text-white/90 text-xs font-bold">{team.worldCups} Mundiales</div>
                <div className="text-white/70 text-[10px]">{team.bestResult}</div>
            </div>
        </div>

        <div className="p-5 space-y-4">
            {/* Técnico */}
            <div className="flex items-start gap-3">
                <FiUser className="text-slate-500 mt-0.5 flex-shrink-0 w-4 h-4" />
                <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Técnico</div>
                    <div className="text-white font-semibold text-sm">{team.coach}</div>
                    <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{team.coachNotes}</div>
                </div>
            </div>

            {/* Estilo */}
            <div className="flex items-start gap-3">
                <FiShield className="text-slate-500 mt-0.5 flex-shrink-0 w-4 h-4" />
                <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Estilo de Juego</div>
                    <div className="text-slate-300 text-xs leading-relaxed">{team.style}</div>
                </div>
            </div>

            {/* Estrellas */}
            <div className="flex items-start gap-3">
                <FiStar className="text-slate-500 mt-0.5 flex-shrink-0 w-4 h-4" />
                <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Jugadores Clave</div>
                    <div className="flex flex-wrap gap-1.5">
                        {team.stars.map(p => (
                            <span key={p} className="text-[11px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-300 font-medium">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dato histórico */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                <div className="flex items-start gap-2">
                    <FiZap className="flex-shrink-0 mt-0.5 w-3.5 h-3.5" style={{ color: team.accent }} />
                    <p className="text-xs text-slate-400 leading-relaxed">{team.fact}</p>
                </div>
            </div>
        </div>
    </motion.div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const CountUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl px-5 py-4 min-w-[88px] text-center backdrop-blur-sm">
            <span className="text-5xl md:text-6xl font-heading font-extrabold text-white tabular-nums">
                {String(value).padStart(2, '0')}
            </span>
        </div>
        <span className="text-[11px] text-emerald-500/70 uppercase tracking-widest mt-2 font-semibold">{label}</span>
    </div>
);

const WorldCupPage = () => {
    const wc = useCountdown('2026-06-11T21:00:00Z');

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: 'linear-gradient(180deg, #020805 0%, #050f05 30%, #060814 70%, #050810 100%)' }}>

            {/* ── COUNTDOWN BANNER — Primera línea de la página ── */}
            <div className="pt-24 pb-0 relative" style={{ background: 'linear-gradient(180deg, #010d03 0%, #020805 100%)' }}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,#16a34a12_0%,transparent_70%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 pt-8 pb-12 text-center relative z-10">
                    <div className="flex items-center justify-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
                        <FiClock className="w-3.5 h-3.5" />
                        {wc.over ? '¡El torneo ya comenzó!' : 'Cuenta regresiva al partido inaugural'}
                    </div>
                    {!wc.over && (
                        <div className="flex items-end justify-center gap-4">
                            <CountUnit value={wc.days}    label="Días" />
                            <span className="text-4xl text-emerald-700 font-bold mb-5">:</span>
                            <CountUnit value={wc.hours}   label="Horas" />
                            <span className="text-4xl text-emerald-700 font-bold mb-5">:</span>
                            <CountUnit value={wc.minutes} label="Minutos" />
                            <span className="text-4xl text-emerald-700 font-bold mb-5">:</span>
                            <CountUnit value={wc.seconds} label="Segundos" />
                        </div>
                    )}
                    <p className="text-slate-500 text-xs mt-6">
                        {wc.over
                            ? '⚽ Fase de Grupos en curso · 5 grupos · 30 partidos'
                            : '🇲🇽 México vs Sudáfrica · Estadio Azteca · 11 de junio 2026'}
                    </p>
                </div>
                {/* Divisor verde */}
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            </div>

            {/* ── Globo 3D ── */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #020805 0%, #030e06 100%)' }}>
                <WorldCupGlobe />
            </section>

            {/* Hero */}
            <section className="pt-4 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#16a34a18_0%,transparent_60%)] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                            <span className="animate-pulse">⚽</span> FIFA World Cup 2026 · AI Intelligence Hub
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 leading-tight">
                            La IA más precisa<br />
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                gana el Mundial
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            GPT-4o, Gemini 1.5 y Claude Sonnet compiten en predicciones reales partido a partido.
                            Votá por tu favorita. Al final del torneo sabremos cuál IA analiza mejor el fútbol.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* AI Battle — componente existente sin modificar */}
            <WorldCupBattle />

            {/* Análisis Histórico de Equipos */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold uppercase text-xs tracking-wider mb-3">
                        <FiShield /> Inteligencia Táctica
                    </div>
                    <h2 className="text-4xl font-heading font-extrabold">Ficha de los Equipos</h2>
                    <p className="text-slate-400 mt-3 max-w-xl mx-auto">
                        Historial, técnico, estilo de juego y jugadores clave de cada selección en el AI Battle.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TEAMS.map((team, i) => (
                        <TeamCard key={team.name} team={team} index={i} />
                    ))}
                </div>
            </section>

            {/* CTA FlowState */}
            <section className="py-20 border-t border-white/5 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <p className="text-slate-400 text-sm mb-2">Este análisis fue construido con</p>
                    <p className="text-white font-bold text-lg mb-6">
                        FlowState AI · Ecosistema de Inteligencia Conectada
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-flow-tech to-flow-cyan text-white font-bold px-8 py-4 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-flow-tech/25"
                    >
                        ¿Querés IA agéntica en tu empresa? Hablemos →
                    </a>
                </div>
            </section>
        </div>
    );
};

export default WorldCupPage;
