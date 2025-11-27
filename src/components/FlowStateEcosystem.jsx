import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FiExternalLink,
    FiZap,
    FiMessageSquare,
    FiGlobe,
    FiShield,
    FiTrendingUp,
} from 'react-icons/fi';

const FlowStateEcosystem = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const projects = [
        {
            name: 'Asistente LNC',
            tagline: 'Bot Legal Especializado',
            problem:
                'Las empresas necesitan respuestas legales rápidas y contextualizadas sin depender de consultas manuales.',
            features: [
                'Especialización en contexto legal argentino',
                'Procesamiento de documentos legales con OCR',
                'Respuestas contextualizadas en tiempo real',
                'Integración con bases de datos jurídicas',
            ],
            technologies: ['Python', 'FastAPI', 'Azure OpenAI', 'OCR', 'PostgreSQL'],
            icon: <FiShield className="w-12 h-12" />,
            color: 'from-flowstate-purple to-flowstate-pink',
            demoUrl: 'https://ai-bot-ansv-web-huh3g8cqgcfjgjga.westus-01.azurewebsites.net/',
        },
        {
            name: 'Adgenie',
            tagline: 'Automatización Publicitaria B2B',
            problem:
                'Gestión manual de 46,000+ emails publicitarios consume tiempo valioso del equipo.',
            features: [
                'Automatización de respuesta a emails masivos',
                'Clasificación inteligente de consultas',
                'Procesamiento de 46,000 emails en 5 días',
                'Dashboard de análisis y métricas',
            ],
            technologies: ['Python', 'Azure', 'NLP', 'FastAPI', 'React'],
            icon: <FiTrendingUp className="w-12 h-12" />,
            color: 'from-flowstate-pink to-flowstate-cyan',
            demoUrl: 'https://delightful-flower-08fe3401e.1.azurestaticapps.net/',
        },
        {
            name: 'Live Conference ',
            tagline: 'Interpretación Simultánea en Tiempo Real',
            problem:
                'Las conferencias multilingües requieren intérpretes costosos y logística compleja.',
            features: [
                'Transcripción en tiempo real',
                'Traducción simultánea multiidioma',
                'Integración con plataformas de videoconferencia',
                'Subtítulos automáticos generados',
            ],
            technologies: ['Azure Speech', 'WebRTC', 'Python', 'React', 'WebSockets'],
            icon: <FiGlobe className="w-12 h-12" />,
            color: 'from-flowstate-cyan to-flowstate-green',
            demoUrl: 'https://proud-dune-06afaf61e.1.azurestaticapps.net/',
        },
        {
            name: 'OpiFood',
            tagline: 'Análisis de Opiniones Gastronómicas',
            problem:

                'El hogar requiere inventario automático de alimentos por imagen para generar menús contextualmente relevantes.',
            features: [
                'Análisis de sentimiento en reseñas',
                'Extracción de insights clave',
                'Dashboard de tendencias',
                'Alertas de reputación en tiempo real',
            ],
            technologies: ['Python', 'NLP', 'Azure Cognitive Services', 'React'],
            icon: <FiMessageSquare className="w-12 h-12" />,
            color: 'from-flowstate-green to-flowstate-purple',
            demoUrl: null,
        },
        {
            name: 'Auditxt',
            tagline: 'Auditoría Automatizada de Documentos',
            problem:
                'La auditoría manual de documentos es lenta, propensa a errores y costosa.',
            features: [
                'OCR avanzado para extracción de datos',
                'Validación automática de compliance',
                'Detección de anomalías',
                'Reportes de auditoría automatizados',
            ],
            technologies: ['Python', 'OCR', 'Azure Form Recognizer', 'PostgreSQL'],
            icon: <FiZap className="w-12 h-12" />,
            color: 'from-flowstate-purple to-flowstate-blue',
            demoUrl: 'https://mango-flower-0cff3661e.1.azurestaticapps.net/',
        },
    ];

    return (
        <section id="flowstate" className="section-flowstate" ref={ref}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center mb-6">
                        <img
                            src="/logos/flowstate-ai.jpg"
                            alt="FlowState AI"
                            className="h-20 w-20 rounded-full object-cover shadow-xl"
                        />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text-flowstate mb-4">
                        FlowState AI: Ecosistema de Agentes Inteligentes
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                        Transformando desafíos empresariales en soluciones automatizadas con
                        Inteligencia Artificial
                    </p>

                    {/* Problem Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-l-4 border-flowstate-purple"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            El Problema B2B
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Las empresas carecen de experiencia interna en IA y necesitan
                            soluciones rápidas, escalables y probadas. FlowState AI ofrece un
                            ecosistema de agentes inteligentes especializados, listos para
                            deployment en Azure, con arquitectura robusta y soporte continuo.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Projects Portfolio */}
                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 * index, duration: 0.6 }}
                            className="card-flowstate group"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Project Icon & Title */}
                                <div className="lg:col-span-1">
                                    <div
                                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                                    >
                                        {project.icon}
                                    </div>
                                    <h3 className="text-3xl font-heading font-bold text-gray-800 mb-2">
                                        {project.name}
                                    </h3>
                                    <p className="text-lg font-semibold gradient-text-flowstate mb-4">
                                        {project.tagline}
                                    </p>
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 btn-primary-flowstate"
                                        >
                                            <span>Ver Demo</span>
                                            <FiExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                {/* Project Details */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Problem */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                                            Problema Resuelto
                                        </h4>
                                        <p className="text-gray-600">{project.problem}</p>
                                    </div>

                                    {/* Features */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                                            Características Clave
                                        </h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {project.features.map((feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className="flex items-start space-x-2"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-flowstate-purple mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Technologies */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                                            Stack Tecnológico
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-4 py-2 bg-gradient-to-r from-flowstate-purple/10 to-flowstate-pink/10 text-flowstate-purple font-semibold rounded-lg border border-flowstate-purple/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Value Proposition */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="max-w-4xl mx-auto bg-gradient-flowstate text-white rounded-2xl shadow-2xl p-12">
                        <h3 className="text-3xl font-heading font-bold mb-6">
                            Inteligencia Conectada
                        </h3>
                        <p className="text-xl leading-relaxed mb-8">
                            Cada agente de FlowState AI está diseñado para integrarse
                            perfectamente en tu ecosistema empresarial, desplegado en Azure con
                            arquitectura escalable y soporte continuo.
                        </p>
                        <button
                            onClick={() => {
                                const element = document.querySelector('#contact');
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 bg-white text-flowstate-purple font-bold text-lg rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            Solicitar Consultoría
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FlowStateEcosystem;
