/**
 * @system     FlowState AI
 * @module     ContactForm.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @summary    Formulario de contacto con envío real vía EmailJS → Gmail.
 */
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMail, FiUser, FiPhone, FiMessageSquare, FiSend, FiLoader } from 'react-icons/fi';

const ContactForm = () => {
    const { t } = useTranslation();
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
        loading: false,
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
            setFormStatus({ submitted: false, error: true, loading: false, message: t('contact.form.required') });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus({ submitted: false, error: true, loading: false, message: t('contact.form.invalidEmail') });
            return;
        }

        setFormStatus({ submitted: false, error: false, loading: true, message: '' });

        try {
            const res = await fetch('/api/send-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);

            setFormStatus({
                submitted: true,
                error: false,
                loading: false,
                message: t('contact.form.success'),
            });

            setFormData({ nombre: '', email: '', motivo: '', tema: '', telefono: '' });

            setTimeout(() => {
                setFormStatus({ submitted: false, error: false, loading: false, message: '' });
            }, 6000);
        } catch (err) {
            setFormStatus({
                submitted: false,
                error: true,
                loading: false,
                message: t('contact.form.errorFallback'),
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
                        {t('contact.title')}
                    </h2>
                    <p className="text-xl text-gray-600">{t('contact.subtitle')}</p>
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
                                {t('contact.form.name')} <span className="text-red-500">*</span>
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
                                    placeholder={t('contact.form.namePlaceholder')}
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
                                    placeholder={t('contact.form.emailPlaceholder')}
                                />
                            </div>
                        </div>

                        {/* Motivo de Contacto */}
                        <div>
                            <label
                                htmlFor="motivo"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                {t('contact.form.reason')} <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="motivo"
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gb-cyan focus:border-transparent transition-all"
                            >
                                <option value="">{t('contact.form.reasonPlaceholder')}</option>
                                <option value="laboral">{t('contact.form.reasons.job')}</option>
                                <option value="b2b">{t('contact.form.reasons.b2b')}</option>
                                <option value="networking">{t('contact.form.reasons.networking')}</option>
                            </select>
                        </div>

                        {/* Tema de Interés (Optional) */}
                        <div>
                            <label
                                htmlFor="tema"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                {t('contact.form.topic')}
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
                                    placeholder={t('contact.form.topicPlaceholder')}
                                />
                            </div>
                        </div>

                        {/* Número de Celular (Optional) */}
                        <div>
                            <label
                                htmlFor="telefono"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                {t('contact.form.phone')}
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
                                    placeholder={t('contact.form.phonePlaceholder')}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={formStatus.loading}
                            className="w-full btn-primary-gb flex items-center justify-center space-x-2 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {formStatus.loading ? (
                                <>
                                    <FiLoader className="w-5 h-5 animate-spin" />
                                    <span>{t('contact.form.sending')}</span>
                                </>
                            ) : (
                                <>
                                    <span>{t('contact.form.submit')}</span>
                                    <FiSend className="w-5 h-5" />
                                </>
                            )}
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
                        {t('contact.directContact')}
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
