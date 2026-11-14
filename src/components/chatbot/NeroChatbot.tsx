
"use client";

import ReactMarkdown from "react-markdown";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import Link from "next/link";

// ==========================================
// #region TYPES
// ==========================================

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

// #endregion

// ==========================================
// #region CHATBOT SETTINGS
// ==========================================

const WELCOME_MESSAGE =
  "🚀 Hello, explorer! I'm NERO, your AI guide through My Universe. Ask me about the projects, skills, education, and experience showcased here!";

const SUGGESTED_QUESTIONS = [
  "Tell me about the Final Year Project.",
  "What technical skills are showcased?",
  "What is the educational background?",
];

const MAX_MESSAGE_LENGTH = 500;
const REQUEST_TIMEOUT = 30000;

// #endregion

// ==========================================
// #region COLORFUL ROCKET ICON
// ==========================================

function RocketIcon({
  size = 36,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Rocket body gradient */}
        <linearGradient
          id="nero-rocket-body"
          x1="15"
          y1="50"
          x2="51"
          y2="7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BFDFFF" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FF76AA" />
        </linearGradient>

        {/* Flame gradient */}
        <linearGradient
          id="nero-rocket-flame"
          x1="13"
          y1="53"
          x2="30"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF523D" />
          <stop offset="0.5" stopColor="#FFB02E" />
          <stop offset="1" stopColor="#FFF4A3" />
        </linearGradient>
      </defs>

      {/* #region FLAME */}

      <path
        d="M23 43C18 46 14 51 12 60C20 58 26 54 29 48L23 43Z"
        fill="url(#nero-rocket-flame)"
      />

      {/* #endregion */}

      {/* #region LEFT FIN */}

      <path
        d="M25 38L14 36L7 46L19 45L25 38Z"
        fill="#FF648B"
        stroke="#B93273"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* #endregion */}

      {/* #region RIGHT FIN */}

      <path
        d="M35 45L37 56L47 49L44 37L35 45Z"
        fill="#FF648B"
        stroke="#B93273"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* #endregion */}

      {/* #region ROCKET BODY */}

      <path
        d="M19 43C23 29 36 11 54 7C57 24 44 42 30 49L19 43Z"
        fill="url(#nero-rocket-body)"
        stroke="#A5B4FC"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* #endregion */}

      {/* #region ROCKET NOSE */}

      <path
        d="M40 12C45 9 50 8 54 7C55 12 54 17 52 22L40 12Z"
        fill="#FF5F93"
      />

      {/* #endregion */}

      {/* #region WINDOW */}

      <circle
        cx="39"
        cy="26"
        r="8"
        fill="#1E3A8A"
        stroke="#6D75DD"
        strokeWidth="2"
      />

      <circle
        cx="39"
        cy="26"
        r="5"
        fill="#38D8F8"
      />

      <circle
        cx="37"
        cy="24"
        r="2"
        fill="#D8FAFF"
      />

      {/* #endregion */}

      {/* #region ENGINE */}

      <path
        d="M20 43L30 49L26 54L16 47L20 43Z"
        fill="#6475D9"
        stroke="#A5B4FC"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* #endregion */}
    </svg>
  );
}

// #endregion

// ==========================================
// #region NERO CHATBOT
// ==========================================

