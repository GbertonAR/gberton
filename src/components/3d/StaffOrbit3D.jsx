/**
 * @system     FlowState AI
 * @brand      Dinamismo y Flujo 
 * @module     StaffOrbit3D.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-06-03
 * @summary    Hero interactivo 3D con el ecosistema de agentes orbitando el núcleo (Logo FlowState).
 */

import React, { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Image, Sparkles, Float, Billboard } from '@react-three/drei';
import * as THREE from 'three';

class CanvasErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { error: false }; }
    static getDerivedStateFromError() { return { error: true }; }
    render() { return this.state.error ? null : this.props.children; }
}

const STAFF_MEMBERS = [
    { name: 'KAI', url: '/img/Staff/KAI.webp' },
    { name: 'ADA L', url: '/img/Staff/Avatar ADA L 1.webp' },
    { name: 'LEX', url: '/img/Staff/LEX.webp' },
    { name: 'CYRA', url: '/img/Staff/CYRA.webp' },
    { name: 'LUMEN', url: '/img/Staff/LUMEN.webp' },
    { name: 'Murphy', url: '/img/Staff/Murphy.webp' },
    { name: 'Nexa', url: '/img/Staff/Nexa.webp' },
    { name: 'VANT', url: '/img/Staff/VANT.webp' },
    { name: 'VERA', url: '/img/Staff/VERA.webp' },
    { name: 'Arko', url: '/img/Staff/Arko.webp' },
    { name: 'FINA', url: '/img/Staff/FINA.webp' },
    { name: 'Klaus', url: '/img/Staff/Klaus.webp' },
    { name: 'Charles', url: '/img/Staff/Charles.webp' }
];

// Componente para un miembro del staff en la órbita
const StaffNode = ({ url, angle, radius, index }) => {
    const ref = useRef();
    
    // Posición estática inicial (el grupo padre se encargará de rotar todo)
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    // Offset vertical para que no estén todos en el mismo plano exacto
    const yOffset = Math.sin(angle * 3) * 0.5;

    return (
        <group position={[x, yOffset, z]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
                <Billboard follow={true}>
                    <CanvasErrorBoundary>
                        <Suspense fallback={null}>
                            <Image
                                url={url}
                                transparent
                                opacity={0.9}
                                scale={1.5}
                                renderOrder={1}
                            />
                        </Suspense>
                    </CanvasErrorBoundary>
                </Billboard>
            </Float>
        </group>
    );
};

// Grupo principal que rota constantemente
const OrbitalRing = ({ radius = 4 }) => {
    const groupRef = useRef();
    
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.15; // Rotación lenta del anillo
        }
    });

    const angleStep = (Math.PI * 2) / STAFF_MEMBERS.length;

    return (
        <group ref={groupRef}>
            {/* Aro de energía sutil indicando la órbita */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
                <meshBasicMaterial color="#00D4FF" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>
            
            {STAFF_MEMBERS.map((member, i) => (
                <StaffNode 
                    key={member.name} 
                    url={member.url} 
                    angle={i * angleStep} 
                    radius={radius} 
                    index={i} 
                />
            ))}
        </group>
    );
};

// Centro brillante (El Logo)
const CoreLogo = () => {
    return (
        <Float speed={3} rotationIntensity={0.05} floatIntensity={0.5}>
            <Billboard follow={true}>
                {/* Aura de brillo */}
                <mesh position={[0, 0, -0.1]}>
                    <circleGeometry args={[2.5, 32]} />
                    <meshBasicMaterial color="#1A6EF5" transparent opacity={0.2} />
                </mesh>
                <CanvasErrorBoundary>
                    <Suspense fallback={null}>
                        <Image
                            url="/img/Logo1.webp"
                            transparent
                            scale={5}
                            renderOrder={2}
                        />
                    </Suspense>
                </CanvasErrorBoundary>
            </Billboard>
        </Float>
    );
};

export const StaffOrbit3D = () => {
    return (
        <div className="w-full h-full min-h-[500px] relative pointer-events-auto">
            {/* Degradado para fundir los bordes del canvas */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050810_100%)] z-10 pointer-events-none" />
            
            <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                {/* Iluminación */}
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 0, 0]} intensity={2} color="#00D4FF" distance={10} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
                
                {/* Partículas del Ecosistema */}
                <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.4} color="#00D4FF" />
                <Sparkles count={50} scale={10} size={3} speed={0.2} opacity={0.2} color="#8B2FC9" />

                {/* Centro de gravedad */}
                <CoreLogo />

                {/* Órbita de agentes */}
                <OrbitalRing radius={4.5} />

                {/* Controles para que el usuario pueda rotarlo manualmente si quiere */}
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 3} // Limitar a vista medio horizontal
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
};
