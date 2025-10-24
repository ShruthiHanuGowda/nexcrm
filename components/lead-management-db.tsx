"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  property_interest: string
  budget: number
  status: string
  source: string
  notes: string
  created_at: string
}

export default function LeadManagementDB() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property_interest: "",
    budget: "",
    status: "new",
    source: "website",
    notes: "",
  })

  useEffect(() => {
    fetchLeads()
  }, [filterStatus])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const url = filterStatus === "all" ? "/api/leads" : `/api/leads?status=${filterStatus}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setLeads(data)
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          budget: formData.budget ? Number.parseFloat(formData.budget) : null,
        }),
      })
      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          property_interest: "",
          budget: "",
          status: "new",
          source: "website",
          notes: "",
        })
        setShowForm(false)
        fetchLeads()
      }
    } catch (error) {
      console.error("Error adding lead:", error)
    }
  }

  const handleDeleteLead = async (leadId: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        const response = await fetch(`/api/leads/${leadId}`, { method: "DELETE" })
        if (response.ok) {
          fetchLeads()
        }
      } catch (error) {
        console.error("Error deleting lead:", error)
      }
    }
  }

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    qualified: "bg-purple-100 text-purple-800",
    negotiating: "bg-orange-100 text-orange-800",
    converted: "bg-green-100 text-green-800",
    lost: "bg-red-100 text-red-800",
  }

  const sourceColors: Record<string, string> = {
    website: "bg-slate-100 text-slate-800",
    referral: "bg-indigo-100 text-indigo-800",
    advertisement: "bg-pink-100 text-pink-800",
    "cold-call": "bg-cyan-100 text-cyan-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Lead Management</h2>
          <p className="text-muted-foreground">Track and manage your sales leads</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="property_interest">Property Interest</Label>
                  <Input
                    id="property_interest"
                    value={formData.property_interest}
                    onChange={(e) => setFormData({ ...formData, property_interest: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="source">Source</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => setFormData({ ...formData, source: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="advertisement">Advertisement</SelectItem>
                      <SelectItem value="cold-call">Cold Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add Lead</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant={filterStatus === "all" ? "default" : "outline"} onClick={() => setFilterStatus("all")}>
          All
        </Button>
        {["new", "contacted", "qualified", "negotiating", "converted", "lost"].map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? "default" : "outline"}
            onClick={() => setFilterStatus(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold">Budget</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Source</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">
                        No leads found. Add your first lead to get started.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{lead.name}</td>
                        <td className="py-3 px-4 text-xs">{lead.email}</td>
                        <td className="py-3 px-4 text-xs">{lead.phone}</td>
                        <td className="py-3 px-4 text-xs">₹{lead.budget?.toLocaleString() || "N/A"}</td>
                        <td className="py-3 px-4">
                          <Badge className={statusColors[lead.status] || "bg-gray-100 text-gray-800"}>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={sourceColors[lead.source] || "bg-gray-100 text-gray-800"}>
                            {lead.source}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
