"use client";

const SettingsComponent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="rounded-lg bg-[#75C05B]/10 p-4">
        <h3 className="mb-4 text-xl font-semibold text-[#007664]">Personal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Theme
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Change Password
            </label>
            <input
              type="password"
              placeholder="Current Password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="password"
              placeholder="New Password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <button className="mt-2 rounded bg-[#007664] px-4 py-2 text-white hover:bg-[#007664]/80">
              Update Password
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-[#75C05B]/10 p-4">
        <h3 className="mb-4 text-xl font-semibold text-[#007664]">General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Platform Name
            </label>
            <input
              defaultValue="e-Likita"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option value="WAT">West Africa Time (WAT)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option value="en">English</option>
              <option value="yo">Yoruba</option>
              <option value="ha">Hausa</option>
            </select>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-[#B24531]/10 p-4">
        <h3 className="mb-4 text-xl font-semibold text-[#B24531]">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            {/* Add a toggle switch here */}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Session Timeout
              </h3>
              <p className="text-sm text-gray-500">
                Automatically log out after inactivity
              </p>
            </div>
            <select className="mt-1 block w-[180px] rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>
        </div>
      </div>
      <button className="rounded bg-[#007664] px-4 py-2 text-white hover:bg-[#007664]/80">
        Save Settings
      </button>
    </div>
  );
};

export default SettingsComponent;
