/* eslint-disable no-unused-vars */
/**
 * @system     FlowState AI
 * @brand      Dinamismo y Flujo 
 * @module     ProjectsView.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-06-01
 * @summary    Módulo de visualización detallada de proyectos e informes históricos de ingeniería, equipado con visor iframe integrado.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
    FiFileText, FiExternalLink, FiBarChart, FiShield, FiLayers, 
    FiActivity, FiSearch, FiX, FiFilter, FiFolder
} from 'react-icons/fi';

const ProjectsView = () => {
    const { t } = useTranslation();
    const [selectedDocUrl, setSelectedDocUrl] = useState(null);
    const [selectedDocTitle, setSelectedDocTitle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const projectsData = [
        {
            title: "LexIA - MVP Legal",
            category: "LegalTech",
            date: "Q1 2026",
            status: "Audit Ready",
            description: "Arquitectura RAG para análisis de normativa argentina y cumplimiento legal.",
            icon: <FiShield />,
            color: "text-blue-400 border-blue-500/20",
            docUrl: "/docs/LexIA_MVP.html"
        },
        {
            title: "DataGym AI 2026",
            category: "Observabilidad",
            date: "2026",
            status: "Production",
            description: "Patrón de logging forense para agentes autónomos y auditoría de flujo de datos.",
            icon: <FiActivity />,
            color: "text-red-400 border-red-500/20",
            docUrl: "/docs/OSEMOC2026v2.html"
        },
        {
            title: "GastroFlow AI",
            category: "Retail",
            date: "Q2 2026",
            status: "Development",
            description: "Optimización de flujos gastronómicos y stock predictivo mediante visión artificial.",
            icon: <FiLayers />,
            color: "text-emerald-400 border-emerald-500/20",
            docUrl: "/docs/product_readiness_gastroflow_v2.html"
        },
        {
            title: "FinApp Analysis",
            category: "Finanzas",
            date: "2025",
            status: "Completed",
            description: "Dashboard de inteligencia financiera, auditoría de transacciones y conciliaciones.",
            icon: <FiBarChart />,
            color: "text-purple-400 border-purple-500/20",
            docUrl: "/docs/finapp_analisis_completo.html"
        }
    ];

    // Resguardo Histórico de los 23 documentos detectados
    const historicalDocs = [
        { title: "AIRC Blueprint Creator", filename: "AIRC Blueprint Creator-saved.html", type: "Blueprint" },
        { title: "FlowControl Sites Hub", filename: "FlowControlSites.html", type: "Infraestructura" },
        { title: "FlowControl Sites v2", filename: "FlowControlSites_v2.html", type: "Infraestructura" },
        { title: "FlowControl Sites v3", filename: "FlowControlSites_v3.html", type: "Infraestructura" },
        { title: "Plan Q1 2026 Fundacional", filename: "FlowState AI - Plan Q1 2026.html", type: "Estrategia" },
        { title: "Presentación Ejecutiva v2", filename: "FlowStateAI_Executive_v2.html", type: "Estrategia" },
        { title: "Guía de Paletas de Marca", filename: "FlowStateAI_Palette_v2.html", type: "Manual de Estilo" },
        { title: "Presentación Ejecutiva Fundacional", filename: "FlowStateAI_Presentacion_Ejecutiva.html", type: "Estrategia" },
        { title: "Guía de Estilo v3 (LexIA Style)", filename: "FlowStateAI_v3_LexIA_Style.html", type: "Manual de Estilo" },
        { title: "Modelo C4 - Nivel 1", filename: "FlowState_AI_C4_Level1.html", type: "Arquitectura" },
        { title: "Journey Maps del Cliente", filename: "FlowState_AI_JourneyMaps.html", type: "Estrategia" },
        { title: "Borrador de Desarrollo", filename: "Nuevo.html", type: "Borrador" },
        { title: "DataGym AI Dashboard v1", filename: "OSEMOC2026.html", type: "Observabilidad" },
        { title: "Propuestas de Sector Tecnológico", filename: "PropuestasSectorTecnologico.html", type: "Propuestas" },
        { title: "Propuestas de Sector Tecnológico II", filename: "PropuestasSectorTecnologicoII.html", type: "Propuestas" },
        { title: "Email de Lanzamiento General", filename: "email_lanzamiento_general_FlowStateAI.html", type: "Estrategia" },
        { title: "Product Strategy Hub v1", filename: "flowstate_ai_product_strategy_hub.html", type: "Estrategia" },
        { title: "Product Strategy Hub v2", filename: "flowstate_ai_product_strategy_hub v1.html", type: "Estrategia" },
        { title: "Product Strategy Hub v3", filename: "flowstate_ai_product_strategy_hub v2.html", type: "Estrategia" },
        { title: "Informe Histórico de Ingeniería 001", filename: "flowstate_informe_historico_001.html", type: "Reporte" },
        { title: "Registro Semanal de Flujo", filename: "flowstate_registro_semanal.html", type: "Reporte" },
        { title: "Product Readiness: FlowPort", filename: "product_readiness_flowport.html", type: "Readiness" },
        { title: "Product Readiness: Recetas Médicas", filename: "product_readiness_recetas.html", type: "Readiness" }
    ];

    const openDocument = (title, url) => {
        setSelectedDocTitle(title);
        setSelectedDocUrl(url);
    };

    const closeDocument = () => {
        setSelectedDocUrl(null);
        setSelectedDocTitle('');
    };

    const categories = ['ALL', 'Estrategia', 'Arquitectura', 'Reporte', 'Manual de Estilo', 'Infraestructura'];

    const filteredDocs = historicalDocs.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              doc.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || doc.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-[#050811] text-white min-h-screen pt-32 pb-24 font-sans selection:bg-flow-tech/30 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(26,110,245,0.03)_0%,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">{t('projects.title')}</h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        {t('projects.subtitle')}
                    </p>
                </div>

                {/* Grid de Proyectos Principales */}
                <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-2">
                    <FiFolder className="text-flow-cyan" /> {t('projects.mainTitle')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#0b0f19] p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-flow-cyan/20 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className={`text-3xl ${project.color.split(' ')[0]} mb-6`}>
                                    {project.icon}
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{project.category}</span>
                                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-semibold">{project.status}</span>
                                </div>
                                <h3 className="text-xl font-bold font-heading mb-3">{project.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex justify-between items-center pt-6 border-t border-white/5">
                                <span className="text-xs text-slate-500 font-semibold">{project.date}</span>
                                <button 
                                    onClick={() => openDocument(project.title, project.docUrl)}
                                    className="text-flow-cyan font-bold text-xs flex items-center gap-1.5 hover:gap-2.5 transition-all cursor-pointer"
                                >
                                    {t('projects.viewReport')} <FiExternalLink />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Repositorio Histórico - Buscador & Lista */}
                <div className="bg-[#090d16] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-innovation-purple/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 relative z-10">
                        <div>
                            <h2 className="text-3xl font-heading font-extrabold mb-3">{t('projects.historyTitle')}</h2>
                            <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                                {t('projects.historySubtitle')}
                            </p>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <FiSearch className="absolute left-3.5 top-3.5 text-slate-500 text-base" />
                                <input
                                    type="text"
                                    placeholder={t('projects.searchPlaceholder')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium focus:outline-none focus:border-flow-cyan/40 transition-colors"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full sm:w-auto px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium focus:outline-none focus:border-flow-cyan/40 transition-colors cursor-pointer appearance-none pr-8"
                                >
                                    {categories.map((cat, i) => (
                                        <option key={i} value={cat} className="bg-[#090d16] text-white">
                                            {cat === 'ALL' ? t('projects.allTypes') : cat}
                                        </option>
                                    ))}
                                </select>
                                <FiFilter className="absolute right-3.5 top-3.5 text-slate-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Document Index Table */}
                    <div className="overflow-x-auto relative z-10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                    <th className="py-4 font-semibold">{t('projects.colTitle')}</th>
                                    <th className="py-4 font-semibold">{t('projects.colType')}</th>
                                    <th className="py-4 font-semibold text-right">{t('projects.colAction')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredDocs.map((doc, i) => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={i}
                                            className="border-b border-white/5 hover:bg-white/[0.01] transition-colors"
                                        >
                                            <td className="py-4 flex items-center gap-3">
                                                <FiFileText className="text-slate-500 text-lg flex-shrink-0" />
                                                <span className="font-semibold text-slate-200 text-sm md:text-base">{doc.title}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-xs bg-white/5 px-2.5 py-1 rounded-md border border-white/5 font-semibold text-slate-400">
                                                    {doc.type}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button
                                                    onClick={() => openDocument(doc.title, `/docs/${doc.filename}`)}
                                                    className="inline-flex items-center gap-1 text-flow-cyan text-xs font-bold hover:underline cursor-pointer"
                                                >
                                                    {t('projects.viewDoc')} <FiExternalLink />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>

                                {filteredDocs.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="py-12 text-center text-slate-500 text-sm">
                                            {t('projects.noResults')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Iframe Document Viewer Modal */}
            <AnimatePresence>
                {selectedDocUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#02050a]/95 backdrop-blur-md flex flex-col justify-between"
                    >
                        {/* Modal Header */}
                        <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-[#050811]">
                            <div className="flex items-center gap-2.5">
                                <FiFileText className="text-flow-cyan text-xl" />
                                <span className="font-heading font-extrabold text-sm md:text-base">{selectedDocTitle}</span>
                            </div>
                            <button
                                onClick={closeDocument}
                                className="bg-white/5 hover:bg-white/10 p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                title="Cerrar Documento"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* Modal Content - Iframe */}
                        <div className="flex-1 bg-white relative">
                            <iframe 
                                src={selectedDocUrl} 
                                title={selectedDocTitle} 
                                className="w-full h-full border-none"
                            />
                        </div>

                        {/* Modal Footer */}
                        <div className="h-12 px-6 flex items-center justify-between bg-[#050811] text-[10px] text-slate-500 font-mono border-t border-white/10">
                            <span>{t('projects.footerAudit')}</span>
                            <span>{t('projects.footerSystem')}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsView;
