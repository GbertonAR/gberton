/**
 * @system     FlowState AI
 * @brand      Dinamismo y Flujo
 * @module     HomeDashboard.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-05-02
 * @updated    2026-06-03
 * @summary    Landing de alto impacto: hero oscuro, social proof, métricas animadas y CTAs de conversión.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FiCpu, FiUser, FiCode, FiArrowRight, FiGlobe,
    FiX, FiDownload, FiMessageSquare, FiZap, FiShield,
    FiCheckCircle, FiChevronRight,
} from 'react-icons/fi';
import { NeuralNetwork3D } from './3d/NeuralNetwork3D';

/* ── CV PDFs ── */
const CV_PDF = {
    es: '/cv/GBerton2026v2Spa--3.pdf',
    en: '/cv/GBerton2026v2Ing--3.pdf',
};

/* ── Social Proof ── */
const clients = [
    'Agencia Nacional de Seguridad Vial',
    'WFD · Reforma Laboral',
    'Centro Médico Helguera',
    'Clínica del Niño de Quilmes',
    'Unilever / Arcor Context',
    'Parlamento Normativo Digital',
    'OSDE / Obras Sociales',
    'FlowState AI Factory',
];

/* ── Stats config ── */
const statsConfig = [
    { value: 25, suffix: '+', label: 'Años de Experiencia',      icon: <FiShield />      },
    { value: 6,  suffix: '',  label: 'Sistemas en Producción',   icon: <FiCpu />         },
    { value: 21, suffix: '',  label: 'Colaboradores IA',         icon: <FiZap />         },
    { value: 3,  suffix: '',  label: 'Verticales Enterprise',    icon: <FiCheckCircle /> },
];

/* ── Modules ── */
const modules = [
    {
        id: 'factory',
        title: 'FlowState AI Factory',
        description: 'Ecosistema de 6 agentes inteligentes en HealthTech, LegalTech, GovTech y FinTech sobre Azure Native.',
        icon: <FiCpu className="w-7 h-7" />,
        gradient: 'from-flow-tech to-flow-cyan',
        path: '/factory',
        badge: '6 Agentes · READY',
        badgeColor: 'text-emerald-400 bg-emerald-400/10',
    },
    {
        id: 'cv',
        title: 'Perfil Profesional',
        description: 'Trayectoria de 25+ años en transformación digital, arquitectura Cloud/AI y liderazgo enterprise en LATAM.',
        icon: <FiUser className="w-7 h-7" />,
        gradient: 'from-innovation-purple to-innovation-magenta',
        path: '/cv',
        badge: '25+ Años · LATAM',
        badgeColor: 'text-purple-400 bg-purple-400/10',
        isCv: true,
    },
    {
        id: 'projects',
        title: 'Proyectos & Datos',
        description: 'Casos reales: facturación médica IA, auditoría electoral, compliance legal y analytics predictivo.',
        icon: <FiCode className="w-7 h-7" />,
        gradient: 'from-amber-500 to-orange-400',
        path: '/projects',
        badge: '30+ Reportes',
        badgeColor: 'text-amber-400 bg-amber-400/10',
    },
];

