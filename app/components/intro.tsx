"use client";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ParticleBackground from "./ParticlesBackground";

const sections = [
    { text: "Bienvenid@, somos Psico App", background: "bg-[#35969F]" },
    { text: "Te damos la bienvenida a nuestro sistema", background: "bg-[#35969F]" },
    { text: "Vamos a buscar la mejor solución para vos", background: "bg-[#35969F]" },
];


export default function Intro({ onScrollEnd }: { onScrollEnd: () => void }) {
    const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
    const currentSection = useRef(0); // Referencia para rastrear la sección actual
    const isScrolling = useRef(false); // Estado para evitar scrolls múltiples
    const [isExploding, setIsExploding] = useState(false);
    const router = useRouter();

    const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
        sectionsRef.current[index] = el; // Asigna la referencia al índice correspondiente
    };

    const scrollToSection = (index: number) => {
        if (index >= 0 && index < sectionsRef.current.length) {
            currentSection.current = index;
            sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
            isScrolling.current = true;
            setTimeout(() => {
                isScrolling.current = false; // Reactivar scroll después del movimiento
            }, 600); // Ajusta el tiempo según la velocidad del scroll
        }
    };

    const scrollToNextSection = () => {
        scrollToSection(currentSection.current + 1);
    };


    const handleScroll = (event: WheelEvent) => {
        event.preventDefault();
        if (isScrolling.current) return; // Bloquea eventos múltiples

        const threshold = 30; // Mínima sensibilidad para detectar scroll

        if (event.deltaY > threshold && currentSection.current < sections.length - 1) {
            scrollToSection(currentSection.current + 1);
        } else if (event.deltaY < -threshold && currentSection.current > 0) {
            scrollToSection(currentSection.current - 1);
        }
    };

    const handleBubbleClick = () => {
        setIsExploding(true);
        setTimeout(() => {
            router.push("/Chat");
            onScrollEnd();
        }, 500); // Duración coincidente con la animación
    };

    useEffect(() => {
        let touchStartY = 0;
        let touchEndY = 0;
    
        // Manejo del evento Wheel (mouse)
        const handleScroll = (event: WheelEvent) => {
          event.preventDefault();
          if (isScrolling.current) return;
    
          const threshold = 30;
          if (event.deltaY > threshold && currentSection.current < sections.length - 1) {
            scrollToSection(currentSection.current + 1);
          } else if (event.deltaY < -threshold && currentSection.current > 0) {
            scrollToSection(currentSection.current - 1);
          }
        };
        
        // Manejo de eventos Touch
        const handleTouchStart = (e: TouchEvent) => {
          touchStartY = e.touches[0].clientY;
        };
    
        const handleTouchEnd = (e: TouchEvent) => {
          touchEndY = e.changedTouches[0].clientY;
          const diff = touchStartY - touchEndY;
          const threshold = 50;
    
          if (isScrolling.current) return;
          if (diff > threshold && currentSection.current < sections.length - 1) {
            scrollToSection(currentSection.current + 1);
          } else if (diff < -threshold && currentSection.current > 0) {
            scrollToSection(currentSection.current - 1);
          }
        };
    
        // Agregar event listeners
        window.addEventListener("wheel", handleScroll, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
    
        // Cleanup: remover event listeners al desmontar
        return () => {
          window.removeEventListener("wheel", handleScroll);
          window.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("touchend", handleTouchEnd);
        };
      }, []);

    return (
        <div className="h-screen overflow-hidden force-light">
          <ParticleBackground></ParticleBackground>
            {sections.map((section, index) => (
                <motion.div
                    key={index}
                    ref={setSectionRef(index)} // Asigna la referencia
                    className={`h-screen flex flex-col items-center justify-center text-white text-center ${section.background}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl font-bold mb-4">{section.text}</h1>
                    {index < sections.length - 1 && (
                        <a
                            onClick={scrollToNextSection} // Manejar el click para avanzar a la siguiente sección
                            className="mt-8 text-lg flex items-center cursor-pointer"
                        >
                            Siguiente <FaArrowDown className="ml-2 animate-bounce" />
                        </a>
                    )}
                    {index === sections.length - 1 && (
                       <motion.button
                       className="mt-8 bg-white text-blue-500 px-6 py-2 rounded-full shadow-lg relative overflow-hidden transition-transform"
                       onClick={handleBubbleClick}
                       animate={isExploding ? { scale: [1, 1.2, 0], opacity: [1, 0.5, 0] } : {}}
                       transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.5, 1] }}
                     >
                       {/* Texto del botón */}
                       <motion.span
                         className="relative z-10"
                         animate={isExploding ? { scale: [1, 0.8] } : {}}
                       >
                         Empezar
                       </motion.span>
                     
                       {/* Burbuja de explosión */}
                       {isExploding && (
                         <motion.div
                           className="absolute inset-0 bg-blue-500 rounded-full"
                           initial={{ scale: 0 }}
                           animate={{ scale: 2, opacity: [0.8, 0] }}
                           transition={{ duration: 0.6, ease: "easeOut" }}
                         />
                       )}
                     </motion.button>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
