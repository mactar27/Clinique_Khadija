"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarPlus, MapPin, Stethoscope, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative w-full h-[600px] lg:h-[700px] xl:h-[800px] flex items-center mt-1">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/clinic-building.png"
          alt="Bâtiment de la Clinique Khadija"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1C3A]/90 via-[#0A1C3A]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white">
            <Stethoscope className="size-4 text-blue-400" aria-hidden="true" />
            Clinique médicale à la ZAC Mbao
          </span>
          
          <h1 className="text-balance font-heading text-4xl sm:text-5xl font-extrabold leading-[1.1] text-white md:text-6xl lg:text-[4.5rem]">
            Votre santé, entre de <span className="text-[#DE3B36]">bonnes mains</span>
          </h1>
          
          <p className="max-w-lg text-pretty text-lg leading-relaxed text-slate-200">
            La Clinique Khadija, située à la ZAC Mbao, offre une large gamme de services médicaux et de spécialistes pour toute la famille.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Button render={<Link href="/reservation" />} size="lg" className="gap-2 bg-[#1D3F75] text-white hover:bg-[#112A54] rounded-full px-6 py-6 text-base border border-[#1D3F75]">
              <CalendarPlus className="size-5" aria-hidden="true" />
              Réserver en ligne
            </Button>
            <Button render={<Link href="/#specialites" />} size="lg" variant="outline" className="gap-2 rounded-full bg-transparent text-white border-white hover:bg-white/10 px-6 py-6 text-base">
              Voir nos spécialités
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
          
          <div className="mt-4 inline-flex items-center gap-3 w-fit max-w-full text-slate-200 text-sm">
            <MapPin className="size-5 shrink-0 text-[#DE3B36]" aria-hidden="true" />
            <span className="truncate whitespace-normal leading-relaxed">Cité Inter-Promo, ZAC Mbao, Dakar</span>
          </div>
        </div>
      </div>
    </section>
  )
}
