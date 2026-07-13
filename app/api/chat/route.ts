import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Normalize messages for Vercel AI v4 compatibility
  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.content || (m.parts && m.parts.map((p: any) => p.text).join('')) || ""
  }))

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  })

  try {
    const result = streamText({
      model: google("gemini-flash-latest"),
      system: `Tu es Khadija IA, l'assistante virtuelle de la Clinique Khadija.
RÈGLE D'OR : Sois EXTRÊMEMENT CONCIS et NATUREL. Ne te présente JAMAIS avec de longues phrases robotiques comme "Je suis Khadija IA, l'assistante virtuelle...". Si on te dit "salut", réponds juste "Bonjour ! Comment puis-je vous aider ?".
Ta mission est de renseigner les patients de manière très courte et directe. Ne fais pas de longues listes à moins qu'on te le demande explicitement.
Si le patient fait des fautes de frappe ou utilise des mots courts (ex: "cal" pour cardiologue ou calendrier), devine le sens et donne directement la réponse utile sans formules de politesse excessives.
Tu dois rester STRICTEMENT dans le cadre de la clinique et de la santé.
Informations clés :
- Adresse : Cité Inter-Promo, ZAC Mbao, Dakar (près du commissariat de police).
- Téléphone : +221 77 469 81 81
- Horaires : Ouvert 24h/24 et 7j/7.
- Spécialités : Médecin généraliste, Gynécologue obstétricien, Chirurgien-dentiste, Cardiologue.
- Paiement : Espèces, Chèque, Mobile Money.
- Réservation : Lien -> /reservation`,
      messages: coreMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
