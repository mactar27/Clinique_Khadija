"use client"

import Link from "next/link"
import { CalendarPlus, Info, MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/clinic-data"

export function Contact() {
  const mapsQuery = encodeURIComponent("PMPX+6Q Rufisque, Sénégal")

  return (
    <section id="acces" className="scroll-mt-20 bg-[#fcfdfc] py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl font-extrabold text-[#1a1a1a]">Carte et informations d'accès</h2>
          
          <div className="flex items-center justify-center gap-3 mt-4 mb-10">
            <div className="h-px w-8 bg-[#1D3F75]"></div>
            <MapPin className="size-4 text-[#1D3F75]" strokeWidth={2} />
            <div className="h-px w-8 bg-[#1D3F75]"></div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="flex flex-col gap-4">
            {/* Address Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1D3F75]">
                <MapPin className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">Adresse</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Cité Inter-Promo,<br/>
                  ZAC Mbao,<br/>
                  Dakar
                </p>
              </div>
            </div>

            {/* Access Info Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1D3F75]">
                <Info className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">Informations d'accès</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Au pied du pont,<br/>
                  près du commissariat
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-white p-5 shadow-sm">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1D3F75]">
                <Phone className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">Téléphone</h3>
                <a href="tel:+221774698181" className="mt-1 block text-sm text-muted-foreground hover:text-foreground">
                  +221 77 469 81 81
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-white p-5 shadow-sm">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1D3F75]">
                <Clock className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div className="w-full pr-4">
                <h3 className="font-bold text-foreground mb-2">Horaires</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex justify-between"><span>Lundi</span><span className="font-medium text-slate-700">00:00 - 23:45</span></li>
                  <li className="flex justify-between"><span>Mardi</span><span className="font-medium text-slate-700">00:00 - 23:45</span></li>
                  <li className="flex justify-between"><span>Mercredi</span><span className="font-medium text-slate-700">00:00 - 23:45</span></li>
                  <li className="flex justify-between"><span>Jeudi</span><span className="font-medium text-slate-700">00:00 - 23:45</span></li>
                  <li className="flex justify-between"><span>Vendredi</span><span className="font-medium text-slate-700">00:00 - 23:45</span></li>
                  <li className="flex justify-between"><span>Samedi</span><span className="font-medium text-slate-700">00:00 - 23:45</span></li>
                  <li className="flex justify-between"><span>Dimanche</span><span className="font-medium text-slate-700">00:00 - 23:45</span></li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button asChild variant="outline" className="gap-2 rounded-xl py-6 border-border/80 text-foreground font-semibold flex-1 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Ouvrir dans Google Maps
                </a>
              </Button>
              <Button asChild className="gap-2 rounded-xl py-6 bg-[#1D3F75] text-white hover:bg-[#112A54] font-semibold shadow-md flex-1 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <Link href="/reservation">
                  <CalendarPlus className="size-4" aria-hidden="true" />
                  Prendre rendez-vous
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="h-[450px] lg:h-full min-h-[450px] overflow-hidden rounded-3xl shadow-md border border-border/40 transition-all duration-300 hover:shadow-lg">
            <iframe
              title="Carte de la Clinique Khadija"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
