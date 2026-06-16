import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
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

const TIMELINE_META = [
  { company: 'FlowState AI',                           period: '2016 - Presente' },
  { company: 'Sistemas Tecnologicos Integrales (STI)', period: '2001 - 2007'    },
  { company: 'Imagin Automation Argentina',            period: '1999 - 2001'    },
  { company: 'Casa Hutton',                            period: '1994 - 1999'    },
  { company: 'Rey Foto',                               period: '1990 - 1993'    },
  { company: 'Telefax SA',                             period: '1990 - 1991'    },
  { company: 'Distribuidora Dos Santos Pereira',       period: '1988 - 1990'    },
  { company: 'Laboratorio Organon Argentina',          period: '1987 - 1988'    },
];

const ProfessionalExperience = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    {
      category: t('cv.categories.cloud'),
      icon: <FiCloud className="w-8 h-8" />,
      items: [
        { name: 'Microsoft Azure',      icon: <VscAzure />,  level: t('cv.level.expert')   },
        { name: 'Microservicios',        icon: <FiLayers />,  level: t('cv.level.expert')   },
        { name: 'Python/FastAPI',        icon: <SiFastapi />, level: t('cv.level.expert')   },
        { name: 'OCR & NLP',             icon: <FiCpu />,     level: t('cv.level.advanced') },
        { name: 'Chatbots & AI Agents',  icon: <FiZap />,     level: t('cv.level.expert')   },
      ],
    },
    {
      category: t('cv.categories.fullstack'),
      icon: <FiCode className="w-8 h-8" />,
      items: [
        { name: 'Python (Django)',       icon: <SiDjango />,    level: t('cv.level.expert')   },
        { name: 'PostgreSQL',            icon: <SiPostgresql />, level: t('cv.level.expert')  },
        { name: 'ReactJS',               icon: <SiReact />,     level: t('cv.level.advanced') },
        { name: 'Vite & Tailwind CSS',   icon: <FiCode />,      level: t('cv.level.advanced') },
      ],
    },
    {
      category: t('cv.categories.functional'),
      icon: <FiBriefcase className="w-8 h-8" />,
      items: [
        { name: 'Migración ERP',                icon: <FiDatabase />, level: t('cv.level.expert') },
        { name: 'Módulos BackOffice',            icon: <FiLayers />,   level: t('cv.level.expert') },
        { name: 'Arquitectura de Soluciones',    icon: <FiCpu />,      level: t('cv.level.expert') },
      ],
    },
  ];

  const achievements = [
    { metric: '46,000', icon: <FiZap className="w-12 h-12" />,       color: 'from-gb-cyan to-gb-navy'    },
    { metric: '25+',    icon: <FiTrendingUp className="w-12 h-12" />, color: 'from-gb-navy to-purple-600' },
    { metric: '100+',   icon: <FiCloud className="w-12 h-12" />,      color: 'from-purple-600 to-gb-cyan' },
  ];

  const timelineI18n = t('cv.timeline', { returnObjects: true });
  const timeline = TIMELINE_META.map((meta, i) => ({ ...meta, ...timelineI18n[i] }));

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
            {t('cv.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('cv.subtitle')}
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
                {t(`cv.achievements.${index}.label`)}
              </div>
              <div className="text-gray-600">{t(`cv.achievements.${index}.description`)}</div>
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
            {t('cv.skillsTitle')}
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
            {t('cv.timelineTitle')}
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
