export type Appointment = {
  id: string;
  patientName: string;
  patientEmail: string;
  date: string;
  slot: string;
  department: string;
  status: string;
  isEmergency?: boolean;
};

export const mockAppointments: Appointment[] = [
  {
    id: "appt-1",
    patientName: "Aarav Sharma",
    patientEmail: "aarav.sharma@example.com",
    date: "2026-08-06",
    slot: "09:00 AM",
    department: "Cardiology",
    status: "Scheduled",
    isEmergency: false,
  },
  {
    id: "appt-2",
    patientName: "Nisha Patel",
    patientEmail: "nisha.patel@example.com",
    date: "2026-08-06",
    slot: "10:30 AM",
    department: "Orthopedics",
    status: "Pending Report",
    isEmergency: false,
  },
  {
    id: "appt-3",
    patientName: "Rohan Singh",
    patientEmail: "rohan.singh@example.com",
    date: "2026-08-06",
    slot: "12:00 PM",
    department: "General Medicine",
    status: "Scheduled",
    isEmergency: true,
  },
  {
    id: "appt-4",
    patientName: "Meera Joshi",
    patientEmail: "meera.joshi@example.com",
    date: "2026-08-07",
    slot: "11:00 AM",
    department: "Dermatology",
    status: "Scheduled",
    isEmergency: false,
  },
];
