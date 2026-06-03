/**
 * @system     FlowState AI
 * @brand      Dinamismo y Flujo
 * @module     NeuralNetwork3D.jsx
 * @copyright  © 2026 Gustavo Berton
 * @author     Gustavo Berton
 * @created    2026-06-03
 * @summary    Componente 3D interactivo usando React Three Fiber. Simula una red neuronal/synapsis con puntos flotantes y conexiones brillantes.
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ParticleNetwork = ({ count = 100, radius = 2.5 }) => {
    const groupRef = useRef();
    const linesRef = useRef();
    const pointsRef = useRef();

    // Generar posiciones aleatorias en una esfera
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const colorPalette = [
            new THREE.Color('#00f0ff'), // Flow Cyan
            new THREE.Color('#8b2fc9'), // Innovation Purple
            new THREE.Color('#00ffaa'), // Emerald/Neon Green
        ];

        for (let i = 0; i < count; i++) {
            // Posición esférica aleatoria
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(Math.random() * 2 - 1);
            const r = radius * Math.cbrt(Math.random()); // Distribución volumétrica interior

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color aleatorio de la paleta
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return { positions, colors };
    }, [count, radius]);

    // Generar líneas conectando puntos cercanos
    const { linePositions, lineColors } = useMemo(() => {
        const linePos = [];
        const lineCol = [];
        const maxDistance = radius * 0.65; // Umbral de conexión

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = particles.positions[i * 3] - particles.positions[j * 3];
                const dy = particles.positions[i * 3 + 1] - particles.positions[j * 3 + 1];
                const dz = particles.positions[i * 3 + 2] - particles.positions[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < maxDistance * maxDistance) {
                    // Puntos
                    linePos.push(
                        particles.positions[i * 3], particles.positions[i * 3 + 1], particles.positions[i * 3 + 2],
                        particles.positions[j * 3], particles.positions[j * 3 + 1], particles.positions[j * 3 + 2]
                    );

                    // Colores (promedio o alfa basado en distancia)
                    const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;
                    
                    // Color inicio (usando cyan base)
                    lineCol.push(0, 0.94, 1, alpha); // Cyan
                    // Color fin
                    lineCol.push(0.54, 0.18, 0.78, alpha); // Purple
                }
            }
        }
        return { 
            linePositions: new Float32Array(linePos),
            lineColors: new Float32Array(lineCol)
        };
    }, [particles, count, radius]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Rotación general suave
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.1;
            groupRef.current.rotation.z = time * 0.05;
        }
        // Movimiento flotante
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Puntos / Nodos */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particles.positions.length / 3}
                        array={particles.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particles.colors.length / 3}
                        array={particles.colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.15}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Conexiones / Sinapsis */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={linePositions.length / 3}
                        array={linePositions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={lineColors.length / 4}
                        array={lineColors}
                        itemSize={4}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>

            {/* Núcleo central sutil */}
            <Sphere args={[radius * 0.3, 32, 32]}>
                <meshBasicMaterial 
                    color="#00f0ff" 
                    transparent 
                    opacity={0.05} 
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>
        </group>
    );
};

export const NeuralNetwork3D = () => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-0">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <ParticleNetwork count={120} radius={3.5} />
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    autoRotate 
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI - Math.PI / 4}
                />
            </Canvas>
        </div>
    );
};
