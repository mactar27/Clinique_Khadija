import { createGroq } from "@ai-sdk/groq"
import { convertToModelMessages, streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const body = await req.json()
  const { messages } = body

  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY
  })

  const formattedMessages = (messages || []).map((m: any) => ({
    ...m,
    parts: m.parts ?? [{ type: "text", text: m.content || "" }],
  }))

  try {
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      system: `Tu es Khadija, l'assistante virtuelle chaleureuse et humaine de la Clinique Khadija.
RÈGLE D'OR : Sois naturelle, accueillante et empathique, tout en restant concise et professionnelle. 
Ne réponds pas de façon robotique. Par exemple, si on te demande "tu es qui", réponds avec douceur et simplicité (ex: "Je suis Khadija, là pour vous guider et répondre à vos questions sur la clinique avec plaisir !").
Ta mission est de renseigner les patients avec bienveillance. Aide-les directement et simplement.
Si le patient fait des fautes de frappe ou utilise des expressions courtes, adapte-toi avec souplesse et réponds chaleureusement.
Informations clés :
- Adresse : Cité Inter-Promo, ZAC Mbao, Dakar (près du commissariat de police).
- Téléphone : +221 77 469 81 81
- Horaires : Ouvert 24h/24 et 7j/7.
- Spécialités : Médecin généraliste, Gynécologue obstétricien, Chirurgien-dentiste, Cardiologue.
- Paiement : Espèces, Chèque, Mobile Money.
- Réservation : Lien -> /reservation`,
      messages: await convertToModelMessages(formattedMessages),
    })

    return result.toTextStreamResponse()
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
