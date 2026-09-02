"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  proposal?: {
    id: string;
    summary: string;
  };
}

export function FloatingChat() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://apighumkkad.allindiahub.com";
  
  const [isOpen, setIsOpen] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  // Socket & Voice state
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // Fetch token and initialize socket
  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/chat/test-tokens`);
        const data = await res.json();
        if (data.success) {
          const riderToken = data.riderToken;
          setToken(riderToken);

          const newSocket = io(BACKEND_URL, {
            auth: { token: riderToken },
          });

          newSocket.on("message", (msgData) => {
            setIsLoading(false);
            
            // Auto-play audio if provided
            if (msgData.audioUrl) {
              const url = msgData.audioUrl.startsWith("http") 
                ? msgData.audioUrl 
                : `${BACKEND_URL}${msgData.audioUrl}`;
              const audio = new Audio(url);
              audio.play().catch(e => console.error("Audio play failed:", e));
            }

            if (msgData.type === "proposal") {
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now().toString(),
                  role: "assistant",
                  content: "I have prepared a proposal for you.",
                  proposal: {
                    id: msgData.proposalId,
                    summary: msgData.summary,
                  }
                }
              ]);
            } else {
              setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), role: "assistant", content: msgData.text }
              ]);
            }
          });

          newSocket.on("stt_transcript", (data) => {
            if (!data.isEmpty) {
              setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), role: "user", content: data.text }
              ]);
              setIsLoading(true); // Since backend immediately processes it
            } else {
              setIsLoading(false);
            }
          });

          newSocket.on("confirm_result", (res) => {
            setIsLoading(false);
            const statusText = res.ok 
              ? "✅ Action successfully completed!" 
              : "❌ Failed to complete action. " + (res.error || "");
            
            setMessages((prev) => [
              ...prev,
              { id: Date.now().toString(), role: "assistant", content: statusText }
            ]);
          });

          newSocket.on("error", (err) => {
            console.error("Socket Error:", err);
            setIsLoading(false);
          });

          setSocket(newSocket);
        }
      } catch (err) {
        console.error("Failed to initialize chat:", err);
      }
    };
    initChat();

    return () => {
      if (socket) socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendText = () => {
    if (!inputValue.trim()) return;
    
    if (!socket) {
      alert("Cannot send message: Not connected to the AI server. Please make sure the backend is running.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: inputValue }
    ]);
    
    socket.emit("message", {
      type: "text",
      payload: inputValue,
      voiceMode: false 
    });

    setInputValue("");
    setIsLoading(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log("Recording stopped. Audio blob size:", audioBlob.size);
        if (socket && audioBlob.size > 0) {
          setIsLoading(true);
          socket.emit("message", {
            type: "audio",
            payload: audioBlob,
            voiceMode: true 
          });
        } else {
          console.warn("Socket not connected or audio blob is empty");
        }
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      // Pass a timeslice to ensure data chunks are aggressively collected
      mediaRecorder.start(250);
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied or error:", err);
      alert("Microphone access is required or device not found.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendText();
    }
  };

  const parseBoldText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 right-0 w-[360px] h-[600px] bg-white rounded-xl shadow-[0_5px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-gray-100 origin-bottom-right"
          >
            {/* Chat Header */}
            <div className="bg-[#1E293B] p-4 flex items-center justify-between z-10 relative">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 flex-shrink-0 bg-white rounded-full p-[2px] shadow-sm">
                   <Image
                    src="/images/ghumakkadh_chat_ai.png"
                    alt="Ghumakkadh AI"
                    fill
                    priority
                    className="object-contain rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#77FF00] border-[1.5px] border-[#1E293B] rounded-full z-10"></div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-white text-[16px] leading-tight tracking-wide">Ghumakkadh AI</h3>
                  <p className="text-[12px] text-white/90 font-medium mt-0.5">
                    Powered by AI
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80 transition-colors p-1"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 bg-white flex flex-col gap-4 overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 flex-shrink-0 relative bg-white rounded-full border border-gray-100 p-0.5 mt-0.5 shadow-sm">
                      <Image
                        src="/images/ghumakkadh_chat_ai.png"
                        alt="AI Avatar"
                        fill
                        priority
                        className="object-contain rounded-full"
                      />
                    </div>
                  )}
                  
                  <div className={`flex flex-col gap-2 max-w-[82%]`}>
                    {/* Text Bubble */}
                    {msg.content && (
                      <div 
                        className={`px-4 py-3 text-[15px] shadow-sm whitespace-pre-wrap leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-[#1E293B] text-white rounded-2xl rounded-tr-sm' 
                            : 'bg-[#F4F4F5] text-[#1E293B] rounded-2xl rounded-tl-sm border border-gray-50'
                        }`}
                      >
                        {parseBoldText(msg.content)}
                      </div>
                    )}
                    
                    {/* Proposal Action Card */}
                    {msg.proposal && (
                      <div className="bg-white border-2 border-[#77FF00] rounded-xl p-4 shadow-sm flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                              <line x1="16" y1="13" x2="8" y2="13"/>
                              <line x1="16" y1="17" x2="8" y2="17"/>
                              <polyline points="10 9 9 9 8 9"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1E293B] text-sm">Action Proposed</h4>
                            <p className="text-xs text-gray-600 mt-0.5">{msg.proposal.summary}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <button 
                            onClick={() => {
                              socket?.emit("confirm_tap", { proposalId: msg.proposal?.id });
                              setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: "Action Confirmed" }]);
                              setIsLoading(true);
                            }}
                            className="flex-1 bg-[#1E293B] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-black transition-colors"
                          >
                            Confirm
                          </button>
                          <button className="flex-1 bg-gray-100 text-[#1E293B] text-sm font-bold py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 flex-shrink-0 relative bg-white rounded-full border border-gray-100 p-0.5 mt-0.5 shadow-sm">
                    <Image src="/images/ghumakkadh_chat_ai.png" alt="AI Avatar" fill priority className="object-contain rounded-full" />
                  </div>
                  <div className="bg-[#F4F4F5] px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-50 shadow-sm flex items-center gap-1.5 h-[46px]">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer Area */}
            <div className="bg-white border-t border-gray-100 flex flex-col relative z-20 pb-2">
              {/* Input section */}
              <div className="p-4 pb-2">
                <div className={`flex items-center gap-2 border rounded-full px-5 py-3 bg-white transition-all shadow-sm border-gray-300 focus-within:border-[#1E293B] focus-within:ring-2 focus-within:ring-[#77FF00]/30`}>
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder={"Ask me anything..."}
                    className="flex-1 text-[15px] bg-transparent focus:outline-none text-[#1E293B] placeholder-gray-400"
                  />
                  <div className="flex items-center gap-0.5 text-[#1E293B]">
                    <button 
                      onClick={toggleRecording}
                      className={`transition-all p-2 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-[#1E293B] hover:bg-gray-100'}`} 
                      title={isRecording ? "Stop Recording" : "Use Voice"}
                    >
                      {isRecording ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="6" width="12" height="12" rx="2" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                          <line x1="12" x2="12" y1="19" y2="22"/>
                        </svg>
                      )}
                    </button>
                    <button 
                      onClick={handleSendText}
                      disabled={!inputValue.trim() || isLoading}
                      className={`transition-all flex items-center justify-center p-2 rounded-full ${(!inputValue.trim() && !isRecording) ? 'cursor-not-allowed text-gray-400' : 'text-[#1E293B] hover:scale-110 active:scale-95 hover:text-[#77FF00]'}`}
                      title="Send Message"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5">
                        <line x1="22" x2="11" y1="2" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="text-[11px] text-gray-400 font-medium tracking-wide">AI content can be inaccurate, can do mistakes</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="absolute bottom-0 right-0 w-28 h-28 shadow-2xl focus:outline-none group flex items-center justify-center"
          >
            <div className="relative w-full h-full">
               <Image src="/images/ghumakkadh_chat_ai.png" alt="Chat" fill priority className="object-contain" />
            </div>
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#77FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#77FF00] border-2 border-white"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
