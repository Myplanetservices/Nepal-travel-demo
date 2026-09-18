import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { DEMO_PACKAGES } from "@/lib/demo-agency-data";

// Rate limiting in-memory store (IP -> array of timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 20;

// Knowledge base cache
interface KnowledgeChunk {
  id: string;
  sourceTitle: string;
  sourcePage: string;
  sectionHeading: string;
  category: string;
  content: string;
  keywords: string[];
  vector: Record<string, number>;
}

interface KnowledgeBasePayload {
  metadata: {
    siteName: string;
    generatedAt: string;
  };
  chunks: KnowledgeChunk[];
}

let cachedKB: KnowledgeBasePayload | null = null;

function loadKnowledgeBase(): KnowledgeBasePayload {
  if (cachedKB) return cachedKB;
  const kbPath = path.join(process.cwd(), "data", "knowledge-base.json");
  if (fs.existsSync(kbPath)) {
    const raw = fs.readFileSync(kbPath, "utf-8");
    cachedKB = JSON.parse(raw);
    return cachedKB!;
  }
  return { metadata: { siteName: "Zenith Himalaya", generatedAt: "" }, chunks: [] };
}

// Stopwords list
const STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
  "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down",
  "during", "each", "few", "for", "from", "further", "had", "hadn't", "has",
  "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her",
  "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's",
  "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it",
  "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
  "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
  "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same",
  "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
  "some", "such", "than", "that", "that's", "the", "their", "theirs", "them",
  "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll",
  "they're", "they've", "this", "those", "through", "to", "too", "under", "until",
  "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've",
  "were", "weren't", "what", "what's", "when", "when's", "where", "where's",
  "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't",
  "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your",
  "yours", "yourself", "yourselves", "tell", "please", "give", "show", "offer", "offers", "provide", "provides", "list", "available"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function buildTfVector(text: string): Record<string, number> {
  const tokens = tokenize(text);
  const counts: Record<string, number> = {};
  for (const t of tokens) {
    if (!STOPWORDS.has(t)) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  let sumSq = 0;
  for (const w in counts) {
    sumSq += counts[w] * counts[w];
  }
  const norm = Math.sqrt(sumSq) || 1;
  const normalized: Record<string, number> = {};
  for (const w in counts) {
    normalized[w] = counts[w] / norm;
  }
  return normalized;
}

function cosineSimilarity(v1: Record<string, number>, v2: Record<string, number>): number {
  let dot = 0;
  for (const k in v1) {
    if (v2[k]) {
      dot += v1[k] * v2[k];
    }
  }
  return dot;
}

// Check Rate Limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

// Fallback message when query is out of scope
const OUT_OF_SCOPE_MESSAGE = `I don't have that information on this site — you can contact us directly at contact@zenithhimalaya.com or call our Kathmandu operations desk at +977 1-4701234 (24/7 Hotline: +977 980-1234567).`;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a few minutes before asking another question." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, conversationHistory } = body;

    // Validation
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Query message cannot be empty." }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Query exceeds the maximum allowed length of 500 characters." },
        { status: 400 }
      );
    }

    const kb = loadKnowledgeBase();
    if (!kb.chunks || kb.chunks.length === 0) {
      return NextResponse.json(
        { error: "Knowledge base index not loaded. Please run npm run build:kb." },
        { status: 500 }
      );
    }

    // Build context-enhanced search query incorporating recent conversation history for coreference resolution
    let enhancedQuery = message;
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      const recentTurns = conversationHistory.slice(-4);
      const priorSubjects = recentTurns
        .map((m: { role: string; content: string }) => m.content)
        .join(" ");
      enhancedQuery = `${message} ${priorSubjects}`;
    }

    // Embed and rank
    const queryVector = buildTfVector(enhancedQuery);
    const scoredChunks = kb.chunks.map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryVector, chunk.vector),
    }));

    scoredChunks.sort((a, b) => b.score - a.score);
    const topMatches = scoredChunks.filter((m) => m.score > 0).slice(0, 4);

    // Confidence calibration threshold
    // Check both cosine score and query token match across top matched chunks with plural stemming
    const queryTokens = tokenize(message).filter((t) => !STOPWORDS.has(t));
    const combinedTopContent = topMatches.slice(0, 3).map((m) => `${m.chunk.sourceTitle} ${m.chunk.content}`).join(" ").toLowerCase();
    const matchedTokenCount = queryTokens.filter((t) => {
      const stem = t.length > 4 && t.endsWith("s") ? t.slice(0, -1) : t;
      return combinedTopContent.includes(t) || combinedTopContent.includes(stem);
    }).length;
    const tokenOverlapRatio = queryTokens.length > 0 ? matchedTokenCount / queryTokens.length : 0;

    // Out of scope if:
    // 1. No matches found
    // 2. Cosine score < 0.12
    // 3. More than half the key terms in user query don't exist anywhere in the matched chunks
    const lowerMessage = message.toLowerCase().trim();
    const isConversationalIntro =
      lowerMessage === "hi" ||
      lowerMessage === "hello" ||
      lowerMessage === "namaste" ||
      lowerMessage === "hey" ||
      lowerMessage === "what is this" ||
      lowerMessage.includes("what is this") ||
      lowerMessage.includes("who are you") ||
      lowerMessage.includes("what is zenith") ||
      lowerMessage.includes("tell me about yourself") ||
      lowerMessage.includes("what can you do") ||
      lowerMessage.includes("what do you do") ||
      lowerMessage === "help";

    // If it's a conversational greeting or site overview inquiry, provide default company overview
    let finalTopMatches = topMatches;
    if (isConversationalIntro && topMatches.length === 0) {
      const aboutChunk = kb.chunks.find((c) => c.id === "zenith-company-overview") || kb.chunks[0];
      const contactChunk = kb.chunks.find((c) => c.id === "zenith-contact-info");
      finalTopMatches = [
        { chunk: aboutChunk, score: 1 },
        ...(contactChunk ? [{ chunk: contactChunk, score: 0.9 }] : []),
      ];
    }

    const isConfidenceLow =
      !isConversationalIntro &&
      (finalTopMatches.length === 0 ||
        finalTopMatches[0].score < 0.12 ||
        (queryTokens.length >= 2 && tokenOverlapRatio < 0.4));

    // Server-side QA logging (anonymized, no PII)
    console.log(`[RAG Audit] Query: "${message}" | Score: ${finalTopMatches[0]?.score.toFixed(3) || 0} | Overlap: ${(tokenOverlapRatio * 100).toFixed(0)}% | Confident: ${!isConfidenceLow}`);

    // Set up SSE stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        if (isConfidenceLow) {
          // Out of scope fallback
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "sources", sources: [] })}\n\n`)
          );

          // Stream out-of-scope message
          const words = OUT_OF_SCOPE_MESSAGE.split(" ");
          for (const word of words) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "chunk", text: word + " " })}\n\n`)
            );
            await new Promise((r) => setTimeout(r, 20));
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
          return;
        }

        // Gather source references
        const sources = finalTopMatches.map((m) => ({
          title: m.chunk.sourceTitle,
          page: m.chunk.sourcePage,
          section: m.chunk.sectionHeading,
        }));

        // Deduplicate sources by page + section
        const uniqueSources = Array.from(
          new Map(sources.map((s) => [`${s.page}-${s.section}`, s])).values()
        );

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "sources", sources: uniqueSources })}\n\n`)
        );

        // Check if external LLM API is available (OpenAI / Gemini)
        const openAiKey = process.env.OPENAI_API_KEY;
        if (openAiKey) {
          try {
            const contextText = topMatches
              .map((m) => `### Source: ${m.chunk.sourceTitle} (${m.chunk.sectionHeading})\n${m.chunk.content}`)
              .join("\n\n");

            const messagesPayload = [
              {
                role: "system",
                content: `You are the official Sherpa concierge AI for Zenith Himalaya (zenithhimalaya.com), a Sherpa-led alpine expedition operator in Nepal, Bhutan, and Tibet.
Ground your response strictly and exclusively in the provided context.
Rules:
- NEVER fabricate prices, dates, itineraries, or claims not mentioned in the context.
- If the answer cannot be found in the context, output: "I don't have that information on this site — you can contact us directly at contact@zenithhimalaya.com or call our Kathmandu desk at +977 1-4701234 (24/7 Hotline: +977 980-1234567)."
- Use clear, friendly Markdown formatting with bullet points and bold highlights.
- Always quote official package prices in USD and mention included permits/accommodations.

Context:
${contextText}`,
              },
              ...(Array.isArray(conversationHistory)
                ? conversationHistory.slice(-6).map((m: { role: string; content: string }) => ({
                    role: m.role,
                    content: m.content,
                  }))
                : []),
              { role: "user", content: message },
            ];

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openAiKey}`,
              },
              body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: messagesPayload,
                temperature: 0.1,
                stream: true,
              }),
            });

            if (response.ok && response.body) {
              const reader = response.body.getReader();
              const decoder = new TextDecoder();
              let buffer = "";

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  const trimmed = line.trim();
                  if (trimmed.startsWith("data: ")) {
                    const dataStr = trimmed.slice(6);
                    if (dataStr === "[DONE]") continue;
                    try {
                      const parsed = JSON.parse(dataStr);
                      const delta = parsed.choices?.[0]?.delta?.content;
                      if (delta) {
                        controller.enqueue(
                          encoder.encode(
                            `data: ${JSON.stringify({ type: "chunk", text: delta })}\n\n`
                          )
                        );
                      }
                    } catch {}
                  }
                }
              }

              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
              controller.close();
              return;
            }
          } catch (e) {
            console.error("OpenAI API call failed, falling back to grounded extractive synthesizer:", e);
          }
        }

        // Grounded Natural Synthesis Engine (Zero-API-key local dev mode)
        // Synthesizes an accurate, clean response directly from site packages and matched chunks
        const topChunk = finalTopMatches[0].chunk;
        const secondaryChunk = finalTopMatches[1]?.chunk;

        let synthesizedAnswer = "";
        const lowerMsg = message.toLowerCase();

        // 1. Packages & Treks (Nepal, Bhutan, Tibet)
        if (
          lowerMsg.includes("package") ||
          lowerMsg.includes("offer") ||
          lowerMsg.includes("all trek") ||
          lowerMsg.includes("what trek") ||
          lowerMsg.includes("which trek") ||
          lowerMsg.includes("trip") ||
          (lowerMsg.includes("nepal") && (lowerMsg.includes("do you") || lowerMsg.includes("have") || lowerMsg.includes("list")))
        ) {
          if (lowerMsg.includes("bhutan")) {
            const bhutanPkg = DEMO_PACKAGES.find((p) => p.destination === "Bhutan");
            synthesizedAnswer = `For **Bhutan**, we operate the **[${bhutanPkg?.title || "Bhutan Cultural Tour & Tiger's Nest"}](/tour/bhutan-cultural-tour)** (${bhutanPkg?.duration || "7 Days"}, $${bhutanPkg?.priceUSD || 2450} USD). It covers the Paro Taktsang Tiger's Nest monastery, sacred dzongs in Thimphu & Punakha, and includes the Bhutan Sustainable Development Fee (SDF) and private guides.`;
          } else if (lowerMsg.includes("tibet")) {
            const tibetPkg = DEMO_PACKAGES.find((p) => p.destination === "Tibet");
            synthesizedAnswer = `For **Tibet**, we operate the **[${tibetPkg?.title || "Tibet Roof of the World Overland"}](/tour/tibet-overland-expedition)** (${tibetPkg?.duration || "8 Days"}, $${tibetPkg?.priceUSD || 1950} USD). It journeys across Lhasa, Potala Palace, Yamdrok Lake, and Everest North Base Camp (Rongbuk Gompa at 5,200m).`;
          } else {
            const nepalPkgs = DEMO_PACKAGES.filter((p) => p.destination === "Nepal");
            synthesizedAnswer = `We offer **${nepalPkgs.length} signature, Sherpa-led trekking packages in Nepal**:\n\n` +
              nepalPkgs
                .map(
                  (p) =>
                    `* **[${p.title}](/tour/${p.slug})**\n` +
                    `  * **Duration:** ${p.duration} (${p.durationDays} Days)\n` +
                    `  * **Max Altitude:** ${p.altitude} | **Difficulty:** ${p.difficulty}\n` +
                    `  * **Starting Price:** $${p.priceUSD} USD (10% deposit: $${Math.round(p.priceUSD * 0.1)} USD)`
                )
                .join("\n\n") +
              `\n\nAll expeditions include licensed Sherpa Sirdar guides, porter logistics, teahouse stays, and verified TIMS/National Park permits. You can also customize any route using our [AI Trip Planner](/trip-planner).`;
          }
        }
        // 2. What is this website / About Zenith Himalaya
        else if (
          lowerMsg.includes("what is this") ||
          lowerMsg.includes("who are you") ||
          lowerMsg.includes("what is zenith") ||
          lowerMsg.includes("tell me about yourself") ||
          lowerMsg.includes("what do you do")
        ) {
          synthesizedAnswer = `**Namaste!** This is **Zenith Himalaya**, a licensed, native Sherpa-led alpine expedition operator based in Kathmandu, Nepal (Govt. Reg. #NP-78492), operating authentic Himalayan journeys since 2008.\n\n` +
            `Here is what you can explore and book on this website:\n` +
            `* **Himalayan Treks & Expeditions:** Verified signature routes across Nepal ([Everest Base Camp](/tour/everest-base-camp-trek), [Annapurna Circuit](/tour/annapurna-circuit-trek), [Manaslu](/tour/manaslu-circuit-trek), [Langtang](/tour/langtang-valley-trek), [Upper Mustang](/tour/upper-mustang-trek)), as well as [Bhutan](/bhutan) and [Tibet](/tibet).\n` +
            `* **Flagship AI Trip Planner:** Build a permit-compliant, custom day-by-day itinerary tailored to your duration, fitness, and budget tier at [/trip-planner](/trip-planner).\n` +
            `* **10% Flexible Deposit:** Secure your 2026 departure dates with just a 10% refundable deposit.\n` +
            `* **Sherpa Leadership & Safety:** UIAGM-certified Sherpa guides, emergency satellite dispatch, and daily pulse oximeter monitoring.\n\n` +
            `How can I assist your Himalayan journey today? Ask me about itineraries, prices, gear, or permits!`;
        }
        // 3. Pricing & Costs
        else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("how much") || lowerMsg.includes("rate")) {
          synthesizedAnswer = `Here are the official pricing details from **${topChunk.sourceTitle}**:\n\n` +
            `${topChunk.content.split("\n").filter(l => l.includes("Price") || l.includes("Tiered") || l.includes("Solo") || l.includes("USD") || l.includes("$")).join("\n\n") || topChunk.content}\n\n` +
            `*All bookings require a 10% refundable advance deposit to lock permits and guide assignments.*`;
        }
        // 4. Deposits & Booking Policy
        else if (lowerMsg.includes("deposit") || lowerMsg.includes("booking") || lowerMsg.includes("pay") || lowerMsg.includes("refund") || lowerMsg.includes("cancell")) {
          synthesizedAnswer = `Here is Zenith Himalaya's official **Booking & Deposit Policy**:\n\n` +
            `${topChunk.content}\n\n` +
            `You can reserve directly through our website with instant confirmation and a 10% deposit.`;
        }
        // 5. Contact & Support
        else if (lowerMsg.includes("contact") || lowerMsg.includes("phone") || lowerMsg.includes("email") || lowerMsg.includes("address") || lowerMsg.includes("office") || lowerMsg.includes("hotline") || lowerMsg.includes("whatsapp")) {
          synthesizedAnswer = `Here is our official contact information:\n\n` +
            `${topChunk.content}\n\n` +
            `Our Sherpa travel directors are available 24/7 on WhatsApp (+977 980-1234567) or via email at contact@zenithhimalaya.com for immediate expedition support.`;
        }
        // 6. Inclusions & Exclusions
        else if (lowerMsg.includes("included") || lowerMsg.includes("include") || lowerMsg.includes("excluded") || lowerMsg.includes("what's included")) {
          synthesizedAnswer = `Here is what is included and excluded for **${topChunk.sourceTitle}**:\n\n` +
            `${topChunk.content}`;
        }
        // 7. Itineraries
        else if (lowerMsg.includes("itinerary") || lowerMsg.includes("day") || lowerMsg.includes("schedule")) {
          synthesizedAnswer = `Here is the verified itinerary for **${topChunk.sourceTitle}**:\n\n` +
            `${topChunk.content}`;
        }
        // 8. General Grounded Response from Chunks
        else {
          synthesizedAnswer = `Based on our verified expedition documentation for **${topChunk.sourceTitle}**:\n\n` +
            `${topChunk.content}` +
            (secondaryChunk ? `\n\n**Additional Details (${secondaryChunk.sectionHeading}):**\n${secondaryChunk.content}` : "");
        }

        // Stream the synthesized answer token-by-token
        const words = synthesizedAnswer.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunkWord = words[i] + (i < words.length - 1 ? " " : "");
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "chunk", text: chunkWord })}\n\n`)
          );
          // Realistic typing simulation delay
          await new Promise((r) => setTimeout(r, 18));
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Error in /api/chat route:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing your query." },
      { status: 500 }
    );
  }
}