/* ══════════════════════════════════════════════
   StatCard — componente separado para cumplir
   las reglas de React Hooks (no hooks en loops)
══════════════════════════════════════════════ */
const StatCard = ({ stat, index, parentInView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!parentInView) return;
        let frame = 0;
        const duration = 1600;
        const steps = duration / 16;
        const increment = stat.value / steps;
        const timer = setInterval(() => {
            frame++;
            const next = Math.min(Math.round(increment * frame), stat.value);
            setCount(next);
            if (next >= stat.value) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [parentInView, stat.value]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 text-center
                       hover:border-flow-cyan/20 hover:bg-white/[0.04] transition-all duration-300 group"
        >
            <div className="text-flow-cyan text-2xl mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
            </div>
            <div className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-1">
                {count}{stat.suffix}
            </div>
            <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">
                {stat.label}
            </div>
        </motion.div>
    );
};

/* ══════════════════════════════════════════════
   HomeDashboard — componente principal
══════════════════════════════════════════════ */
const HomeDashboard = () => {
    const navigate       = useNavigate();
    const [showCvModal, setShowCvModal] = useState(false);

    /* inView para los contadores */
    const statsRef  = useRef(null);
    const statsView = useInView(statsRef, { once: true, margin: '-80px' });

    /* Typewriter de roles */
    const roles = [
        'Arquitecto de Soluciones AI',
        'Líder de Transformación Digital',
        'Founder · FlowState AI',
        'Experto en Azure & GCP',
    ];
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed,  setDisplayed]  = useState('');
    const [deleting,   setDeleting]   = useState(false);

    useEffect(() => {
        const current = roles[roleIndex];
        const speed   = deleting ? 38 : 78;
        const timeout = setTimeout(() => {
            if (!deleting) {
                const next = current.slice(0, displayed.length + 1);
                setDisplayed(next);
                if (next === current) setTimeout(() => setDeleting(true), 1900);
            } else {
                const next = current.slice(0, displayed.length - 1);
                setDisplayed(next);
                if (next === '') {
                    setDeleting(false);
                    setRoleIndex((i) => (i + 1) % roles.length);
                }
            }
        }, speed);
        return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayed, deleting, roleIndex]);

    return (
        <div className="text-white min-h-screen font-sans">

            {/* ══ SECCIÓN HERO ══ */}
            <section className="relative min-h-screen flex items-center overflow-hidden border-b border-white/5">
                {/* Fondo de cuadrícula */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                {/* Blobs de luz */}
                <div className="absolute top-1/4 -right-40 w-[650px] h-[650px] bg-gradient-to-l from-flow-tech/15 to-transparent blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-gradient-to-r from-innovation-purple/10 to-transparent blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* — Columna izquierda: Texto — */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* Badge disponible */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20
                                           text-emerald-400 text-xs font-bold tracking-widest uppercase
                                           px-4 py-2 rounded-full mb-8"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Disponible · Proyectos Enterprise
                            </motion.div>

                            {/* Nombre */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.7 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.05] mb-6"
                            >
                                Gustavo<br />
                                <span className="bg-gradient-to-r from-flow-tech to-flow-cyan bg-clip-text text-transparent">
                                    Berton
                                </span>
                            </motion.h1>

                            {/* Typewriter rol */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="h-10 mb-6"
                            >
                                <span className="text-xl md:text-2xl text-flow-cyan font-heading font-semibold">
                                    {displayed}
                                    <span className="animate-pulse ml-0.5">|</span>
                                </span>
                            </motion.div>

                            {/* Descripción */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10"
                            >
                                Diseño ecosistemas de IA agéntica sobre Azure y GCP que resuelven
                                problemas reales en HealthTech, LegalTech y GovTech.
                                Del prototipo al sistema productivo, en semanas.
                            </motion.p>

                            {/* CTAs primarios */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.75 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={() => navigate('/factory')}
                                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-flow-tech to-flow-cyan
                                               text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-flow-tech/25
                                               hover:shadow-flow-tech/45 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <FiCpu className="w-5 h-5" />
                                    Ver AI Factory
                                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="group flex items-center justify-center gap-3 bg-white/[0.04] border border-white/15
                                               text-white font-bold px-8 py-4 rounded-xl
                                               hover:bg-white/[0.08] hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <FiMessageSquare className="w-5 h-5" />
                                    Hablemos
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* — Columna derecha: Foto y Red Neuronal 3D — */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative flex justify-center lg:justify-end w-full h-[400px] lg:h-[500px] items-center"
                        >
                            {/* Glow de fondo */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-flow-tech/20 to-flow-cyan/10 blur-3xl pointer-events-none" />
                            </div>

                            {/* RED NEURONAL 3D (Background interactivo) */}
                            <div className="absolute inset-0 -m-20 z-0 mix-blend-screen opacity-90">
                                <NeuralNetwork3D />
                            </div>

                            {/* Marco de foto */}
                            <div className="relative w-72 h-72 md:w-80 md:h-80 z-10 pointer-events-none">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-flow-tech to-flow-cyan p-[3px]">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-[#0D0F26]">
                                        <img
                                            src="/img/Personal.jpg"
                                            alt="Gustavo Berton"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Badge orbitante 1 */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                                    className="absolute -inset-6 pointer-events-none"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                                    bg-[#0D0F26] border border-flow-cyan/30 rounded-xl
                                                    px-3 py-1.5 text-[10px] font-bold text-flow-cyan tracking-widest shadow-lg">
                                        AZURE NATIVE
                                    </div>
                                </motion.div>

                                {/* Badge orbitante 2 */}
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                                    className="absolute -inset-10 pointer-events-none"
                                >
                                    <div className="absolute bottom-4 right-0
                                                    bg-[#0D0F26] border border-innovation-magenta/30 rounded-xl
                                                    px-3 py-1.5 text-[10px] font-bold text-innovation-magenta tracking-widest shadow-lg">
                                        LANGGRAPH
                                    </div>
                                </motion.div>

                                {/* Badge estático inferior */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2
                                                bg-[#0D0F26] border border-white/10 rounded-2xl
                                                px-5 py-2.5 flex items-center gap-2 shadow-xl whitespace-nowrap">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs font-bold text-slate-300 tracking-wider">Sistema Activo v3.0</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Indicador de scroll */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-slate-600 text-[10px] tracking-widest uppercase">Explorar</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-5 h-8 border border-white/10 rounded-full flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 bg-flow-cyan/60 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ══ SOCIAL PROOF MARQUEE ══ */}
            <section className="py-5 border-y border-white/5 bg-white/[0.01] overflow-hidden">
                <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest mb-3 font-semibold">
                    Organizaciones que han confiado en el ecosistema
                </p>
                <div className="relative overflow-hidden">
                    <div
                        className="flex gap-16 items-center whitespace-nowrap"
                        style={{ animation: 'marquee 35s linear infinite' }}
                    >
                        {[...clients, ...clients].map((c, i) => (
                            <span key={i} className="text-slate-500 text-sm font-semibold tracking-wide flex items-center gap-3 flex-shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-flow-cyan/40" />
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CONTADORES ANIMADOS ══ */}
            <section ref={statsRef} className="py-20 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {statsConfig.map((s, i) => (
                        <StatCard key={i} stat={s} index={i} parentInView={statsView} />
                    ))}
                </div>
            </section>

            {/* ══ MÓDULOS ══ */}
            <section className="pb-20 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-flow-cyan font-semibold uppercase text-xs tracking-wider mb-3">
                        <FiZap /> Acceso Directo
                    </div>
                    <h2 className="text-4xl font-heading font-extrabold">Explora el Ecosistema</h2>
                    <p className="text-slate-400 mt-3 max-w-xl mx-auto">
                        Tres módulos independientes. Cada uno con profundidad técnica real.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {modules.map((mod, i) => (
                        <motion.div
                            key={mod.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            onClick={() => {
                                if (mod.isCv) setShowCvModal(true);
                                else navigate(mod.path);
                            }}
                            className="group cursor-pointer bg-[#0D0F26] border border-white/5 rounded-3xl overflow-hidden
                                       shadow-2xl hover:border-white/15 transition-all duration-300 flex flex-col"
                        >
                            {/* Borde superior gradiente */}
                            <div className={`h-[4px] bg-gradient-to-r ${mod.gradient}`} />

                            <div className="p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    {/* Ícono */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.gradient}
                                                     flex items-center justify-center text-white mb-6 shadow-lg
                                                     group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        {mod.icon}
                                    </div>
                                    {/* Badge de estado */}
                                    <div className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold
                                                     tracking-widest px-2.5 py-1 rounded-lg mb-4 ${mod.badgeColor}`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                        {mod.badge}
                                    </div>
                                    <h3 className="text-xl font-heading font-extrabold text-white mb-3
                                                   group-hover:text-flow-cyan transition-colors duration-300">
                                        {mod.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {mod.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/5
                                                text-slate-500 group-hover:text-flow-cyan transition-colors font-bold text-sm">
                                    <span>Explorar</span>
                                    <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══ CTA FINAL ══ */}
            <section className="py-28 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-flow-tech/8 via-transparent to-innovation-purple/8 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 text-innovation-magenta font-semibold uppercase text-xs tracking-wider mb-6">
                            <FiMessageSquare /> ¿Tenés un desafío enterprise?
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
                            Transformemos tu idea<br />
                            <span className="bg-gradient-to-r from-flow-tech to-flow-cyan bg-clip-text text-transparent">
                                en un sistema real.
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                            Del prototipo al sistema productivo en semanas. Arquitectura Azure,
                            agentes IA y automatización industrial sin fricción.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/contact')}
                                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-flow-tech to-flow-cyan
                                           text-white font-bold text-lg px-10 py-5 rounded-xl shadow-xl shadow-flow-tech/25
                                           hover:shadow-flow-tech/45 hover:-translate-y-1 transition-all duration-300"
                            >
                                <FiMessageSquare className="w-5 h-5" />
                                Iniciar Conversación
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => setShowCvModal(true)}
                                className="group flex items-center justify-center gap-3 bg-white/[0.04] border border-white/15
                                           text-white font-bold text-lg px-10 py-5 rounded-xl
                                           hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
                            >
                                <FiDownload className="w-5 h-5" />
                                Descargar CV
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ MODAL CV ══ */}
            <AnimatePresence>
                {showCvModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(5,8,17,0.75)' }}
                        onClick={() => setShowCvModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.88, y: 24 }}
                            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                            className="relative bg-[#0D0F26] border border-white/10 rounded-3xl shadow-2xl p-10 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowCvModal(false)}
                                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                            >
                                <FiX className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-flow-tech to-flow-cyan flex items-center justify-center text-white mb-4 shadow-lg shadow-flow-tech/30">
                                    <FiGlobe className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-bold text-white font-heading">Descargar Curriculum</h2>
                                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                    Seleccioná el idioma para ver o descargar el CV.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href={CV_PDF.es}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setShowCvModal(false)}
                                    className="group flex flex-col items-center gap-3 bg-gradient-to-br from-flow-tech to-flow-cyan
                                               text-white rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span className="text-3xl">🇦🇷</span>
                                    <span className="font-bold text-sm tracking-wide">Español</span>
                                    <FiDownload className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <a
                                    href={CV_PDF.en}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setShowCvModal(false)}
                                    className="group flex flex-col items-center gap-3 bg-gradient-to-br from-innovation-purple to-innovation-magenta
                                               text-white rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span className="text-3xl">🇺🇸</span>
                                    <span className="font-bold text-sm tracking-wide">English</span>
                                    <FiDownload className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                            <p className="text-center text-xs text-slate-600 mt-6">
                                El PDF se abrirá en una nueva pestaña.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeDashboard;
