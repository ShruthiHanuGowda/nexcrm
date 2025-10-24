"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit2, Trash2, Shield, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
  status: string
  created_at: string
}

interface ActivityLog {
  id: string
  user: string
  action: string
  timestamp: string
  type: string
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    role: "agent",
  })

  const [activityLog] = useState<ActivityLog[]>([
    { id: "1", user: "System", action: "Database initialized", timestamp: "2024-10-25 14:30", type: "Create" },
    { id: "2", user: "Admin", action: "User management enabled", timestamp: "2024-10-25 13:15", type: "Update" },
    { id: "3", user: "Admin", action: "API routes configured", timestamp: "2024-10-25 11:45", type: "Create" },
  ])

  const [settings] = useState([
    { id: 1, name: "Company Name", value: "NexSolutions", category: "General" },
    { id: 2, name: "Email Notifications", value: "Enabled", category: "Notifications" },
    { id: 3, name: "WhatsApp Integration", value: "Connected", category: "Integrations" },
    { id: 4, name: "Payment Gateway", value: "Razorpay", category: "Payments" },
    { id: 5, name: "Data Backup", value: "Daily", category: "Security" },
  ])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setFormData({ email: "", first_name: "", last_name: "", role: "agent" })
        setShowAddUserForm(false)
        fetchUsers()
      }
    } catch (error) {
      console.error("Error adding user:", error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      console.log("Calling DELETE API for user ID:", userId);
      const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete user:", errorData);
        alert(`Error deleting user: ${errorData.error}`);
        return;
      }

      console.log("User deleted successfully");
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Unexpected error in handleDeleteUser:", err);
      alert("Unexpected error occurred while deleting user");
    }
  };


  const roleColors: Record<string, string> = {
    admin: "bg-red-100 text-red-800",
    manager: "bg-blue-100 text-blue-800",
    agent: "bg-green-100 text-green-800",
    finance: "bg-purple-100 text-purple-800",
    viewer: "bg-gray-100 text-gray-800",
  }

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
  }

  const typeColors: Record<string, string> = {
    Create: "bg-blue-100 text-blue-800",
    Update: "bg-yellow-100 text-yellow-800",
    Delete: "bg-red-100 text-red-800",
    Export: "bg-purple-100 text-purple-800",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Admin Panel</h2>
        <p className="text-muted-foreground">Manage users, roles, and system settings</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <Button className="gap-2" onClick={() => setShowAddUserForm(!showAddUserForm)}>
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </div>

          {showAddUserForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Add User</Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddUserForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

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
                        <th className="text-left py-3 px-4 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-muted-foreground">
                            No users found. Add your first user to get started.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{`${user.first_name} ${user.last_name}`}</td>
                            <td className="py-3 px-4 text-xs">{user.email}</td>
                            <td className="py-3 px-4">
                              <Badge className={roleColors[user.role] || "bg-gray-100 text-gray-800"}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={statusColors[user.status] || "bg-gray-100 text-gray-800"}>
                                {user.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Shield className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    console.log("Deleting ID:", user.id)
                                    handleDeleteUser(user.id)
                                  }}
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
        </TabsContent>

        {/* Activity Log */}
        <TabsContent value="activity" className="space-y-4">
          <h3 className="text-lg font-semibold">System Activity</h3>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {activityLog.map((log) => (
                  <div key={log.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Badge className={typeColors[log.type] || "bg-gray-100 text-gray-800"}>{log.type}</Badge>
                        <div>
                          <p className="text-sm font-medium text-foreground">{log.action}</p>
                          <p className="text-xs text-muted-foreground">by {log.user}</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          <h3 className="text-lg font-semibold">System Settings</h3>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{setting.name}</p>
                      <p className="text-xs text-muted-foreground">{setting.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">{setting.value}</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connected services and APIs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "WhatsApp Business API", status: "Connected", icon: "💬" },
                { name: "Email Service (SMTP)", status: "Connected", icon: "📧" },
                { name: "Razorpay Payment Gateway", status: "Connected", icon: "💳" },
                { name: "AWS S3 Storage", status: "Connected", icon: "☁️" },
              ].map((integration, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{integration.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{integration.name}</p>
                      <Badge className="bg-green-100 text-green-800 mt-1">{integration.status}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanel
