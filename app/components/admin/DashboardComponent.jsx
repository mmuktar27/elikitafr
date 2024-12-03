"use client";

import {
  Activity,
  BarChart2,
  Beaker,
  Briefcase,
  Calculator,
  Stethoscope,
  TestTube,
  User,
  UserCog,
  Users,
  Video,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

const DashboardComponent = () => {
  const roleData = [
    {
      role: "Healthcare Assistant",
      count: 45,
      color: "#8FD573",
      icon: Stethoscope,
    },
    { role: "Doctor", count: 50, color: "#FF7F50", icon: User },
    { role: "Lab Technician", count: 23, color: "#C95A42", icon: TestTube },
    { role: "Healthcare Admin", count: 12, color: "#008F7A", icon: UserCog },
    { role: "Accountant", count: 8, color: "#A0FEFE", icon: Calculator },
    { role: "Healthcare Manager", count: 7, color: "#A63D20", icon: Briefcase },
    { role: "Remote Doctor", count: 30, color: "#00664E", icon: Video },
    { role: "Pharmacy Technician", count: 18, color: "#7FFFD4", icon: Beaker },
  ];

  const totalUsers = roleData.reduce((sum, role) => sum + role.count, 0);
  const analyticsData = [
    { name: "Mon", consultations: 45, responseTime: 10 },
    { name: "Tue", consultations: 52, responseTime: 9 },
    { name: "Wed", consultations: 49, responseTime: 11 },
    { name: "Thu", consultations: 58, responseTime: 8 },
    { name: "Fri", consultations: 60, responseTime: 10 },
    { name: "Sat", consultations: 39, responseTime: 12 },
    { name: "Sun", consultations: 35, responseTime: 11 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-[#75C05B]/10 p-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Users</h3>
            <Users className="size-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <p className="text-xs text-gray-500">+20.1% from last month</p>
        </div>
        <div className="rounded-lg bg-[#B24531]/10 p-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Active Consultations</h3>
            <Activity className="size-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-gray-500">15% increase from yesterday</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Platform Usage Report</h3>
            <BarChart2 className="size-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">1,234 Active Users</div>
          <p className="text-xs text-gray-500">+15% from last month</p>
          <div className="mt-4 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Jan", total: 800 },
                  { name: "Feb", total: 900 },
                  { name: "Mar", total: 1000 },
                  { name: "Apr", total: 1100 },
                  { name: "May", total: 1234 },
                ]}
              >
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {roleData.map((role) => (
          <div
            key={role.role}
            className="overflow-hidden rounded-lg bg-white shadow-md"
            style={{ backgroundColor: `${role.color}20` }}
          >
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium">{role.role}</h3>
                <role.icon className="size-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold">{role.count}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-[#A0FEFE]/10 p-4">
        <h3 className="mb-4 text-xl font-semibold">Recent Alerts</h3>
        <div className="space-y-8">
          <div className="flex items-center">
            <span className="relative mr-2 flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                High server load detected
              </p>
              <p className="text-sm text-gray-500">
                Server load reached 90% at 14:45
              </p>
            </div>
            <div className="ml-auto font-medium">Just now</div>
          </div>
          <div className="flex items-center">
            <span className="relative mr-2 flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-yellow-500"></span>
            </span>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Database backup completed
              </p>
              <p className="text-sm text-gray-500">
                Daily backup finished at 02:00
              </p>
            </div>
            <div className="ml-auto font-medium">2 hours ago</div>
          </div>
          <div className="flex items-center">
            <span className="relative mr-2 flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                New user registration
              </p>
              <p className="text-sm text-gray-500">
                Dr. Sarah Johnson joined the platform
              </p>
            </div>
            <div className="ml-auto font-medium">5 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
