"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit2, Trash2, Phone, Mail } from "lucide-react"

const LeadManagement = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@email.com",
      phone: "+91-9876543210",
      property: "Apartment 3BHK",
      status: "Hot Lead",
      stage: "Negotiation",
      assignedTo: "Sarah Johnson",
      value: "$45,000",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@email.com",
      phone: "+91-9876543211",
      property: "Villa Plot",
      status: "Warm Lead",
      stage: "Site Visit",
      assignedTo: "Mike Chen",
      value: "$120,000",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@email.com",
      phone: "+91-9876543212",
      property: "Commercial Space",
      status: "Cold Lead",
      stage: "Initial Contact",
      assignedTo: "Alex Kumar",
      value: "$85,000",
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha@email.com",
      phone: "+91-9876543213",
      property: "Penthouse",
      status: "Hot Lead",
      stage: "Proposal",
      assignedTo: "Sarah Johnson",
      value: "$250,000",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const statusColors = {
    "Hot Lead": "bg-red-100 text-red-800",
    "Warm Lead": "bg-yellow-100 text-yellow-800",
    "Cold Lead": "bg-blue-100 text-blue-800",
  }

  const stageColors = {
    "Initial Contact": "bg-gray-100 text-gray-800",
    "Site Visit": "bg-blue-100 text-blue-800",
    Negotiation: "bg-purple-100 text-purple-800",
    Proposal: "bg-green-100 text-green-800",
  }

  const filteredLeads = leads.filter(
    (lead) =>
      (filterStatus === "All" || lead.status === filterStatus) &&
      (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Lead Management</h2>
          <p className="text-muted-foreground">Manage and track all your leads</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Lead
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads by name or email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {["All", "Hot Lead", "Warm Lead", "Cold Lead"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
          <CardDescription>Track and manage your sales pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold">Property</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Stage</th>
                  <th className="text-left py-3 px-4 font-semibold">Assigned To</th>
                  <th className="text-left py-3 px-4 font-semibold">Value</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{lead.name}</td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs">{lead.property}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={stageColors[lead.stage]}>{lead.stage}</Badge>
                    </td>
                    <td className="py-3 px-4 text-xs">{lead.assignedTo}</td>
                    <td className="py-3 px-4 font-semibold">{lead.value}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LeadManagement
