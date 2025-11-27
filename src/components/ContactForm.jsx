import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMail, FiUser, FiPhone, FiMessageSquare, FiSend } from 'react-icons/fi';

const ContactForm = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        motivo: '',
        tema: '',
        telefono: '',
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        error: false,
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.nombre || !formData.email || !formData.motivo) {
            setFormStatus({
                submitted: false,
                error: true,
                message: 'Por favor completa todos los campos obligatorios.',
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus({
                submitted: false,
                error: true,
                message: 'Por favor ingresa un email válido.',
            });
            return;
        }

        try {
            // TODO: Implement backend integration or third-party service (Formspree, EmailJS)
            // For now, we'll simulate a successful submission
            console.log('Form submitted:', formData);

            setFormStatus({
                submitted: true,
                error: false,
                message: '¡Gracias por tu mensaje! Te contactaré pronto.',
            });

            // Reset form
            setFormData({
                nombre: '',
                email: '',
                motivo: '',
                tema: '',
                telefono: '',
            });

            // Clear success message after 5 seconds
            setTimeout(() => {
                setFormStatus({ submitted: false, error: false, message: '' });
            }, 5000);
        } catch (error) {
            setFormStatus({
                submitted: false,
                error: true,
                message: 'Hubo un error al enviar el mensaje. Intenta nuevamente.',
            });
        }
    };

    return (
        <section id="contact" className="section bg-gradient-to-br from-gray-50 to-white" ref={ref}>
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text-gb mb-4">
                        Conecta con un Arquitecto de Soluciones AI/Cloud
                    </h2>
                    <p className="text-xl text-gray-600">Define tu Próximo Paso</p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="glass-dark bg-white rounded-2xl shadow-2xl p-8 md:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre Completo */}
                        <div>
                            <label
                                htmlFor="nombre"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Nombre Completo <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gb-cyan focus:border-transparent transition-all"
                                    placeholder="Tu nombre completo"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gb-cyan focus:border-transparent transition-all"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        {/* Motivo de Contacto */}
                        <div>
                            <label
                                htmlFor="motivo"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Motivo de Contacto <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="motivo"
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gb-cyan focus:border-transparent transition-all"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="laboral">Oportunidad Laboral / Postulación</option>
                                <option value="b2b">Consultoría B2B / Servicios FlowState AI</option>
                                <option value="networking">Networking / Prensa</option>
                            </select>
                        </div>

                        {/* Tema de Interés (Optional) */}
                        <div>
                            <label
                                htmlFor="tema"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Tema de Interés
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                                    <FiMessageSquare className="text-gray-400" />
                                </div>
                                <textarea
                                    id="tema"
                                    name="tema"
                                    value={formData.tema}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gb-cyan focus:border-transparent transition-all resize-none"
                                    placeholder="Cuéntame más sobre tu proyecto o consulta..."
                                />
                            </div>
                        </div>

                        {/* Número de Celular (Optional) */}
                        <div>
                            <label
                                htmlFor="telefono"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Número de Celular
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiPhone className="text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gb-cyan focus:border-transparent transition-all"
                                    placeholder="+54 9 11 1234-5678"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full btn-primary-gb flex items-center justify-center space-x-2 text-lg"
                        >
                            <span>Enviar Mensaje</span>
                            <FiSend className="w-5 h-5" />
                        </button>

                        {/* Status Messages */}
                        {formStatus.message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-lg ${formStatus.error
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-green-50 text-green-700 border border-green-200'
                                    }`}
                            >
                                {formStatus.message}
                            </motion.div>
                        )}
                    </form>
                </motion.div>

                {/* Additional Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 mb-4">
                        También puedes contactarme directamente:
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:gberton1967@gmail.com"
                            className="flex items-center space-x-2 text-gb-cyan hover:text-gb-navy font-semibold transition-colors"
                        >
                            <FiMail className="w-5 h-5" />
                            <span>gberton1967@gmail.com</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
