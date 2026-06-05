/**
 * @system     FlowState AI
 * @module     WorldCupGlobe.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-06-05
 * @summary    Globo 3D interactivo con 24 selecciones FIFA 2026 orbitando en dos anillos.
 *             Patrón basado en StaffOrbit3D — mismo engine, temática mundialista.
 */

import { useRef, Component, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── Equipos por anillo ─────────────────────────────────────────────────────────
const RING_1 = [
    { name: 'Argentina',   flag: '🇦🇷' },
    { name: 'Brasil',      flag: '🇧🇷' },
    { name: 'Francia',     flag: '🇫🇷' },
    { name: 'Alemania',    flag: '🇩🇪' },
    { name: 'España',      flag: '🇪🇸' },
    { name: 'Portugal',    flag: '🇵🇹' },
    { name: 'México',      flag: '🇲🇽' },
    { name: 'USA',         flag: '🇺🇸' },
    { name: 'Países Bajos',flag: '🇳🇱' },
    { name: 'Uruguay',     flag: '🇺🇾' },
    { name: 'Colombia',    flag: '🇨🇴' },
    { name: 'Inglaterra',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
];

const RING_2 = [
    { name: 'Japón',       flag: '🇯🇵' },
    { name: 'Marruecos',   flag: '🇲🇦' },
    { name: 'Croacia',     flag: '🇭🇷' },
    { name: 'Senegal',     flag: '🇸🇳' },
    { name: 'Canadá',      flag: '🇨🇦' },
    { name: 'Australia',   flag: '🇦🇺' },
    { name: 'Bélgica',     flag: '🇧🇪' },
    { name: 'Ecuador',     flag: '🇪🇨' },
    { name: 'Chile',       flag: '🇨🇱' },
    { name: 'Paraguay',    flag: '🇵🇾' },
    { name: 'Italia',      flag: '🇮🇹' },
    { name: 'Suiza',       flag: '🇨🇭' },
];

// ── Error Boundary ─────────────────────────────────────────────────────────────
class GlobeErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { error: false }; }
    static getDerivedStateFromError() { return { error: true }; }
    render() { return this.state.error ? null : this.props.children; }
}

// ── Globo Central ──────────────────────────────────────────────────────────────
const Globe = () => {
    const coreRef  = useRef();
    const wireRef  = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (coreRef.current)  coreRef.current.rotation.y  =  t * 0.08;
        if (wireRef.current)  wireRef.current.rotation.y  = -t * 0.05;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
            <group>
                {/* Atmósfera exterior */}
                <mesh>
                    <sphereGeometry args={[2.45, 32, 32]} />
                    <meshBasicMaterial color="#16a34a" transparent opacity={0.04} side={THREE.BackSide} />
                </mesh>

                {/* Esfera sólida */}
                <mesh ref={coreRef}>
                    <sphereGeometry args={[2, 48, 32]} />
                    <meshStandardMaterial
                        color="#0d2b1a"
                        emissive="#16a34a"
                        emissiveIntensity={0.18}
                        roughness={0.8}
                        metalness={0.1}
                    />
                </mesh>

                {/* Grilla del globo (meridianos / paralelos) */}
                <mesh ref={wireRef}>
                    <sphereGeometry args={[2.02, 18, 12]} />
                    <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.12} />
                </mesh>

                {/* Anillo ecuatorial decorativo */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[2.05, 2.15, 64]} />
                    <meshBasicMaterial color="#4ade80" transparent opacity={0.25} side={THREE.DoubleSide} />
                </mesh>

                {/* ⚽ en el centro via Html */}
                <Html center zIndexRange={[1, 2]}>
                    <div style={{ fontSize: '2.8rem', filter: 'drop-shadow(0 0 12px #22c55e88)', userSelect: 'none' }}>
                        ⚽
                    </div>
                </Html>
            </group>
        </Float>
    );
};

// ── Bandera individual ─────────────────────────────────────────────────────────
const FlagNode = ({ flag, name, x, y, z }) => (
    <group position={[x, y, z]}>
        <Html center distanceFactor={7} zIndexRange={[0, 5]}>
            <div
                title={name}
                style={{
                    fontSize: '1.9rem',
                    lineHeight: 1,
                    userSelect: 'none',
                    cursor: 'default',
                    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
                    transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.35)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                {flag}
            </div>
        </Html>
    </group>
);

// ── Anillo orbital ─────────────────────────────────────────────────────────────
const OrbitalRing = ({ teams, radius, speed, tiltX = 0, tiltZ = 0, ringColor = '#22c55e' }) => {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (groupRef.current)
            groupRef.current.rotation.y = clock.getElapsedTime() * speed;
    });

    const step = (Math.PI * 2) / teams.length;

    return (
        <group rotation={[tiltX, 0, tiltZ]}>
            {/* Aro visible */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.04, radius + 0.04, 80]} />
                <meshBasicMaterial color={ringColor} transparent opacity={0.08} side={THREE.DoubleSide} />
            </mesh>

            <group ref={groupRef}>
                {teams.map((team, i) => {
                    const angle = i * step;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    const yOff = Math.sin(angle * 2.5) * 0.4;
                    return (
                        <FlagNode
                            key={team.name}
                            flag={team.flag}
                            name={team.name}
                            x={x} y={yOff} z={z}
                        />
                    );
                })}
            </group>
        </group>
    );
};

// ── Componente principal exportado ────────────────────────────────────────────
export const WorldCupGlobe = () => {
    return (
        <div className="w-full relative" style={{ height: '520px' }}>
            {/* Fade radial en los bordes */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#020805_100%)] z-10 pointer-events-none" />

            <Canvas camera={{ position: [0, 2.5, 10], fov: 42 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[0, 0, 0]} intensity={3} color="#22c55e" distance={12} />
                <directionalLight position={[8, 6, 6]} intensity={0.8} color="#ffffff" />
                <pointLight position={[-6, 4, -4]} intensity={0.5} color="#34d399" distance={14} />

                {/* Partículas */}
                <Sparkles count={120} scale={14} size={1.5} speed={0.3} opacity={0.35} color="#22c55e" />
                <Sparkles count={40}  scale={10} size={2.5} speed={0.15} opacity={0.15} color="#facc15" />

                {/* Globo central */}
                <GlobeErrorBoundary>
                    <Suspense fallback={null}>
                        <Globe />
                    </Suspense>
                </GlobeErrorBoundary>

                {/* Anillo 1 — ecuatorial, 12 equipos */}
                <OrbitalRing
                    teams={RING_1}
                    radius={4.2}
                    speed={0.12}
                    tiltX={0}
                    tiltZ={0}
                    ringColor="#22c55e"
                />

                {/* Anillo 2 — inclinado 38°, 12 equipos, sentido contrario */}
                <OrbitalRing
                    teams={RING_2}
                    radius={5.4}
                    speed={-0.09}
                    tiltX={0.66}
                    tiltZ={0.15}
                    ringColor="#facc15"
                />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.4}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI - Math.PI / 4}
                />
            </Canvas>
        </div>
    );
};