export default function NeroChatbot() {
  // #region STATE

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      text: WELCOME_MESSAGE,
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // #endregion

  // #region REFS

  const chatScrollRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const requestRef = useRef<AbortController | null>(null);

  const messageIdRef = useRef(1);

  const loadingRef = useRef(false);

  // #endregion

  // ==========================================
  // #region AUTO SCROLL INSIDE CHAT
  // ==========================================

  useEffect(() => {
    if (!isOpen || !chatScrollRef.current) {
      return;
    }

    // Scroll only the chat container.
    // Do not scroll the main portfolio page.
    chatScrollRef.current.scrollTop =
      chatScrollRef.current.scrollHeight;
  }, [messages, isOpen, isLoading]);

  // #endregion

  // ==========================================
  // #region ESCAPE KEY / CLEANUP
  // ==========================================

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );

      // Abort any pending request if the
      // chatbot component is unmounted.
      requestRef.current?.abort();
    };
  }, []);

  // #endregion

  // ==========================================
  // #region SEND MESSAGE TO GEMINI
  // ==========================================

  const sendMessage = async (question: string) => {
    const text = question.trim();

    if (
      !text ||
      text.length > MAX_MESSAGE_LENGTH ||
      loadingRef.current
    ) {
      return;
    }

    loadingRef.current = true;

    setInput("");
    setErrorMessage("");
    setIsLoading(true);

    // Add visitor message.
    const userMessage: ChatMessage = {
      id: messageIdRef.current++,
      role: "user",
      text,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    // Create a separate controller for each request.
    const controller = new AbortController();

    requestRef.current = controller;

    const timeout = window.setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      // #region CALL NEXT.JS API

      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: text,
        }),

        signal: controller.signal,
      });

      // #endregion

      // #region READ RESPONSE

      const data: {
        reply?: string;
        error?: string;
      } = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to contact NERO right now."
        );
      }

      if (
        typeof data.reply !== "string" ||
        !data.reply.trim()
      ) {
        throw new Error(
          "NERO returned an empty response."
        );
      }

      // #endregion

      // #region ADD AI RESPONSE

      const assistantMessage: ChatMessage = {
        id: messageIdRef.current++,
        role: "assistant",
        text: data.reply.trim(),
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);

      // #endregion
    } catch (error) {
      // #region ERROR HANDLING

      if (controller.signal.aborted) {
        setErrorMessage(
          "NERO took too long to respond. Please try again."
        );
      } else {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        );
      }

      // #endregion
    } finally {
      window.clearTimeout(timeout);

      if (requestRef.current === controller) {
        requestRef.current = null;
      }

      loadingRef.current = false;
      setIsLoading(false);
    }
  };

  // #endregion

  // ==========================================
  // #region FORM SUBMISSION
  // ==========================================

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void sendMessage(input);
  };

  // #endregion

  // ==========================================
  // #region KEYBOARD SUBMISSION
  // ==========================================

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      void sendMessage(input);
    }
  };

  // #endregion

  return (
    <div
      data-scroll-nav-ignore
      className="
        fixed bottom-5 right-4 z-[9999]
        sm:bottom-6 sm:right-6
      "
    >
      {/* =====================================
          #region CHAT WINDOW
          ===================================== */}

      {isOpen && (
        <section
          role="region"
          aria-label="NERO AI Chatbot"
          

className="
  fixed bottom-20 left-3 right-3
  z-[9999]
  flex h-[70dvh] max-h-[560px]
  flex-col overflow-hidden
  rounded-[24px]
  border border-cyan-300/35
  bg-[#090F27]/95 text-white
  shadow-[0_0_55px_rgba(34,211,238,0.18)]
  backdrop-blur-xl

  sm:bottom-24
  sm:left-auto
  sm:right-6
  sm:h-[min(720px,calc(100dvh-120px))]
  sm:max-h-none
  sm:w-[min(580px,calc(100vw-48px))]
"

        >
          {/* #region HEADER */}

          <header
            className="
              flex shrink-0 items-center gap-3
              border-b border-white/10
              bg-gradient-to-r
              from-[#182B55] to-[#392265]
              px-4 py-3
            "
          >
            {/* Rocket logo */}

            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-full
                border border-cyan-300/50
                bg-[#121C47]
                shadow-[0_0_18px_rgba(34,211,238,0.2)]
              "
            >
              <RocketIcon size={34} />
            </div>

            {/* Chatbot name */}

            <div className="min-w-0 flex-1">
              <h2 className="font-bold tracking-wide text-white">
                NERO
              </h2>

              <p className="text-[11px] text-cyan-200">
                Your AI Guide Through My Universe
              </p>
            </div>

            {/* Close button */}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close NERO chatbot"
              className="
                rounded-lg p-2
                text-slate-300
                transition-colors
                hover:bg-white/10
                hover:text-white
              "
            >
              ✕
            </button>
          </header>

          {/* #endregion */}

          {/* =====================================
              #region CHAT MESSAGES
              ===================================== */}

          <div
            ref={chatScrollRef}
            role="log"
            aria-label="Chat messages"
            aria-live="polite"
            className="
              min-h-0 flex-1
              space-y-4
              overflow-y-auto
              overscroll-contain
              px-4 py-5
            "
          >
            {/* #region MESSAGE BUBBLES */}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[92%]
                    whitespace-pre-wrap
                    break-words
                    rounded-2xl
                    px-4 py-3
                    text-base leading-7
                    ${
                      message.role === "user"
                        ? `
                          rounded-br-sm
                          border border-cyan-300/30
                          bg-cyan-500/20
                          text-white
                        `
                        : `
                          rounded-bl-sm
                          border border-violet-300/20
                          bg-[#182746]
                          text-slate-100
                        `
                    }
                  `}
                >
                  
{message.role === "assistant" ? (
  <ReactMarkdown
    components={{
      p: ({ children }) => (
        <p className="mb-3 last:mb-0">
          {children}
        </p>
      ),
      strong: ({ children }) => (
        <strong className="font-bold text-cyan-200">
          {children}
        </strong>
      ),
      ul: ({ children }) => (
        <ul className="my-3 list-disc space-y-2 pl-5">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="my-3 list-decimal space-y-2 pl-5">
          {children}
        </ol>
      ),
      a: ({ href, children }) => {
        if (!href) return <>{children}</>;

        const isSafeLink =
          href.startsWith("/") && !href.startsWith("//") ||
          href.startsWith("https://") ||
          href.startsWith("http://");

        if (!isSafeLink) {
          return <>{children}</>;
        }

        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cyan-300 underline underline-offset-4 hover:text-cyan-100"
          >
            {children}
          </a>
        );
      },
    }}
  >
    {message.text}
  </ReactMarkdown>
) : (
  message.text
)}

                </div>
              </div>
            ))}

            {/* #endregion */}

            {/* #region SUGGESTED QUESTIONS */}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400">
                  Try asking:
                </p>

                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                      void sendMessage(question)
                    }
                    className="
                      block w-full
                      rounded-xl
                      border border-cyan-300/20
                      bg-cyan-300/5
                      px-3 py-2.5
                      text-left
                      text-xs leading-5
                      text-cyan-100
                      transition-colors
                      hover:border-cyan-300/50
                      hover:bg-cyan-300/10
                      disabled:opacity-50
                    "
                  >
                    ✦ {question}
                  </button>
                ))}
              </div>
            )}

            {/* #endregion */}

            {/* #region LOADING INDICATOR */}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="
                    rounded-2xl
                    border border-violet-300/20
                    bg-[#182746]
                    px-4 py-3
                    text-sm text-violet-200
                  "
                >
                  <span className="animate-pulse">
                    🚀 NERO is thinking...
                  </span>
                </div>
              </div>
            )}

            {/* #endregion */}

            {/* #region ERROR MESSAGE */}

            {errorMessage && (
              <div
                role="alert"
                className="
                  rounded-xl
                  border border-rose-300/30
                  bg-rose-400/10
                  p-3
                  text-xs leading-5
                  text-rose-200
                "
              >
                {errorMessage}
              </div>
            )}

            {/* #endregion */}
          </div>

          {/* #endregion */}

          {/* =====================================
              #region MESSAGE INPUT
              ===================================== */}

          <form
            onSubmit={handleSubmit}
            className="
              shrink-0
              border-t border-white/10
              bg-[#0C1731]
              p-3
            "
          >
            <div className="flex items-end gap-2">
              {/* #region TEXTAREA */}

              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                onKeyDown={handleInputKeyDown}
                rows={2}
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={isLoading}
                aria-label="Message NERO"
                placeholder="Ask NERO anything..."
                className="
                  min-h-[46px]
                  max-h-28
                  min-w-0
                  flex-1
                  resize-none
                  rounded-xl
                  border border-white/15
                  bg-white/5
                  px-3 py-3
                  text-base
                  text-white
                  outline-none
                  placeholder:text-slate-400
                  focus:border-cyan-300/60
                  disabled:opacity-50
                "
              />

              {/* #endregion */}

              {/* #region SEND BUTTON */}

              <button
                type="submit"
                disabled={
                  !input.trim() ||
                  isLoading
                }
                aria-label="Send message"
                className="
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-cyan-400
                  text-lg font-bold
                  text-[#07152A]
                  transition-colors
                  hover:bg-cyan-300
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                ➤
              </button>

              {/* #endregion */}
            </div>

            {/* #region FOOTER LINKS */}

            <div
              className="
                mt-3
                flex items-center
                justify-between
                gap-2
              "
            >
              <Link
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="
                  text-[11px]
                  text-cyan-300
                  hover:underline
                "
              >
                Explore Projects ↗
              </Link>

              <span
                className="
                  text-[10px]
                  text-slate-400
                "
              >
                AI responses may contain errors
              </span>
            </div>

            <p
              className="
                mt-2
                text-center
                text-[10px]
                text-slate-500
              "
            >
              Powered by Gemini
            </p>

            {/* #endregion */}
          </form>

          {/* #endregion */}
        </section>
      )}

      {/* #endregion */}

      {/* =====================================
          #region FLOATING ROCKET BUTTON
          ===================================== */}

{/* =====================================
    #region FLOATING NERO CHATBOT LAUNCHER
    ===================================== */}

<div className="flex items-center gap-3">

  {/* #region CHATBOT LABEL */}

  {!isOpen && (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className="
        group/label relative
        rounded-2xl border border-cyan-300/40
        bg-[#101B3B]/90
        px-4 py-3 text-left
        shadow-[0_0_22px_rgba(34,211,238,0.12)]
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-cyan-300/70
        hover:bg-[#17264C]
        focus-visible:outline-2
        focus-visible:outline-cyan-300
        motion-reduce:transform-none
      "
      aria-label="Chat with NERO AI assistant"
    >
      <div className="flex items-center gap-2">

        {/* Chat symbol */}

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-cyan-300"
        >
          <path
            d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-7.5A7.5 7.5 0 1 1 20 11.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M8 11.5h8M8 14.5h5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>

        <span className="whitespace-nowrap text-sm font-bold text-white">
          Chat with NERO AI
        </span>
      </div>

      <p className="mt-1 text-[11px] text-slate-300">
        Ask me about this portfolio!
      </p>
    </button>
  )}

  {/* #endregion */}

  {/* #region COLORFUL ROCKET BUTTON */}

  <button
    type="button"
    onClick={() => setIsOpen((previous) => !previous)}
    aria-label={
      isOpen
        ? "Close NERO AI assistant"
        : "Open NERO AI chatbot"
    }
    aria-expanded={isOpen}
    className="
      group relative
      flex h-[68px] w-[68px]
      shrink-0 items-center justify-center
      rounded-full
      border border-cyan-300/60
      bg-gradient-to-br
      from-[#17416D]
      via-[#33246B]
      to-[#531F7A]
      shadow-[0_0_25px_rgba(34,211,238,0.35)]
      transition-all duration-300
      hover:scale-110
      hover:shadow-[0_0_40px_rgba(34,211,238,0.55)]
      focus-visible:outline-2
      focus-visible:outline-offset-4
      focus-visible:outline-cyan-300
      motion-reduce:transform-none
    "
  >
    <span
      className="
        pointer-events-none absolute inset-1
        rounded-full border border-white/10
      "
    />

    {isOpen ? (
      <span className="relative text-2xl text-white">
        ✕
      </span>
    ) : (
      <span
        className="
          relative
          transition-transform duration-300
          group-hover:-translate-y-1
          group-hover:translate-x-1
          motion-reduce:transform-none
        "
      >
        <RocketIcon size={48} />
      </span>
    )}
  </button>

  {/* #endregion */}

</div>

{/* #endregion */}

      {/* #endregion */}
    </div>
  );
}

// #endregion
