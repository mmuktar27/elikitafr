"use client";

import { Bed, Building, Building2, Layers, Pill, TestTube } from "lucide-react";

const Utilities = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Utilities</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Extensions",
          icon: Layers,
          color: "#75C05B",
          content: { total: 15, active: 12, inactive: 3 },
        },
        {
          title: "Pharmacies",
          icon: Pill,
          color: "#B24531",
          content: { total: 8, medicine: 120, categories: 15 },
        },
        {
          title: "Laboratories",
          icon: TestTube,
          color: "#007664",
          content: { total: 5, investigations: 4 },
        },
        {
          title: "Departments",
          icon: Building2,
          color: "#007664",
          content: { total: 10, active: 9, inactive: 1 },
        },
        {
          title: "Wards",
          icon: Building,
          color: "#75C05B",
          content: { total: 20, occupied: 15, available: 5 },
        },
        {
          title: "Beds",
          icon: Bed,
          color: "#B24531",
          content: { total: 100, occupied: 75, available: 25 },
        },
      ].map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer rounded-lg p-4 transition-shadow duration-300 hover:shadow-lg`}
          style={{
            backgroundColor: item.color,
            opacity: 0.1,
          }}
        >
          <div className="text-[${item.color}] mb-2 flex items-center">
            <item.icon className="mr-2" />
            <h3 className="font-semibold">{item.title}</h3>
          </div>
          <div>
            {Object.entries(item.content).map(([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Utilities;
