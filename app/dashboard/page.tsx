"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  CheckSquare,
  MessageSquare,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Dashboard from "@/components/dashboard"
import LeadManagementDB from "@/components/lead-management-db"
import ProjectManagement from "@/components/project-management"
import PaymentModule from "@/components/payment-module"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import AdminPanel from "@/components/admin-panel"
import TaskSiteVisit from "@/components/task-site-visit"
import AutomationModule from "@/components/automation-module"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "leads", label: "Lead Management", icon: Users },
    { id: "projects", label: "Projects & Properties", icon: Building2 },
    { id: "tasks", label: "Tasks & Site Visits", icon: CheckSquare },
    { id: "payments", label: "Payments & Invoices", icon: FileText },
    { id: "automation", label: "Automation", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "admin", label: "Admin Panel", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!sidebarOpen && "hidden"}`}>
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground">nexCRM</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <div className={`${!sidebarOpen && "hidden"} text-xs text-sidebar-foreground`}>
            <p className="font-semibold">{user?.email?.split("@")[0]}</p>
            <p className="text-sidebar-foreground/70">Administrator</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-sidebar-foreground bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">nexCRM</h1>
            <p className="text-sm text-muted-foreground">Real Estate & Construction Management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "leads" && <LeadManagementDB />}
          {activeTab === "projects" && <ProjectManagement />}
          {activeTab === "tasks" && <TaskSiteVisit />}
          {activeTab === "payments" && <PaymentModule />}
          {activeTab === "automation" && <AutomationModule />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "admin" && <AdminPanel />}
        </div>
      </div>
    </div>
  )
}
