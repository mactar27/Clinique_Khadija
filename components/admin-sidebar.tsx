"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, LayoutDashboard, FileText, Settings, Users } from "lucide-react"

const navItems = [
  { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { name: "Rendez-vous", href: "/admin/rendez-vous", icon: Calendar },
  { name: "Personnel", href: "/admin/personnel", icon: Users },
  { name: "Résultats", href: "/admin/resultats", icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1 p-4">
      {navItems.map((item) => {
        const isActive = item.href === "/admin" 
          ? pathname === "/admin" 
          : pathname.startsWith(item.href)
          
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              isActive
                ? "bg-[#1D3F75]/10 text-[#1D3F75]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="size-4" />
            {item.name}
          </Link>
        )
      })}
      <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
        <Settings className="size-4" />
        Paramètres
      </Link>
    </nav>
  )
}
