"use client"

import { useState } from "react"
import { ChevronDown, ShieldPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mainInsurances } from "@/lib/clinic-data"
import { useLanguage } from "@/components/language-provider"

export function Insurances() {
  const { t } = useLanguage()
  const [showAll, setShowAll] = useState(false)

  // Show only 12 by default
  const visibleIpm = showAll ? mainInsurances : mainInsurances.slice(0, 12)

  return (
    <section id="assurances" className="scroll-mt-20 bg-[#fcfdfc] py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            {t("insurancesTitle")}
          </h2>
        </div>

        <div className="mt-8">
          <ul className="flex flex-wrap gap-4">
            {visibleIpm.map((name) => (
              <li
                key={name}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#1D3F75] transition-colors hover:bg-green-100"
              >
                <ShieldPlus className="size-4" aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
          
          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowAll((v) => !v)} 
              className="gap-2 rounded-full px-6 py-5 border-border/80 hover:bg-secondary text-foreground font-semibold"
            >
              Voir toutes les assurances
              <ChevronDown
                className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
