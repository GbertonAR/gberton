import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#hero' },
        { name: 'Experiencia', href: '#experience' },
        { name: 'FlowState AI', href: '#flowstate' },
        { name: 'Contacto', href: '#contact' },
    ];

    const handleDownloadCV = () => {
        window.open('/cv/CV_Gustavo_Berton_Oct2025.pdf', '_blank');
    };

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="/logos/gb-logo.jpg"
                            alt="GB Logo"
                            className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-heading font-bold gradient-text-gb">
                                Gustavo Berton
                            </h1>
                            <p className="text-xs text-gray-600">AI/Cloud Solutions Architect</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className="text-gray-700 hover:text-gb-cyan font-medium transition-colors duration-200"
                            >
                                {link.name}
                            </button>
                        ))}
                        <button
                            onClick={handleDownloadCV}
                            className="btn-primary-gb flex items-center space-x-2"
                        >
                            <FiDownload className="w-4 h-4" />
                            <span>Descargar CV</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <FiX className="w-6 h-6 text-gray-700" />
                        ) : (
                            <FiMenu className="w-6 h-6 text-gray-700" />
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
                        className="md:hidden bg-white border-t border-gray-200"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className="block w-full text-left text-gray-700 hover:text-gb-cyan font-medium py-2 transition-colors"
                                >
                                    {link.name}
                                </button>
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
    );
};

export default Navigation;
