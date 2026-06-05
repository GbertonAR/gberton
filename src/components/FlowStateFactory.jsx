/* eslint-disable no-unused-vars */
/**
 * @system     FlowState AI
 * @brand      Dinamismo y Flujo 
 * @module     FlowStateFactory.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-06-01
 * @updated    2026-06-03
 * @summary    Rediseño interactivo del centro de comando de FlowState AI Software Factory, integrando el portfolio real de sistemas de la organización.
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { StaffOrbit3D } from './3d/StaffOrbit3D';
import { 
    FiShield, FiTrendingUp, FiGlobe, FiMessageSquare, FiZap, 
    FiTarget, FiEye, FiBarChart2, FiLayers, FiCpu, FiFileText, 
    FiTerminal, FiCheckCircle, FiAlertTriangle, FiMaximize2, FiGrid, FiMap
} from 'react-icons/fi';

const mockLogsTemplates = [
    { type: 'REQ', text: 'Inicio de petición externa - GET /api/v3/factory/status', reqId: 'FS-98E1' },
    { type: 'WORKFLOW', text: 'Iniciando verificación de tokens de acceso y ACL corporativo.', reqId: 'FS-98E1' },
    { type: 'AGENT', text: 'KAI (Master Orchestrator) coordina handoff para ADA L (Architect).', reqId: 'FS-98E1' },
    { type: 'WORKFLOW', text: 'Validación exitosa del Modelo C4 Nivel 2 contra el inventario.', reqId: 'FS-98E1' },
    { type: 'OK', text: 'Ecosistema de agentes en línea. Salud Técnica: 10/10.', reqId: 'FS-98E1' },
    { type: 'REQ', text: 'Inicio de transacción - POST /api/v3/legal/rag/audit', reqId: 'FS-408A' },
    { type: 'WORKFLOW', text: 'Procesando PDF normativo con OCR (Azure AI Document Intelligence).', reqId: 'FS-408A' },
    { type: 'AGENT', text: 'LEX analiza compliance y clàusula de propiedad intelectual.', reqId: 'FS-408A' },
    { type: 'OK', text: 'Auditoría completada. Reporte generado: LexIA_MVP_Ready.html', reqId: 'FS-408A' },
    { type: 'FAULT', text: 'Error crítico en Gateway de base de datos SQLModel. TimeOut en réplica Azure.', reqId: 'FS-91B2' },
    { type: 'WORKFLOW', text: 'Célula de Blindaje activada. CYRA ejecuta protocolo de failover a GCP (Secundario).', reqId: 'FS-91B2' },
    { type: 'OK', text: 'Failover exitoso en 180ms. Base de datos redundante en línea.', reqId: 'FS-91B2' }
];

const FlowStateFactory = () => {
    const { t } = useTranslation();
    const [selectedVertical, setSelectedVertical] = useState('ALL');
    const [selectedDiagram, setSelectedDiagram] = useState('ecosystem');
    const [logs, setLogs] = useState([]);
    const [activeLogIndex, setActiveLogIndex] = useState(0);

    const kpiValues = ['LATAM Enterprise', 'SaaS / Agentic', 'Azure Native (High Av.)', '21 Digital GEMS'];
    const kpiIcons  = [<FiGlobe />, <FiLayers />, <FiZap />, <FiCpu />];
    const kpis = kpiValues.map((val, i) => ({
        label: t(`factory.kpiLabels.${i}`), val, icon: kpiIcons[i]
    }));

    const verticals = [
        { id: 'ALL',         label: t('factory.verticals.ALL') },
        { id: 'HEALTHTECH',  label: 'HealthTech' },
        { id: 'LEGALTECH',   label: 'LegalTech' },
        { id: 'GOVTECH',     label: 'GovTech' },
        { id: 'FINTECH',     label: 'FinTech' },
        { id: 'INTEGRATION', label: t('factory.verticals.INTEGRATION') },
    ];

    const agents = [
        {
            name: 'DataGym AI Core',
            tag: 'HEALTHTECH / AGENTIC',
            vertical: 'HEALTHTECH',
            status: 'PRODUCTION',
            desc: 'Procesamiento inteligente de facturación médica, recetas manuscritas y auditoría de prestaciones.',
            tech: ['Python', 'Azure AI Document Intelligence', 'LangGraph', 'PostgreSQL'],
            color: 'from-emerald-600 to-teal-400',
            details: 'Automatiza la extracción de datos de recetas médicas y planillas de clínicas como Centro Médico Helguera y Clínica del Niño de Quilmes, integrando validación en tiempo real contra padrón.'
        },
        {
            name: 'LexIA (FlowLexAI)',
            tag: 'LEGALTECH / COMPLIANCE',
            vertical: 'LEGALTECH',
            status: 'READY',
            desc: 'Análisis inteligente de normativas, leyes y regulaciones con auditoría de SLAs y contratos.',
            tech: ['Azure OpenAI', 'FastAPI', 'PostgreSQL', 'Python'],
            color: 'from-blue-600 to-cyan-400',
            details: 'Desplegado para auditoría de reformas laborales y guías de parlamento de WFD, integrando RAG avanzado sobre normativas locales.'
        },
        {
            name: 'FlowVote / ControlEleccionario',
            tag: 'GOVTECH / AUDITORÍA',
            vertical: 'GOVTECH',
            status: 'READY',
            desc: 'Carga masiva, procesamiento de telegramas y preservación provisoria de escrutinio.',
            tech: ['Python', 'FastAPI', 'SQLite3', 'React'],
            color: 'from-purple-600 to-pink-400',
            details: 'Plataforma para auditoría electoral que procesa y preserva datos estadísticos con detección temprana de anomalías en telegramas de votación.'
        },
        {
            name: 'GastroFlow / FinApp',
            tag: 'FINTECH / RETAIL',
            vertical: 'FINTECH',
            status: 'SCALING',
            desc: 'Modelado predictivo de rentabilidad y alertas de movimiento financiero dudoso.',
            tech: ['FastAPI', 'SQLModel', 'Azure Native', 'Terraform'],
            color: 'from-amber-600 to-orange-400',
            details: 'Dashboard unificado de inteligencia de costos para Unilever/Arcor con control de stock y auditoría de transacciones multisucursal.'
        },
        {
            name: 'G-Bridge',
            tag: 'INTEGRACIÓN LEGACY',
            vertical: 'INTEGRATION',
            status: 'READY',
            desc: 'Conexión de mainframe y bases heredadas (COBOL/Access) a servicios de nube Azure.',
            tech: ['Azure Cloud', 'Python', 'Mainframe APIs', 'Azure Key Vault'],
            color: 'from-indigo-600 to-violet-400',
            details: 'Transformación y mapeo de datos estructurados en EBCDIC a JSON para alimentar microservicios modernos en tiempo real sin interrupción operativa.'
        },
        {
            name: 'bot-ansv2026 / ANSV',
            tag: 'GOVTECH / ASSISTANT',
            vertical: 'GOVTECH',
            status: 'READY',
            desc: 'Asistente de soporte rápido y atención al ciudadano remoto para la Agencia Nacional de Seguridad Vial.',
            tech: ['Python', 'NLP', 'FastAPI', 'WebRTC'],
            color: 'from-rose-600 to-red-400',
            details: 'Integración multicanal para asistencia rápida vial y resolución de consultas sobre trámites normativos nacionales.'
        }
    ];

    const diagrams = [
        { id: 'ecosystem', label: 'Ecosistema Factory', path: '/docs/images/Ecosistema032026.png', caption: 'Mapa de relaciones funcionales entre sistemas y agencias.' },
        { id: 'org_chart', label: 'Staff Digital', path: '/docs/images/FlowState Organigrama.png', caption: 'Organigrama y jerarquía operativa de los 21 colaboradores digitales.' },
        { id: 'mesa_chica', label: 'Mesa Chica', path: '/docs/images/mesa_chica_especialistas.svg', caption: 'Célula de Orquestación y Especialistas Principales de la marca.' },
        { id: 'kai_router', label: 'KAI Router', path: '/docs/images/kai_router_architecture.svg', caption: 'Arquitectura de enrutamiento y delegación inteligente de KAI.' }
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            const nextLog = mockLogsTemplates[activeLogIndex];
            setLogs((prev) => [...prev.slice(-9), { ...nextLog, timestamp: new Date().toLocaleTimeString() }]);
            setActiveLogIndex((prev) => (prev + 1) % mockLogsTemplates.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [activeLogIndex]);

    const filteredAgents = selectedVertical === 'ALL' 
        ? agents 
        : agents.filter(a => a.vertical === selectedVertical);

    const getLogIcon = (type) => {
        switch(type) {
            case 'REQ': return '🌐';
            case 'WORKFLOW': return '🧠';
            case 'AGENT': return '🧬';
            case 'OK': return '✅';
            case 'FAULT': return '❌';
            default: return '🧬';
        }
    };

    return (
        <div className="text-white min-h-screen font-sans selection:bg-flow-tech/30">
            {/* Header / Command Center Intro */}
            <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5 bg-gradient-hero">
                {/* Visual grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-flow-tech/10 to-transparent blur-3xl pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-full"
                        >
                        {/* ── Brand Block: Logo FlowState AI ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 200, rotateY: -90, scale: 0.6 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
                            style={{ perspective: 1200 }}
                            className="inline-flex flex-col items-start mb-10"
                        >
                            {/* Logo con glow y fondo glassmorphism */}
                            <div className="relative group">
                                <div className="absolute -inset-3 bg-gradient-to-r from-flow-tech/20 to-flow-cyan/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                <div className="relative flex items-center gap-5 bg-white/[0.03] border border-flow-cyan/20 rounded-2xl px-6 py-4 backdrop-blur-sm shadow-[0_0_30px_rgba(0,180,216,0.08)]">
                                    <img
                                        src="/img/Logo1.webp"
                                        alt="FlowState AI Logo"
                                        className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_14px_rgba(0,180,216,0.5)] group-hover:drop-shadow-[0_0_24px_rgba(0,180,216,0.75)] transition-all duration-500"
                                    />
                                    <div className="flex flex-col border-l border-white/10 pl-5">
                                        <span className="text-white/90 font-heading font-bold text-sm tracking-widest uppercase">Software Factory</span>
                                        <span className="text-flow-cyan/70 font-mono text-[10px] tracking-[0.2em] mt-0.5">v3.0 · LATAM Enterprise</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-2 text-flow-cyan font-heading font-semibold tracking-widest uppercase text-xs mb-6">
                            <FiTarget className="animate-spin-slow text-lg" />
                            {t('factory.commandCenter')}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-8 leading-[1.1]">
                            {t('factory.heroTitle')} <br />
                            <span className="bg-gradient-to-r from-flow-tech to-flow-cyan bg-clip-text text-transparent">{t('factory.heroHighlight')}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl mb-12">
                            {t('factory.heroDesc')}
                        </p>
                    </motion.div>

                    {/* 3D Orbit - Staff & Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center"
                    >
                        <StaffOrbit3D />
                    </motion.div>
                    </div> {/* Cierra el grid lg:grid-cols-2 */}

                    {/* KPIs Panel */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                        {kpis.map((kpi, i) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                                key={i} 
                                className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-flow-cyan/30 transition-all duration-300 group hover:bg-white/[0.04]"
                            >
                                <div className="text-flow-cyan mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">{kpi.icon}</div>
                                <div className="text-2xl font-bold font-heading mb-1 text-slate-100">{kpi.val}</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{kpi.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explorador del Ecosistema Real */}
            <section className="py-28 relative max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-innovation-magenta font-semibold uppercase text-xs tracking-wider mb-2">
                            <FiGrid /> {t('factory.portfolioTag')}
                        </div>
                        <h2 className="text-4xl font-heading font-extrabold">{t('factory.portfolioTitle')}</h2>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex flex-wrap gap-2 bg-white/[0.02] border border-white/5 p-1.5 rounded-xl backdrop-blur-md">
                        {verticals.map((vert) => (
                            <button
                                key={vert.id}
                                onClick={() => setSelectedVertical(vert.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                                    selectedVertical === vert.id 
                                        ? 'bg-gradient-to-r from-flow-tech to-flow-cyan text-white shadow-lg shadow-flow-tech/20' 
                                        : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                                }`}
                            >
                                {vert.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredAgents.map((agent) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ y: -6 }}
                                key={agent.name}
                                className="bg-[#0D0F26] border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:border-flow-cyan/20 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className={`h-[5px] bg-gradient-to-r ${agent.color}`}></div>
                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="bg-white/5 text-slate-400 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-white/5 tracking-wider">
                                                {agent.tag}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-400 tracking-widest bg-emerald-400/10 px-2.5 py-1.5 rounded-lg">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                {agent.status}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-heading font-extrabold text-white mb-4">{agent.name}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            {agent.desc}
                                        </p>
                                        <p className="text-slate-500 text-xs leading-relaxed italic bg-white/[0.01] border-l-2 border-flow-cyan/30 p-3 rounded-r-lg mb-6">
                                            {agent.details}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap gap-1.5 pt-6 border-t border-white/5">
                                            {agent.tech.map((t, idx) => (
                                                <span key={idx} className="text-[10px] font-bold text-slate-500 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Visualizador de Organigrama e Infografías */}
            <section className="py-28 bg-[#060714] border-y border-white/5 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,47,201,0.03)_0%,transparent_100%)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-innovation-magenta font-semibold uppercase text-xs tracking-wider mb-2">
                            <FiMap /> Visualización Organizacional
                        </div>
                        <h2 className="text-4xl font-heading font-extrabold">Estructura & Arquitectura</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mt-4">
                            Explorá la conformación de la mesa chica y el enrutamiento lógico de nuestros sistemas de IA.
                        </p>
                    </div>

                    {/* Diagram Selection Tabs */}
                    <div className="flex justify-center flex-wrap gap-3 mb-12">
                        {diagrams.map((diag) => (
                            <button
                                key={diag.id}
                                onClick={() => setSelectedDiagram(diag.id)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all border ${
                                    selectedDiagram === diag.id
                                        ? 'bg-gradient-to-r from-innovation-purple to-innovation-magenta text-white border-transparent shadow-lg shadow-innovation-purple/20'
                                        : 'text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.02]'
                                }`}
                            >
                                {diag.label}
                            </button>
                        ))}
                    </div>

                    {/* Image Viewer Frame */}
                    <div className="bg-[#0D0F26] border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative group">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <a 
                                href={diagrams.find(d => d.id === selectedDiagram).path} 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-white/5 hover:bg-white/10 p-2.5 rounded-lg border border-white/10 text-slate-300 hover:text-white transition-colors"
                                title="Abrir en pestaña nueva"
                            >
                                <FiMaximize2 />
                            </a>
                        </div>

                        <div className="min-h-[300px] flex items-center justify-center overflow-hidden">
                            <motion.img 
                                key={selectedDiagram}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={diagrams.find(d => d.id === selectedDiagram).path} 
                                alt={diagrams.find(d => d.id === selectedDiagram).label} 
                                className="max-h-[500px] w-auto mx-auto object-contain rounded-xl hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <p className="text-slate-300 font-medium font-heading">
                                {diagrams.find(d => d.id === selectedDiagram).label}
                            </p>
                            <p className="text-slate-500 text-sm mt-1.5">
                                {diagrams.find(d => d.id === selectedDiagram).caption}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simulación de Logging Forense (Regla 6 Observabilidad) */}
            <section className="py-28 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 text-state-energy font-semibold uppercase text-xs tracking-wider mb-2">
                            <FiTerminal /> Observabilidad Forense
                        </div>
                        <h2 className="text-4xl font-heading font-extrabold mb-6">Patrón de Logging v3.0</h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Para soporte y auditoría en tiempo real, nuestro núcleo implementa un registro forense visual estructurado.
                            Cada agente, petición y proceso de IA emite un identificador de transacción y su respectiva simbología innegociable.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <span className="bg-white/5 p-2 rounded-lg border border-white/5">🌐</span>
                                <span className="text-slate-300"><strong className="text-white">[REQ]:</strong> Peticiones externas</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="bg-white/5 p-2 rounded-lg border border-white/5">🧠</span>
                                <span className="text-slate-300"><strong className="text-white">[WORKFLOW]:</strong> Procesos y lógica de negocio</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="bg-white/5 p-2 rounded-lg border border-white/5">🧬</span>
                                <span className="text-slate-300"><strong className="text-white">[AGENT]:</strong> Handoffs de agentes autónomos</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="bg-white/5 p-2 rounded-lg border border-white/5">✅</span>
                                <span className="text-slate-300"><strong className="text-white">[OK]:</strong> Respuestas exitosas</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="bg-white/5 p-2 rounded-lg border border-white/5">❌</span>
                                <span className="text-slate-300"><strong className="text-state-energy">[FAULT]:</strong> Excepciones (con RequestID)</span>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Simulator Frame */}
                    <div className="lg:col-span-2 bg-[#060714] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                            <div className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-full bg-state-energy"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-amber-500"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400"></span>
                            </div>
                            <div className="text-slate-500 font-mono text-xs flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-md border border-white/5">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                                LIVE FEED: debug_osemoc.log
                            </div>
                        </div>

                        <div className="font-mono text-xs md:text-sm space-y-3.5 min-h-[300px] flex flex-col justify-end">
                            <AnimatePresence>
                                {logs.map((log, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        key={idx}
                                        className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 rounded-xl transition-all border ${
                                            log.type === 'FAULT' 
                                                ? 'bg-red-950/20 border-red-900/30 text-red-400' 
                                                : 'bg-white/[0.01] border-white/5 text-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="text-base">{getLogIcon(log.type)}</span>
                                            <span className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-md ${
                                                log.type === 'FAULT' ? 'bg-red-500/20 text-red-400' :
                                                log.type === 'OK' ? 'bg-emerald-500/20 text-emerald-400' :
                                                log.type === 'REQ' ? 'bg-blue-500/20 text-blue-400' :
                                                log.type === 'AGENT' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-500/20 text-slate-400'
                                            }`}>
                                                {log.type}
                                            </span>
                                        </div>
                                        <span className="text-slate-400 font-mono text-[10px] flex-shrink-0">{log.timestamp}</span>
                                        <span className="flex-1 leading-relaxed font-semibold">{log.text}</span>
                                        <span className="bg-white/5 text-slate-500 text-[10px] font-bold px-2 py-1 rounded border border-white/5 self-start md:self-auto">
                                            ID: {log.reqId}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hoja de Ruta (Roadmap) */}
            <section className="py-28 bg-[#060714] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-heading font-extrabold">Hoja de Ruta 2026-2029</h2>
                        <p className="text-slate-400 mt-4 max-w-xl mx-auto">Nuestras fases de crecimiento y madurez técnica.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { year: '2026', phase: 'Génesis', desc: 'Consolidación de nuestro core de agentes y handoffs seguros.' },
                            { year: '2027', phase: 'Expansión', desc: 'Escalabilidad regional en Obras Sociales y LegalTech en LATAM.' },
                            { year: '2028', phase: 'Ecosistema', desc: 'Interconexión de agentes autónomos distribuidos (Mesh Core).' },
                            { year: '2029', phase: 'Madurez', desc: 'Liderazgo técnico regional en automatización agéntica de datos.' }
                        ].map((item, i) => (
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                key={i} 
                                className="bg-[#0D0F26] p-8 border border-white/5 rounded-3xl hover:border-innovation-magenta/30 transition-all relative overflow-hidden group shadow-xl"
                            >
                                <div className="text-6xl font-heading font-extrabold text-slate-900 absolute top-4 right-4 z-0 group-hover:text-slate-800 transition-colors">{item.year}</div>
                                <div className="text-innovation-magenta font-extrabold text-xs uppercase tracking-widest mb-3 z-10 relative">{item.phase}</div>
                                <div className="text-2xl font-bold font-heading mb-4 text-slate-100 z-10 relative">{item.year}</div>
                                <p className="text-slate-400 text-sm leading-relaxed z-10 relative">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FlowStateFactory;
