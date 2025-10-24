"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Home, DollarSign } from "lucide-react"

const Dashboard = () => {
  const stats = [
    { label: "Total Leads", value: "1,234", change: "+12%", icon: Users, color: "bg-blue-500" },
    { label: "Active Projects", value: "45", change: "+5%", icon: Home, color: "bg-green-500" },
    { label: "Revenue (This Month)", value: "$125,400", change: "+23%", icon: DollarSign, color: "bg-purple-500" },
    { label: "Conversion Rate", value: "32%", change: "+8%", icon: TrendingUp, color: "bg-orange-500" },
  ]

  const leadData = [
    { month: "Jan", leads: 120, converted: 38 },
    { month: "Feb", leads: 150, converted: 48 },
    { month: "Mar", leads: 180, converted: 58 },
    { month: "Apr", leads: 200, converted: 64 },
    { month: "May", leads: 220, converted: 70 },
    { month: "Jun", leads: 250, converted: 80 },
  ]

  const projectStatus = [
    { name: "Completed", value: 15, fill: "#10b981" },
    { name: "In Progress", value: 25, fill: "#3b82f6" },
    { name: "Pending", value: 5, fill: "#f59e0b" },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lead Conversion Trend</CardTitle>
            <CardDescription>Monthly leads and conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="converted" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Distribution of projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New lead added", user: "Sarah Johnson", time: "2 hours ago" },
              { action: "Project completed", user: "Mike Chen", time: "4 hours ago" },
              { action: "Payment received", user: "System", time: "6 hours ago" },
              { action: "Site visit scheduled", user: "Alex Kumar", time: "1 day ago" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
