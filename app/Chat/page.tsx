"use client";
import { useState, useEffect, useRef } from "react";

export default function Chat() {
  
/*   const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const chatbotButtonRef = useRef<HTMLButtonElement | null>(null);
 */
  // Cargar el script de Botmaker

 useEffect(() => {
    const loadBotmakerScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://go.botmaker.com/rest/webchat/p/AGPMSL7HFL/init.js";
      document.body.appendChild(script);
    };
    loadBotmakerScript();

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const existingScript = document.querySelector(`script[src="https://go.botmaker.com/rest/webchat/p/AGPMSL7HFL/init.js"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); 
  
/* 
  // Simulación de respuesta
  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = { role: "user", content: message };
    setChat([...chat, newMessage]);
    setMessage("");

    // Simulación de respuesta (luego lo conectaremos con la API)
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Esto es una respuesta de prueba." },
      ]);
    }, 1000);
  }; */

  return (
    <section>
      {/* <div className="p-4 w-full max-w-md mx-auto bg-white shadow-md rounded-lg">
        <div className="h-96 overflow-y-auto border-b p-3 space-y-2">
          {chat.map((msg, i) => (
            <div key={i} className={`p-2 rounded-md ${msg.role === "user" ? "bg-blue-500 text-white self-end text-right" : "bg-gray-200 text-black self-start"}`}>
              <b>{msg.role === "user" ? "Tú" : "ChatGPT"}:</b> {msg.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="Escribe un mensaje..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </div> */}
    </section>
  );
}
