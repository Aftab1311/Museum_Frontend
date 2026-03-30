import { useEffect, useRef, useState } from "react";
import { LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import { askMuseumAssistant } from "../services/chatbotService";

const welcomeMessage = {
  id: "welcome-message",
  role: "assistant",
  content:
    "Welcome to NaijaHeritage. Ask me about artifacts, their origin, materials, or historical significance.",
};

const toHistory = (messages) =>
  messages
    .filter((message) => message.id !== welcomeMessage.id)
    .slice(-8)
    .map(({ role, content }) => ({ role, content }));

const formatMessage = (text) => {
  if (typeof text !== "string") return "";
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const withBold = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return withBold.replace(/\n/g, "<br/>");
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const scrollAnchorRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }

    const userText = input.trim();
    if (!userText) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await askMuseumAssistant({
        message: userText,
        history: toHistory(messages),
      });

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            error.message ||
            "I could not answer right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section className="w-[calc(100vw-2rem)] max-w-[390px] overflow-hidden rounded-[28px] border border-[#5A5A40]/20 bg-[#f5f5f0] shadow-[0_14px_40px_rgba(44,44,30,0.18)]">
          <header className="flex items-center justify-between border-b border-[#5A5A40]/15 bg-[#e8e8e0] px-4 py-3">
            <div>
              <p className="font-serif text-lg font-semibold tracking-tight text-cultural-ink">
                Museum Guide
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#5A5A40]">
                AI Assistant
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-cultural-ink/70 transition-colors hover:bg-white/70 hover:text-cultural-ink"
              aria-label="Close museum chatbot"
            >
              <X size={18} />
            </button>
          </header>

          <div className="max-h-[56vh] min-h-[300px] space-y-3 overflow-y-auto bg-[#f5f5f0] px-4 py-4 sm:max-h-[500px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto rounded-br-md bg-[#5A5A40] text-white"
                    : "mr-auto rounded-bl-md border border-[#5A5A40]/15 bg-white text-cultural-ink"
                }`}
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              >
              </div>
            ))}

            {isLoading && (
              <div className="mr-auto inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-[#5A5A40]/15 bg-white px-3.5 py-2.5 text-sm text-cultural-ink">
                <LoaderCircle size={15} className="animate-spin" />
                Thinking...
              </div>
            )}
            <div ref={scrollAnchorRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-[#5A5A40]/15 bg-[#f5f5f0] p-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-[#5A5A40]/25 bg-white px-2 py-2 shadow-sm">
              <textarea
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Nigerian heritage..."
                className="max-h-28 min-h-[36px] flex-1 resize-none bg-transparent px-2 text-sm text-cultural-ink outline-none placeholder:text-cultural-ink/45"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#5A5A40] text-white transition hover:bg-[#42422f] disabled:cursor-not-allowed disabled:bg-[#5A5A40]/45"
                aria-label="Send message to museum chatbot"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 px-1 text-[11px] text-cultural-ink/55">
              Responses are AI-generated and may occasionally be inaccurate.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#5A5A40]/30 bg-[#5A5A40] text-white shadow-[0_10px_24px_rgba(44,44,30,0.35)] transition hover:bg-[#42422f]"
        aria-label={isOpen ? "Close museum chatbot" : "Open museum chatbot"}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
