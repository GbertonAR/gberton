/**
 * @system     FlowState AI
 * @brand      Dinamismo y Flujo 
 * @module     MainLayout.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-05-02
 * @summary    Layout principal que gestiona el Shell del sistema y la navegación modular.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-deep-universe selection:bg-flow-tech/30 selection:text-flow-cyan">
            <Navigation />
            <main className="pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
