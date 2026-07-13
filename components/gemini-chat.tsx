"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, ChevronRight, Stethoscope } from "lucide-react"
import { useChat, type UIMessage } from "@ai-sdk/react"
import { TextStreamChatTransport, isTextUIPart } from "ai"

const SUGGESTIONS = [
  "Quelles sont vos spécialités ?",
  "Demander un rendez-vous",
  "Où êtes-vous situés ?",
  "Quels sont vos tarifs ?",
]

function getMessageText(message: UIMessage): string {
  if (message.parts) {
    return message.parts
      .filter(isTextUIPart)
      .map((part) => part.text)
      .join("")
  }
  return (message as { content?: string, text?: string }).content || (message as { content?: string, text?: string }).text || ""
}

function Bubble({ message }: { message: UIMessage }) {
  const isBot = message.role === "assistant"
  const raw = getMessageText(message)
  const html = raw
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>")

  if (!raw) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${isBot ? "items-start" : "items-end flex-row-reverse"}`}
    >
      {isBot && (
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#1D3F75]/20 p-1 overflow-hidden">
          <Stethoscope className="size-4 text-[#1D3F75]" />
        </span>
      )}
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? "rounded-tl-sm border border-slate-200 bg-white text-slate-800"
            : "rounded-tr-sm bg-[#1D3F75] text-white font-medium"
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </motion.div>
  )
}

export function GeminiChat() {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new TextStreamChatTransport({ api: "/api/chat" }),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Bonjour 👋 Je suis Khadija, l'IA de la Clinique. Comment puis-je vous aider aujourd'hui ?",
          },
        ],
      },
    ],
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSend = (text: string) => {
    const msg = text.trim()
    if (!msg || isLoading) return
    setInputValue("")
    sendMessage({ parts: [{ type: "text", text: msg }], role: "user" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(inputValue)
  }

  const visibleMessages = messages.filter((m) => getMessageText(m).length > 0)

  return (
    <div className="fixed bottom-6 right-5 z-[110] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="flex w-[340px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-black/20 sm:w-[380px]"
            style={{ maxHeight: "min(560px, 80vh)" }}
          >
            <div className="flex items-center gap-3 bg-[#1D3F75] px-4 py-3.5">
              <span className="relative flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-white/10 p-1 overflow-hidden">
                <Stethoscope className="size-5 text-[#1D3F75]" />
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1D3F75]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight text-white">Khadija IA</p>
                <p className="flex items-center gap-1 text-xs text-white/60">
                  <span className="inline-block size-1.5 rounded-full bg-emerald-400" />
                  Assistant en ligne
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex size-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 bg-slate-50/50">
              {visibleMessages.map((m) => (
                <Bubble key={m.id} message={m} />
              ))}

              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 p-1 overflow-hidden">
                      <Stethoscope className="size-4 text-[#1D3F75]" />
                    </span>
                    <span className="flex gap-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="block size-1.5 rounded-full bg-slate-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-50 px-3 py-2 text-xs text-red-500">
                  Impossible de contacter le serveur. (Quota Google atteint, attendez un instant).
                </p>
              )}

              <div ref={bottomRef} />
            </div>

            {visibleMessages.length <= 1 && !isLoading && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2 bg-slate-50/50">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-[#1D3F75] hover:text-[#1D3F75]"
                  >
                    {s}
                    <ChevronRight className="size-3" />
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-slate-200 px-4 py-3 bg-white">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Écrivez un message…"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-[#1D3F75] focus:ring-2 focus:ring-[#1D3F75]/20 text-slate-800"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#1D3F75] text-white transition-all hover:bg-[#DE3B36] disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ouvrir le chatbot"
        className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#1D3F75] to-[#DE3B36] text-white shadow-xl shadow-black/20"
      >
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full bg-white"
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex size-full items-center justify-center rounded-full p-2.5 overflow-hidden"
            >
              <Stethoscope className="size-7 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
