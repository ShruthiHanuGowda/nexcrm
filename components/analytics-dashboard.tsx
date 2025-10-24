"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const AnalyticsDashboard = () => {
  const conversionData = [
    { month: "Jan", leads: 120, site_visits: 45, proposals: 18, conversions: 12 },
    { month: "Feb", leads: 150, site_visits: 60, proposals: 24, conversions: 16 },
    { month: "Mar", leads: 180, site_visits: 72, proposals: 32, conversions: 22 },
    { month: "Apr", leads: 200, site_visits: 85, proposals: 38, conversions: 28 },
    { month: "May", leads: 220, site_visits: 95, proposals: 44, conversions: 32 },
    { month: "Jun", leads: 250, site_visits: 110, proposals: 52, conversions: 38 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 125000, target: 150000 },
    { month: "Feb", revenue: 145000, target: 150000 },
    { month: "Mar", revenue: 165000, target: 150000 },
    { month: "Apr", revenue: 185000, target: 200000 },
    { month: "May", revenue: 210000, target: 200000 },
    { month: "Jun", revenue: 245000, target: 250000 },
  ]

  const propertyTypeData = [
    { type: "Residential", sales: 45, revenue: 1200000 },
    { type: "Commercial", sales: 28, revenue: 2100000 },
    { type: "Industrial", sales: 15, revenue: 900000 },
    { type: "Mixed Use", sales: 12, revenue: 1500000 },
  ]

  const metrics = [
    { label: "Avg Deal Size", value: "$125,000", change: "+15%" },
    { label: "Sales Cycle", value: "45 days", change: "-8%" },
    { label: "Win Rate", value: "32%", change: "+5%" },
    { label: "Customer Satisfaction", value: "4.8/5", change: "+0.3" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Analytics & Reports</h2>
        <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-green-600 mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Lead to conversion pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#3b82f6" />
                <Bar dataKey="site_visits" fill="#8b5cf6" />
                <Bar dataKey="proposals" fill="#ec4899" />
                <Bar dataKey="conversions" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
            <CardDescription>Monthly performance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" fill="#3b82f6" stroke="#3b82f6" />
                <Area type="monotone" dataKey="target" fill="#10b981" stroke="#10b981" opacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Property Type Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Property Type</CardTitle>
          <CardDescription>Revenue and sales distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Property Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Sales Count</th>
                  <th className="text-left py-3 px-4 font-semibold">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold">Avg Price</th>
                </tr>
              </thead>
              <tbody>
                {propertyTypeData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{item.type}</td>
                    <td className="py-3 px-4">{item.sales}</td>
                    <td className="py-3 px-4 font-semibold">${(item.revenue / 1000000).toFixed(1)}M</td>
                    <td className="py-3 px-4">${(item.revenue / item.sales / 1000).toFixed(0)}K</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Rate Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate Trend</CardTitle>
          <CardDescription>Monthly conversion percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionData.map((d) => ({ ...d, rate: ((d.conversions / d.leads) * 100).toFixed(1) }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} name="Conversion Rate (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsDashboard
