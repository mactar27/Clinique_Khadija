import Link from "next/link"
import { Calendar, LayoutDashboard, FileText, Settings, Stethoscope, Users } from "lucide-react"
import { logoutAdmin } from "@/app/actions/auth"
import { AdminSidebar } from "@/components/admin-sidebar"

export const dynamic = "force-dynamic"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-white sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-[#1D3F75]">
            <Stethoscope className="size-5" />
            <span>Admin Khadija</span>
          </Link>
        </div>
        <AdminSidebar />
        
        <div className="p-4 border-t">
          <form action={logoutAdmin}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 sm:hidden">
          <span className="font-bold text-[#1D3F75]">Admin Khadija</span>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
