"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Eye, Send } from "lucide-react"

const PaymentModule = () => {
  const [invoices] = useState([
    {
      id: "INV-001",
      client: "Rajesh Kumar",
      project: "Sunrise Towers",
      amount: "$45,000",
      dueDate: "2024-11-30",
      status: "Paid",
      date: "2024-10-15",
      description: "Unit 501 - Down Payment",
    },
    {
      id: "INV-002",
      client: "Priya Singh",
      project: "Tech Park Plaza",
      amount: "$120,000",
      dueDate: "2024-12-15",
      status: "Pending",
      date: "2024-10-20",
      description: "Commercial Space - First Installment",
    },
    {
      id: "INV-003",
      client: "Amit Patel",
      project: "Green Valley Villas",
      amount: "$85,000",
      dueDate: "2024-11-10",
      status: "Overdue",
      date: "2024-09-15",
      description: "Villa Plot - Final Payment",
    },
    {
      id: "INV-004",
      client: "Neha Gupta",
      project: "Sunrise Towers",
      amount: "$250,000",
      dueDate: "2025-01-31",
      status: "Pending",
      date: "2024-10-25",
      description: "Penthouse - Full Payment",
    },
  ])

  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Overdue: "bg-red-100 text-red-800",
  }

  const totalRevenue = invoices.reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace(/[^0-9]/g, "")), 0)
  const paidAmount = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace(/[^0-9]/g, "")), 0)
  const pendingAmount = invoices
    .filter((inv) => inv.status === "Pending" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace(/[^0-9]/g, "")), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Payments & Invoices</h2>
          <p className="text-muted-foreground">Manage payments and generate invoices</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">All invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${(paidAmount / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter((inv) => inv.status === "Paid").length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${(pendingAmount / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter((inv) => inv.status !== "Paid").length} invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>Track and manage all payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Client</th>
                  <th className="text-left py-3 px-4 font-semibold">Project</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Due Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{invoice.id}</td>
                    <td className="py-3 px-4">{invoice.client}</td>
                    <td className="py-3 px-4 text-xs">{invoice.project}</td>
                    <td className="py-3 px-4 font-semibold">{invoice.amount}</td>
                    <td className="py-3 px-4 text-xs">{invoice.dueDate}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[invoice.status]}>{invoice.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" title="View">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Download">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Send Reminder">
                          <Send className="w-4 h-4" />
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

export default PaymentModule
