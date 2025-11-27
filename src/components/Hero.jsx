import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

const Hero = () => {
    const handleDownloadCV = () => {
        window.open('/cv/CV_Gustavo_Berton_Oct2025.pdf', '_blank');
    };

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 animated-gradient opacity-90"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Logos */}
                    <div className="flex items-center justify-center space-x-8 mb-8">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            src="/logos/gb-logo.jpg"
                            alt="GB Logo"
                            className="h-24 w-24 rounded-full object-cover shadow-2xl border-4 border-white"
                        />
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            src="/logos/flowstate-ai.jpg"
                            alt="FlowState AI Logo"
                            className="h-24 w-24 rounded-full object-cover shadow-2xl border-4 border-white"
                        />
                    </div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight"
                    >
                        GUSTAVO BUONGIORNO BERTON
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="inline-block"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-white/90 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                            Digital Transformation & AI Expert
                        </h2>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
                    >
                        25+ años liderando la Transformación Digital y la Arquitectura de
                        Soluciones AI/Cloud escalables
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                    >
                        <button
                            onClick={() => scrollToSection('#flowstate')}
                            className="group px-8 py-4 bg-white text-gb-navy font-bold text-lg rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                        >
                            <span>Explorar Portafolio de Soluciones AI/Cloud</span>
                            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={handleDownloadCV}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-gb-navy transition-all duration-300 flex items-center space-x-2"
                        >
                            <FiDownload className="w-5 h-5" />
                            <span>Descargar CV - Octubre 2025</span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
                    >
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
