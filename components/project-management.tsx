"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Users, Calendar, DollarSign, FileText } from "lucide-react"

const ProjectManagement = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "Sunrise Towers",
      location: "Mumbai, Maharashtra",
      type: "Residential",
      status: "In Progress",
      progress: 65,
      units: 120,
      availableUnits: 35,
      startDate: "2023-06-15",
      endDate: "2025-12-31",
      budget: "$5,200,000",
      spent: "$3,380,000",
      manager: "Rajesh Kumar",
      description: "Premium residential complex with modern amenities",
    },
    {
      id: 2,
      name: "Tech Park Plaza",
      location: "Bangalore, Karnataka",
      type: "Commercial",
      status: "Planning",
      progress: 15,
      units: 45,
      availableUnits: 45,
      startDate: "2024-01-01",
      endDate: "2026-06-30",
      budget: "$8,500,000",
      spent: "$1,275,000",
      manager: "Priya Singh",
      description: "State-of-the-art commercial office spaces",
    },
    {
      id: 3,
      name: "Green Valley Villas",
      location: "Pune, Maharashtra",
      type: "Residential",
      status: "Completed",
      progress: 100,
      units: 80,
      availableUnits: 5,
      startDate: "2021-03-01",
      endDate: "2023-11-30",
      budget: "$3,200,000",
      spent: "$3,200,000",
      manager: "Amit Patel",
      description: "Luxury villa community with landscaped gardens",
    },
  ])

  const statusColors = {
    Planning: "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    "On Hold": "bg-red-100 text-red-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Projects & Properties</h2>
          <p className="text-muted-foreground">Manage all your real estate projects</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </CardDescription>
                </div>
                <Badge className={statusColors[project.status]}>{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{project.description}</p>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-semibold">{project.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Units</p>
                  <p className="text-sm font-semibold">
                    {project.units} ({project.availableUnits} available)
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Timeline
                  </p>
                  <p className="text-sm font-semibold">
                    {project.startDate} to {project.endDate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Manager
                  </p>
                  <p className="text-sm font-semibold">{project.manager}</p>
                </div>
              </div>

              {/* Budget */}
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Budget</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {project.spent} / {project.budget}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(
                        (Number.parseFloat(project.spent.replace(/[^0-9]/g, "")) /
                          Number.parseFloat(project.budget.replace(/[^0-9]/g, ""))) *
                          100,
                      )}
                      % spent
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProjectManagement
