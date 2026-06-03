/**
 * @system     FlowState AI
 * @brand      Dinamismo y Flujo
 * @module     Navigation.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-05-02
 * @updated    2026-06-03
 * @summary    Barra de navegación principal con logo FlowState AI y selector de idioma para CV.
 */

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiDownload, FiHome, FiGlobe } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CV_PDF = {
    es: '/cv/GBerton2026v2Spa--3.pdf',
    en: '/cv/GBerton2026v2Ing--3.pdf',
};

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showCvModal, setShowCvModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', path: '/', icon: <FiHome /> },
        { name: 'Experiencia', path: '/cv' },
        { name: 'AI Factory', path: '/factory' },
        { name: 'Proyectos', path: '/projects' },
        { name: 'Contacto', path: '/contact' },
    ];

    const handleDownloadCV = () => {
        setShowCvModal(true);
    };

    return (
        <>
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-[#060714]/80 backdrop-blur-lg border-b border-white/5 shadow-2xl' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo original */}
                    <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-flow-tech to-innovation-purple rounded-full blur-md opacity-40 group-hover:opacity-100 transition-all duration-500" />
                            <img
                                src="/logos/gb-logo.jpg"
                                alt="GB Logo"
                                className="relative h-14 w-14 rounded-full object-cover border-2 border-white/10 group-hover:border-flow-cyan transition-all duration-300"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-heading font-bold gradient-text-gb">
                                Gustavo Berton
                            </h1>
                            <p className="text-xs text-slate-400">Strategic AI Hub</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-medium transition-colors duration-200 ${
                                    location.pathname === link.path 
                                    ? 'text-flow-cyan font-bold border-b-2 border-flow-cyan' 
                                    : 'text-slate-300 hover:text-white'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={handleDownloadCV}
                            className="btn-primary-gb flex items-center space-x-2"
                        >
                            <FiDownload className="w-4 h-4" />
                            <span>CV</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <FiX className="w-6 h-6 text-slate-300" />
                        ) : (
                            <FiMenu className="w-6 h-6 text-slate-300" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#060714] border-t border-white/5"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block w-full text-left font-medium py-2 transition-colors ${
                                        location.pathname === link.path ? 'text-flow-cyan' : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={handleDownloadCV}
                                className="btn-primary-gb w-full flex items-center justify-center space-x-2"
                            >
                                <FiDownload className="w-4 h-4" />
                                <span>Descargar CV</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

          
        </nav>

        {/* ── Modal Selector de Idioma del CV ── */}
        <AnimatePresence>
            {showCvModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(5,8,17,0.75)' }}
                    onClick={() => setShowCvModal(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 24 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                        className="relative bg-[#0D0F26] rounded-3xl shadow-2xl border border-white/10 p-10 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowCvModal(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="bg-gradient-to-br from-flow-tech to-flow-cyan w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-flow-tech/30">
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
                                className="group flex flex-col items-center gap-3 bg-gradient-to-br from-[#1a73e8] to-[#00b4d8] text-white rounded-2xl p-6 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="text-3xl">🇦🇷</span>
                                <span className="font-bold text-sm tracking-wide">Español</span>
                                <FiDownload className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
                            </a>
                            <a
                                href={CV_PDF.en}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setShowCvModal(false)}
                                className="group flex flex-col items-center gap-3 bg-gradient-to-br from-innovation-purple to-innovation-magenta text-white rounded-2xl p-6 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="text-3xl">🇺🇸</span>
                                <span className="font-bold text-sm tracking-wide">English</span>
                                <FiDownload className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
                            </a>
                        </div>

                        <p className="text-center text-xs text-slate-500 mt-6">
                            El PDF se abrirá en una nueva pestaña.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Navigation;
