"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Send, Mail, MessageCircle, Clock, CheckCircle2, AlertCircle } from "lucide-react"

const AutomationModule = () => {
  const [templates] = useState([
    {
      id: 1,
      name: "Welcome Message",
      type: "WhatsApp",
      content:
        "Welcome to {company_name}! We're excited to help you find your dream property. How can we assist you today?",
      variables: ["company_name", "client_name"],
      status: "Active",
      usageCount: 245,
    },
    {
      id: 2,
      name: "Site Visit Reminder",
      type: "WhatsApp",
      content:
        "Hi {client_name}, this is a reminder about your site visit on {date} at {time}. Looking forward to seeing you!",
      variables: ["client_name", "date", "time"],
      status: "Active",
      usageCount: 128,
    },
    {
      id: 3,
      name: "Invoice Notification",
      type: "Email",
      content: "Dear {client_name}, your invoice {invoice_id} for {amount} is ready. Please find it attached.",
      variables: ["client_name", "invoice_id", "amount"],
      status: "Active",
      usageCount: 89,
    },
    {
      id: 4,
      name: "Payment Reminder",
      type: "WhatsApp",
      content: "Hi {client_name}, gentle reminder: Payment of {amount} for {property} is due on {due_date}.",
      variables: ["client_name", "amount", "property", "due_date"],
      status: "Active",
      usageCount: 156,
    },
    {
      id: 5,
      name: "Follow-up Message",
      type: "Email",
      content:
        "Hi {client_name}, we wanted to follow up on your interest in {property}. Would you like to schedule a visit?",
      variables: ["client_name", "property"],
      status: "Inactive",
      usageCount: 0,
    },
  ])

  const [campaigns] = useState([
    {
      id: 1,
      name: "New Year Promotion",
      type: "WhatsApp",
      status: "Active",
      recipients: 450,
      sent: 450,
      opened: 380,
      clicked: 125,
      createdDate: "2024-10-20",
      scheduledDate: "2024-10-25",
    },
    {
      id: 2,
      name: "Project Completion Announcement",
      type: "Email",
      status: "Scheduled",
      recipients: 320,
      sent: 0,
      opened: 0,
      clicked: 0,
      createdDate: "2024-10-22",
      scheduledDate: "2024-10-30",
    },
    {
      id: 3,
      name: "Payment Due Reminders",
      type: "WhatsApp",
      status: "Active",
      recipients: 85,
      sent: 85,
      opened: 78,
      clicked: 45,
      createdDate: "2024-10-15",
      scheduledDate: "2024-10-25",
    },
    {
      id: 4,
      name: "Site Visit Confirmations",
      type: "Email",
      status: "Completed",
      recipients: 200,
      sent: 200,
      opened: 195,
      clicked: 180,
      createdDate: "2024-10-10",
      scheduledDate: "2024-10-20",
    },
  ])

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Scheduled: "bg-blue-100 text-blue-800",
    Completed: "bg-gray-100 text-gray-800",
    Inactive: "bg-gray-100 text-gray-800",
  }

  const typeColors = {
    WhatsApp: "bg-green-100 text-green-800",
    Email: "bg-blue-100 text-blue-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">WhatsApp & Email Automation</h2>
          <p className="text-muted-foreground">Manage message templates and automated campaigns</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription className="mt-1">{template.usageCount} times used</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={typeColors[template.type]}>
                        {template.type === "WhatsApp" ? (
                          <MessageCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Mail className="w-3 h-3 mr-1" />
                        )}
                        {template.type}
                      </Badge>
                      <Badge className={statusColors[template.status]}>{template.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-foreground">{template.content}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Variables</p>
                    <div className="flex flex-wrap gap-2">
                      {template.variables.map((variable, idx) => (
                        <Badge key={idx} variant="outline">
                          {"{" + variable + "}"}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1 gap-2">
                      <Send className="w-4 h-4" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Campaign Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Recipients</th>
                  <th className="text-left py-3 px-4 font-semibold">Sent</th>
                  <th className="text-left py-3 px-4 font-semibold">Opened</th>
                  <th className="text-left py-3 px-4 font-semibold">Clicked</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{campaign.name}</td>
                    <td className="py-3 px-4">
                      <Badge className={typeColors[campaign.type]}>
                        {campaign.type === "WhatsApp" ? (
                          <MessageCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Mail className="w-3 h-3 mr-1" />
                        )}
                        {campaign.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[campaign.status]}>
                        {campaign.status === "Active" && <Clock className="w-3 h-3 mr-1" />}
                        {campaign.status === "Completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {campaign.status === "Scheduled" && <AlertCircle className="w-3 h-3 mr-1" />}
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-semibold">{campaign.recipients}</td>
                    <td className="py-3 px-4">{campaign.sent}</td>
                    <td className="py-3 px-4">
                      {campaign.sent > 0 ? (
                        <span className="text-green-600 font-semibold">
                          {campaign.opened} ({Math.round((campaign.opened / campaign.sent) * 100)}%)
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {campaign.sent > 0 ? (
                        <span className="text-blue-600 font-semibold">
                          {campaign.clicked} ({Math.round((campaign.clicked / campaign.sent) * 100)}%)
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaigns.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.sent, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    campaigns.reduce((sum, c) => sum + (c.sent > 0 ? (c.opened / c.sent) * 100 : 0), 0) /
                      campaigns.filter((c) => c.sent > 0).length,
                  )}
                  %
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Click Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    campaigns.reduce((sum, c) => sum + (c.sent > 0 ? (c.clicked / c.sent) * 100 : 0), 0) /
                      campaigns.filter((c) => c.sent > 0).length,
                  )}
                  %
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AutomationModule
