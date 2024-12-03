"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  EyeOff,
  Mail,
  Printer,
  Search,
  Trash2,
  X,
} from "lucide-react";

const authenticateWithAzureAD = async () => {
  console.log("Authenticating with Azure AD");
  return { accessToken: "mock_access_token" };
};

const fetchUserInfoFromGraph = async (accessToken) => {
  console.log("Fetching user info from Microsoft Graph API");
  return {
    givenName: "John",
    surname: "Doe",
    displayName: "John Doe",
    mail: "john.doe@example.com",
  };
};

const generateStrongPassword = () => {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const roles = [
  "Accountant",
  "Doctor",
  "Healthcare Admin",
  "Healthcare Manager",
  "Lab Technician",
  "Pharmacy Technician",
  "Remote Doctor",
  "System Admin",
];

const genders = ["Male", "Female", "Non-Binary", "Other"];

export default function UserComponent() {
  const [personnel, setPersonnel] = useState([
    {
      id: 1,
      firstName: "John",
      surname: "Doe",
      displayName: "John Doe (<Org>)",
      email: "john.doe@example.com",
      mobileNumber: "+234 123 456 7890",
      jobTitle: "Doctor",
      location: "Lagos",
      role: "Doctor",
      gender: "Male",
    },
    {
      id: 2,
      firstName: "Jane",
      surname: "Smith",
      displayName: "Jane Smith (<Org>)",
      email: "jane.smith@example.com",
      mobileNumber: "+234 987 654 3210",
      jobTitle: "Nurse",
      location: "Abuja",
      role: "Healthcare Admin",
      gender: "Female",
    },
    {
      id: 3,
      firstName: "Mike",
      surname: "Johnson",
      displayName: "Mike Johnson (<Org>)",
      email: "mike.johnson@example.com",
      mobileNumber: "+234 555 555 5555",
      jobTitle: "Lab Technician",
      location: "Port Harcourt",
      role: "Lab Technician",
      gender: "Male",
    },
  ]);

  const [newUser, setNewUser] = useState({
    id: 0,
    firstName: "",
    surname: "",
    displayName: "",
    email: "",
    password: "",
    mobileNumber: "",
    jobTitle: "",
    location: "",
    role: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [orgName, setOrgName] = useState("<Org>");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [showViewUserModal, setShowViewUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const { accessToken } = await authenticateWithAzureAD();
        const userInfo = await fetchUserInfoFromGraph(accessToken);
        setNewUser((prevState) => ({
          ...prevState,
          firstName: userInfo.givenName,
          surname: userInfo.surname,
          displayName: userInfo.displayName,
          email: `${userInfo.surname[0].toLowerCase()}${userInfo.givenName.toLowerCase()}@elikita.com`,
          password: generateStrongPassword(),
        }));
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    if (newUser.firstName && newUser.surname) {
      const generatedEmail = `${newUser.surname[0].toLowerCase()}${newUser.firstName.toLowerCase()}@elikita.com`;
      const generatedDisplayName = `${newUser.firstName} ${newUser.surname} (${orgName})`;
      setNewUser((prevState) => ({
        ...prevState,
        email: generatedEmail,
        displayName: generatedDisplayName,
      }));
    }
  }, [newUser.firstName, newUser.surname, orgName]);

  const addUser = () => {
    const newPersonnel = { id: personnel.length + 1, ...newUser };
    setPersonnel([...personnel, newPersonnel]);
    setNewUser({
      id: 0,
      firstName: "",
      surname: "",
      displayName: "",
      email: "",
      password: "",
      mobileNumber: "",
      jobTitle: "",
      location: "",
      role: "",
      gender: "",
    });
    setShowAddUserModal(false);
  };

  const handleAutoGeneratePassword = () => {
    setNewUser((prevState) => ({
      ...prevState,
      password: generateStrongPassword(),
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const filteredPersonnel = personnel.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedPersonnel = filteredPersonnel.slice(
    (currentPage - 1) * 10,
    currentPage * 10,
  );

  const totalPages = Math.ceil(filteredPersonnel.length / 10);

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser(user);
    setShowAddUserModal(true);
  };

  const updateUser = () => {
    const updatedPersonnel = personnel.map((user) =>
      user.id === editingUser?.id ? { ...newUser, id: user.id } : user,
    );
    setPersonnel(updatedPersonnel);
    setEditingUser(null);
    setNewUser({
      id: 0,
      firstName: "",
      surname: "",
      displayName: "",
      email: "",
      password: "",
      mobileNumber: "",
      jobTitle: "",
      location: "",
      role: "",
      gender: "",
    });
    setShowAddUserModal(false);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewUserModal(true);
  };

  const handleDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const deleteUser = () => {
    setPersonnel((prevPersonnel) =>
      prevPersonnel.filter((user) => user.id !== userToDelete.id),
    );
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="rounded bg-[#007664] px-4 py-2 text-white transition-colors hover:bg-[#007664]/80"
        >
          Add New User
        </button>
      </div>

      <div className="rounded-lg bg-[#B24531]/10 p-6">
        <h3 className="mb-4 text-xl font-semibold text-[#B24531]">User List</h3>
        <div className="mb-4">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#007664]"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-[#B24531] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedPersonnel.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.displayName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.gender}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(user)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            Showing {(currentPage - 1) * 10 + 1} to{" "}
            {Math.min(currentPage * 10, filteredPersonnel.length)} of{" "}
            {filteredPersonnel.length} users
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#007664]">
                {editingUser ? "Edit User" : "Register New User"}
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Surname
                </label>
                <input
                  id="surname"
                  type="text"
                  value={newUser.surname}
                  onChange={(e) =>
                    setNewUser({ ...newUser, surname: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={newUser.displayName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, displayName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" aria-hidden="true" />
                    ) : (
                      <Eye className="size-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <button
                  onClick={handleAutoGeneratePassword}
                  className="mt-2 rounded bg-[#007664] px-3 py-1 text-sm text-white transition-colors hover:bg-[#007664]/80"
                >
                  Auto Generate
                </button>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  value={newUser.mobileNumber}
                  onChange={(e) =>
                    setNewUser({ ...newUser, mobileNumber: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  type="text"
                  value={newUser.jobTitle}
                  onChange={(e) =>
                    setNewUser({ ...newUser, jobTitle: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={newUser.location}
                  onChange={(e) =>
                    setNewUser({ ...newUser, location: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={newUser.gender}
                  onChange={(e) =>
                    setNewUser({ ...newUser, gender: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007664] focus:ring focus:ring-[#007664]/50"
                >
                  <option value="">Select a gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={editingUser ? updateUser : addUser}
                className="rounded bg-[#007664] px-4 py-2 text-white transition-colors hover:bg-[#007664]/80"
              >
                {editingUser ? "Update User" : "Register User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">User Details</h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedUser?.displayName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>Mobile Number:</strong> {selectedUser?.mobileNumber}
              </p>
              <p>
                <strong>Job Title:</strong> {selectedUser?.jobTitle}
              </p>
              <p>
                <strong>Location:</strong> {selectedUser?.location}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser?.role}
              </p>
              <p>
                <strong>Gender:</strong> {selectedUser?.gender}
              </p>
            </div>
            <button
              onClick={() => setShowViewUserModal(false)}
              className="mt-4 rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the user{" "}
              {userToDelete?.displayName}?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
