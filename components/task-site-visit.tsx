"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MapPin, Calendar, Clock, User, CheckCircle2, Circle, AlertCircle, Navigation } from "lucide-react"

const TaskSiteVisit = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: "Follow up with Rajesh Kumar",
      description: "Call to discuss payment terms for Apartment 3BHK",
      dueDate: "2024-10-26",
      priority: "High",
      status: "Pending",
      assignedTo: "Sarah Johnson",
      lead: "Rajesh Kumar",
      type: "Follow-up",
    },
    {
      id: 2,
      title: "Prepare proposal for Priya Singh",
      description: "Create detailed project proposal with floor plans",
      dueDate: "2024-10-27",
      priority: "High",
      status: "In Progress",
      assignedTo: "Mike Chen",
      lead: "Priya Singh",
      type: "Proposal",
    },
    {
      id: 3,
      title: "Send contract to Amit Patel",
      description: "Send signed contract for commercial space",
      dueDate: "2024-10-28",
      priority: "Medium",
      status: "Pending",
      assignedTo: "Alex Kumar",
      lead: "Amit Patel",
      type: "Documentation",
    },
    {
      id: 4,
      title: "Schedule site visit - Neha Gupta",
      description: "Arrange penthouse site visit with client",
      dueDate: "2024-10-29",
      priority: "High",
      status: "Completed",
      assignedTo: "Sarah Johnson",
      lead: "Neha Gupta",
      type: "Site Visit",
    },
  ])

  const [siteVisits] = useState([
    {
      id: 1,
      lead: "Rajesh Kumar",
      property: "Sunrise Towers - Unit 501",
      date: "2024-10-26",
      time: "10:00 AM",
      location: "Mumbai, Maharashtra",
      latitude: 19.0176,
      longitude: 72.8479,
      status: "Scheduled",
      visitedBy: "Sarah Johnson",
      notes: "Client interested in 3BHK apartment",
      duration: "45 mins",
    },
    {
      id: 2,
      lead: "Priya Singh",
      property: "Tech Park Plaza - Floor 5",
      date: "2024-10-27",
      time: "2:00 PM",
      location: "Bangalore, Karnataka",
      latitude: 12.9716,
      longitude: 77.5946,
      status: "Completed",
      visitedBy: "Mike Chen",
      notes: "Client satisfied with office layout. Requested customization.",
      duration: "60 mins",
    },
    {
      id: 3,
      lead: "Amit Patel",
      property: "Green Valley Villas - Plot A",
      date: "2024-10-28",
      time: "11:00 AM",
      location: "Pune, Maharashtra",
      latitude: 18.5204,
      longitude: 73.8567,
      status: "Scheduled",
      visitedBy: "Alex Kumar",
      notes: "First site visit for commercial space evaluation",
      duration: "90 mins",
    },
    {
      id: 4,
      lead: "Neha Gupta",
      property: "Sunrise Towers - Penthouse",
      date: "2024-10-25",
      time: "3:00 PM",
      location: "Mumbai, Maharashtra",
      latitude: 19.0176,
      longitude: 72.8479,
      status: "Completed",
      visitedBy: "Sarah Johnson",
      notes: "Client loved the penthouse. Proceeding with negotiation.",
      duration: "75 mins",
    },
  ])

  const priorityColors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  }

  const statusColors = {
    Pending: "bg-gray-100 text-gray-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Scheduled: "bg-purple-100 text-purple-800",
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "In Progress":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "Pending":
        return <Circle className="w-5 h-5 text-gray-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Tasks & Site Visits</h2>
          <p className="text-muted-foreground">Manage tasks and track property site visits</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Task
        </Button>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="visits">Site Visits</TabsTrigger>
        </TabsList>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                      </div>
                      <CardDescription className="mt-2">{task.description}</CardDescription>
                    </div>
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-semibold">{task.dueDate}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge className={statusColors[task.status]}>{task.status}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Assigned To</p>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-semibold">{task.assignedTo}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Lead</p>
                      <p className="text-sm font-semibold">{task.lead}</p>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Type</p>
                    <Badge variant="outline">{task.type}</Badge>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1">
                      Mark Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Site Visits Tab */}
        <TabsContent value="visits" className="space-y-4">
          <div className="space-y-4">
            {siteVisits.map((visit) => (
              <Card key={visit.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{visit.property}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {visit.location}
                      </CardDescription>
                    </div>
                    <Badge className={statusColors[visit.status]}>{visit.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Lead</p>
                      <p className="text-sm font-semibold">{visit.lead}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Date
                      </p>
                      <p className="text-sm font-semibold">{visit.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Time
                      </p>
                      <p className="text-sm font-semibold">{visit.time}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-semibold">{visit.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Visited By
                      </p>
                      <p className="text-sm font-semibold">{visit.visitedBy}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        Coordinates
                      </p>
                      <p className="text-sm font-semibold">
                        {visit.latitude.toFixed(4)}, {visit.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Notes</p>
                    <p className="text-sm text-foreground">{visit.notes}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                      <Navigation className="w-4 h-4" />
                      View Map
                    </Button>
                    <Button size="sm" className="flex-1">
                      Edit Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TaskSiteVisit
