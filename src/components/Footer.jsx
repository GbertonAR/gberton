import { FiLinkedin, FiGithub, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Inicio', href: '#hero' },
        { name: 'Experiencia', href: '#experience' },
        { name: 'FlowState AI', href: '#flowstate' },
        { name: 'Contacto', href: '#contact' },
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gradient-to-br from-gb-navy-dark to-gb-navy text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <img
                                src="/logos/gb-logo.jpg"
                                alt="GB Logo"
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <img
                                src="/logos/flowstate-ai.jpg"
                                alt="FlowState AI Logo"
                                className="h-12 w-12 rounded-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-heading font-bold">
                            Gustavo Buongiorno Berton
                        </h3>
                        <p className="text-gray-300 text-sm">
                            Digital Transformation & AI Expert
                        </p>
                        <p className="text-gray-400 text-sm">
                            Arquitecto de Soluciones AI/Cloud con 25+ años de experiencia
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-gray-300 hover:text-gb-cyan transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Conecta Conmigo</h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://linkedin.com/in/gustavoberton"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-gb-cyan rounded-full flex items-center justify-center transition-all hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://github.com/gustavoberton"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-gb-cyan rounded-full flex items-center justify-center transition-all hover:scale-110"
                                aria-label="GitHub"
                            >
                                <FiGithub className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:gberton1967@gmail.com"
                                className="w-10 h-10 bg-white/10 hover:bg-gb-cyan rounded-full flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Email"
                            >
                                <FiMail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Gustavo Berton & FlowState AI. Todos los derechos
                        reservados.
                    </p>
                    <p className="text-gray-400 text-sm flex items-center space-x-1">
                        <span>Hecho con</span>
                        <FiHeart className="w-4 h-4 text-red-400" />
                        <span>usando React + Vite + Tailwind CSS</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
