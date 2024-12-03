"use client";
import {
  Activity,
  Bell,
  ChevronDown,
  ClockIcon,
  Home,
  Menu,
  Settings,
  Users,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";

import DashboardComponent from "@/app/components/healthadmin/Dashboard";
import {
  AppointmentsPage,
  EventsPage,
  PatientsPage,
  SettingsPage,
} from "../../components/healthadmin";

import { LogoutConfirmation } from "../../components/shared";
import { useRouter } from "next/navigation";

const NavItem = ({ icon: Icon, label, active, onClick, children }) => (
  <div className="relative">
    <button
      onClick={onClick}
      className={`flex w-full items-center space-x-2 rounded p-2 text-sm font-bold ${
        active
          ? "bg-[#75C05B]/20 text-white"
          : "text-white hover:bg-[#75C05B]/20 hover:text-white"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
      {children && <ChevronDown className="ml-auto size-4" />}
    </button>
    {children && <div className="mt-1 space-y-1 pl-4">{children}</div>}
  </div>
);

export default function HealthAdmin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminInfo, setAdminInfo] = useState({
    name: "Smith",
    email: "smith@elikita.com",
    phone: "+234 123 456 7890",
    role: "System Admin",
    address: "123 Main St, Lagos, Nigeria",
  });
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] =
    useState(false);

  const handleLogout = () => {
    setIsLogoutConfirmationOpen(true);
  };

  const confirmLogout = () => {
    console.log("Logging out...");
    setIsLogoutConfirmationOpen(false);
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-[#007664]">
      <aside
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-[#007664] p-4 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">e-Likita</h1>
          <button onClick={toggleSidebar} className="md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="space-y-2">
          <NavItem
            icon={Home}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem
            icon={Users}
            label="Patients"
            active={activeTab === "patient"}
            onClick={() => setActiveTab("patient")}
          />
          <NavItem
            icon={ClockIcon}
            label="Appointments"
            active={activeTab === "appointments"}
            onClick={() => setActiveTab("appointments")}
          />
          <NavItem
            icon={Activity}
            label="Events"
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
          />
          <NavItem
            icon={Settings}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
          <NavItem icon={LogOut} label="Logout" onClick={handleLogout} />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-100 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 md:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-3xl font-bold text-[#007664]">
              Healthcare Admin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="size-6 cursor-pointer text-[#007664]" />
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  /* Toggle profile dialog */
                }}
                className="flex cursor-pointer items-center space-x-2"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-gray-300 font-semibold text-gray-600">
                  {adminInfo.name.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold">{adminInfo.name}</p>
                  <p className="text-sm text-gray-500">{adminInfo.email}</p>
                </div>
              </button>
              {/* Profile dialog would go here */}
            </div>
          </div>
        </div>

        {activeTab === "dashboard" && <DashboardComponent />}
        {activeTab === "patient" && <PatientsPage />}
        {activeTab === "events" && <EventsPage />}
        {activeTab === "appointments" && <AppointmentsPage />}
        {activeTab === "settings" && <SettingsPage />}
        <LogoutConfirmation
          isOpen={isLogoutConfirmationOpen}
          onClose={() => setIsLogoutConfirmationOpen(false)}
          onConfirm={confirmLogout}
        />
      </main>
    </div>
  );
}
