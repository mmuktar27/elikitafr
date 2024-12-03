"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Staff Training",
      date: "2023-10-15",
      type: "Training",
      venue: "Conference Room A",
      time: "10:00 AM",
      description: "Annual staff training session",
      assignedTo: "All Staff",
    },
    {
      id: 2,
      name: "System Maintenance",
      date: "2023-10-20",
      type: "Maintenance",
      venue: "IT Department",
      time: "2:00 PM",
      description: "Scheduled system maintenance and updates",
      assignedTo: "IT Team",
    },
    {
      id: 3,
      name: "Medical Conference",
      date: "2023-11-05",
      type: "Conference",
      venue: "Grand Hotel",
      time: "9:00 AM",
      description: "International medical conference on telemedicine",
      assignedTo: "Doctors",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    type: "",
    venue: "",
    time: "",
    description: "",
    assignedTo: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const generateICSFile = (event) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.date.replace(/-/g, "")}T${event.time.replace(":", "")}00
DTEND:${event.date.replace(/-/g, "")}T${event.time.replace(":", "")}00
SUMMARY:${event.name}
DESCRIPTION:${event.description}
LOCATION:${event.venue}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${event.name}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addEvent = () => {
    const newEventWithId = { id: events.length + 1, ...newEvent };
    setEvents([...events, newEventWithId]);
    setNewEvent({
      name: "",
      date: "",
      type: "",
      venue: "",
      time: "",
      description: "",
      assignedTo: "",
    });
    generateICSFile(newEventWithId);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Events</h2>
      <div className="rounded-lg bg-[#A0FEFE]/10 p-4">
        <h3 className="mb-4 text-xl font-semibold text-[#007664]">
          Create New Event
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="rounded border p-2"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            className="rounded border p-2"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <select
            className="rounded border p-2"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          >
            <option value="">Event Type</option>
            <option value="Training">Training</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Conference">Conference</option>
          </select>
          <input
            className="rounded border p-2"
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <input
            className="rounded border p-2"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          <select
            className="rounded border p-2"
            value={newEvent.assignedTo}
            onChange={(e) =>
              setNewEvent({ ...newEvent, assignedTo: e.target.value })
            }
          >
            <option value="">Assign To</option>
            <option value="All Staff">All Staff</option>
            <option value="Doctors">Doctors</option>
            <option value="Nurses">Nurses</option>
            <option value="IT Team">IT Team</option>
          </select>
        </div>
        <button
          onClick={addEvent}
          className="mt-4 rounded bg-[#007664] px-4 py-2 text-white hover:bg-[#007664]/80"
        >
          Create Event
        </button>
        <button
          onClick={() => generateICSFile(newEvent)}
          className="ml-2 mt-4 rounded bg-[#007664] px-4 py-2 text-white hover:bg-[#007664]/80"
        >
          <CalendarIcon className="mr-2 inline-block size-4" />
          Add to Outlook
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-[#75C05B]/10 p-4">
          <h3 className="mb-4 text-xl font-semibold text-[#007664]">
            Event Calendar
          </h3>
          <div className="rounded-lg bg-white p-4">
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-bold">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className={`rounded-full p-2 text-center ${
                    events.some(
                      (event) => new Date(event.date).getDate() === i + 1,
                    )
                      ? "bg-[#007664] text-white"
                      : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#B24531]/10 p-4">
          <h3 className="mb-4 text-xl font-semibold text-[#B24531]">
            Event List
          </h3>
          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="cursor-pointer rounded bg-white p-2 hover:bg-gray-100"
                onClick={() => handleEventClick(event)}
              >
                <h3 className="font-bold">{event.name}</h3>
                <p className="text-sm">
                  {event.date} - {event.time}
                </p>
                <p className="text-sm">{event.venue}</p>
                <p className="text-sm">Assigned to: {event.assignedTo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedEvent && (
        <div className="rounded-lg bg-[#007664]/10 p-4">
          <h3 className="mb-4 text-xl font-semibold text-[#007664]">
            Event Details
          </h3>
          <h3 className="text-lg font-bold">{selectedEvent.name}</h3>
          <p>
            <strong>Date:</strong> {selectedEvent.date}
          </p>
          <p>
            <strong>Time:</strong> {selectedEvent.time}
          </p>
          <p>
            <strong>Venue:</strong> {selectedEvent.venue}
          </p>
          <p>
            <strong>Type:</strong> {selectedEvent.type}
          </p>
          <p>
            <strong>Description:</strong> {selectedEvent.description}
          </p>
          <p>
            <strong>Assigned to:</strong> {selectedEvent.assignedTo}
          </p>
          <button className="mt-2 rounded bg-[#007664] px-4 py-2 text-white hover:bg-[#007664]/80">
            Edit Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;
