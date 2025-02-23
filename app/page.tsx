"use client"
import { useState } from "react";
import Chat from "./Chat/page";
import Intro from "./components/intro";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  const handleScrollEnd = () => {
    setShowChat(true);
    window.scrollTo(0, 0); // Desplazar a la parte superior para mostrar el chat
  };

  return (
    <main className="min-h-screen overflow-hidden">
      {!showChat ? <Intro onScrollEnd={handleScrollEnd} /> : <Chat />}
    </main>
  );
}
