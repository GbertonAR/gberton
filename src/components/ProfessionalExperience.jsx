import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FiCloud,
  FiCpu,
  FiCode,
  FiDatabase,
  FiLayers,
  FiTrendingUp,
  FiZap,
  FiBriefcase,
} from 'react-icons/fi';
import {
  SiPython,
  SiReact,
  SiPostgresql,
  SiDjango,
  SiFastapi,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

const ProfessionalExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    {
      category: 'Cloud & AI',
      icon: <FiCloud className="w-8 h-8" />,
      items: [
        { name: 'Microsoft Azure', icon: <VscAzure />, level: 'Expert' },
        { name: 'Microservicios', icon: <FiLayers />, level: 'Expert' },
        { name: 'Python/FastAPI', icon: <SiFastapi />, level: 'Expert' },
        { name: 'OCR & NLP', icon: <FiCpu />, level: 'Advanced' },
        { name: 'Chatbots & AI Agents', icon: <FiZap />, level: 'Expert' },
      ],
    },
    {
      category: 'Full Stack Development',
      icon: <FiCode className="w-8 h-8" />,
      items: [
        { name: 'Python (Django)', icon: <SiDjango />, level: 'Expert' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 'Expert' },
        { name: 'ReactJS', icon: <SiReact />, level: 'Advanced' },
        { name: 'Vite & Tailwind CSS', icon: <FiCode />, level: 'Advanced' },
      ],
    },
    {
      category: 'Análisis Funcional',
      icon: <FiBriefcase className="w-8 h-8" />,
      items: [
        { name: 'Migración ERP', icon: <FiDatabase />, level: 'Expert' },
        { name: 'Módulos BackOffice', icon: <FiLayers />, level: 'Expert' },
        { name: 'Arquitectura de Soluciones', icon: <FiCpu />, level: 'Expert' },
      ],
    },
  ];

  const achievements = [
    {
      metric: '46,000',
      label: 'Emails Automatizados',
      description: 'Respuesta automatizada en 5 días',
      icon: <FiZap className="w-12 h-12" />,
      color: 'from-gb-cyan to-gb-navy',
    },
    {
      metric: '25+',
      label: 'Años de Experiencia',
      description: 'Liderando transformación digital',
      icon: <FiTrendingUp className="w-12 h-12" />,
      color: 'from-gb-navy to-purple-600',
    },
    {
      metric: '100+',
      label: 'Proyectos Completados',
      description: 'Soluciones AI/Cloud escalables',
      icon: <FiCloud className="w-12 h-12" />,
      color: 'from-purple-600 to-gb-cyan',
    },
  ];

  const timeline = [
    {
      role: 'Arquitecto de Soluciones AI/Cloud',
      company: 'FlowState AI',
      period: '2016 - Presente',
      description:
        'Liderando el desarrollo de ecosistema de agentes inteligentes para automatización empresarial.',
    },
    {
      role: 'Sr. Lan Manager',
      company: 'Sistemas Tecnologicos Integrales (STI)',
      period: '2001 - 2007',
      description:
        'Gestión integral de infraestructura tecnológica y migración a soluciones cloud.',
    },
    {
      role: 'Sr. Lan Manager - System Developer',
      company: 'Imagin Automation Argentina',
      period: '1999 - 2001',
      description:
        'Gestión integral de infraestructura tecnológica y migración a soluciones cloud.',
    },
    {
      role: 'Encargado de Sistemas',
      company: 'Casa Hutton',
      period: '1994 - 1999',
      description:
        'Desarrollo de soluciones empresariales y arquitectura de sistemas complejos.',
    },
    {
      role: 'Administrativo y Encargado de Operaciones',
      company: 'Rey Foto',
      period: '1990 - 1993',
      description:
        'Operador de computadora/Facturador - Responsable de la gestión de 7 locales',
    },
    {
      role: 'Administrativo',
      company: 'Telefax SA',
      period: '1990 - 1991',
      description:
        'Operador de computadora/Facturador',
    },
    {
      role: 'Auxiliar Administrativo',
      company: 'Distribuidora Dos Santos Pereira',
      period: '1988 - 1990',
      description:
        'Operador de computadora/Facturador',
    },
    {
      role: 'Auxiliar Administrativo',
      company: 'Laboratorio Organon Argentina',
      period: '1987 - 1988',
      description:
        'Tareas administrativas y tramites generales',
    },
  ];

  return (
    <section id="experience" className="section-gb" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text-gb mb-4">
            Mi Experiencia Profesional
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de dos décadas transformando empresas a través de la tecnología
          </p>
        </motion.div>

        {/* Key Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="card-gb group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                {achievement.icon}
              </div>
              <div className="text-5xl font-bold gradient-text-gb mb-2">
                {achievement.metric}
              </div>
              <div className="text-xl font-semibold text-gray-800 mb-2">
                {achievement.label}
              </div>
              <div className="text-gray-600">{achievement.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-heading font-bold text-gb-navy mb-8 text-center">
            Habilidades Técnicas Clave
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillCategory, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + categoryIndex * 0.2, duration: 0.6 }}
                className="card-gb"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-gb-cyan">{skillCategory.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {skillCategory.category}
                  </h4>
                </div>
                <div className="space-y-4">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center justify-between p-3 bg-gb-gray-50 rounded-lg hover:bg-gb-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-gb-navy text-xl">{skill.icon}</div>
                        <span className="font-medium text-gray-800">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gb-cyan">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-3xl font-heading font-bold text-gb-navy mb-8 text-center">
            Trayectoria Profesional
          </h3>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                className="card-gb flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {item.role}
                  </h4>
                  <p className="text-lg text-gb-cyan font-semibold mb-2">
                    {item.company}
                  </p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <span className="inline-block px-4 py-2 bg-gradient-gb text-white font-semibold rounded-lg">
                    {item.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
