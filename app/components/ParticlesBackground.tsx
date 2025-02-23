"use client";
import { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const particlesRef = useRef<Container | null>(null);
    const [engine, setEngine] = useState<Engine | null>(null);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine);
            setEngine(engine);
        });
    }, []);

    useEffect(() => {
        if (!particlesRef.current) return;

        const particles = particlesRef.current;

        particles.options.particles.move.speed = scrollProgress * 5;

        particles.refresh(); // Método oficial para actualizar
    }, [scrollProgress]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(Math.min(scrollY / maxScroll, 1));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

   
    const options: ISourceOptions = {
        particles: {
            number: { 
                value: 100,
                density: {
                    enable: true,
                }
            },
            color: {
                value: ["#B3FBEC", "#38f8ff", "#FFFFFF"] // Array para múltiples colores
            },
            shape: {
                type: "circle", // Formas disponibles: "circle", "edge", "triangle", "polygon", "star", "image"
                options: {
                    polygon: { // Configuración específica para polígonos
                        sides: 5 // Pentágonos
                    },
                    image: { // Para usar imágenes como partículas
                        src: "https://particles.js.org/images/amongus_blue.png",
                        width: 100,
                        height: 100
                    }
                }
            },
            move: { 
                enable: true, 
                speed: 3,
                direction: "none",
                random: false,
                straight: false,
            },
            size: {
                value: { min: 1, max: 5 }, // Tamaño aleatorio entre 1 y 5
            },
            opacity: {
                value: { min: 0.3, max: 1 }, // Opacidad variable
            },
            links: {
                enable: true,
                opacity: 0.5, // Hacer los links visibles
                color: "#FFFFFF", // Color de los links
                distance: 150
            },
            // Configuración adicional para efectos especiales
            wobble: {
                enable: true,
                distance: 10,
                speed: 10
            },
            rotate: {
                value: { min: 0, max: 360 },
                animation: {
                    enable: true,
                    speed: 15
                }
            }
        }
    };

    if (!engine) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            particlesLoaded={async (container?: Container) => {
                if (container) {
                    particlesRef.current = container;
                }
            }}
        />
    );
}