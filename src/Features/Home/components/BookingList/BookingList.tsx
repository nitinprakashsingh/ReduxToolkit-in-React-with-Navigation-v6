import {
  SectionTitle,
  StyledTable,
  TableDataCell,
  TableHeadCell,
  TableRow,
} from "../../screens/Dashboard/Dashboard.style";
import {
  BookingGroup,
  BookingGroupTitle,
  BookingHeader,
  HelperText,
  StatusBadge,
  TableScroll,
} from "./BookingList.Style";

type Booking = {
  id: number;
  bookingNo: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  doctorName: string;
  department: string;
  phone: string;
  paymentReceived: boolean;
  status: "Confirmed" | "Scheduled" | "Pending";
};

const formatDateInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDateInput(date);
};

const today = formatDateInput(new Date());

const bookingsData: Booking[] = [
  {
    id: 1,
    bookingNo: "BK-101",
    appointmentDate: today,
    appointmentTime: "09:30 AM",
    patientName: "Suresh Yadav",
    doctorName: "Dr. Anil Mehta",
    department: "Cardiology",
    phone: "9876543201",
    paymentReceived: true,
    status: "Confirmed",
  },
  {
    id: 2,
    bookingNo: "BK-102",
    appointmentDate: today,
    appointmentTime: "11:00 AM",
    patientName: "Meena Verma",
    doctorName: "Dr. Neha Sharma",
    department: "Dermatology",
    phone: "9123456702",
    paymentReceived: false,
    status: "Pending",
  },
  {
    id: 3,
    bookingNo: "BK-103",
    appointmentDate: today,
    appointmentTime: "02:15 PM",
    patientName: "Aakash Gupta",
    doctorName: "Dr. Anil Mehta",
    department: "Cardiology",
    phone: "9988776603",
    paymentReceived: true,
    status: "Confirmed",
  },
  {
    id: 4,
    bookingNo: "BK-104",
    appointmentDate: addDays(1),
    appointmentTime: "10:30 AM",
    patientName: "Pooja Mishra",
    doctorName: "Dr. Neha Sharma",
    department: "Dermatology",
    phone: "9876501234",
    paymentReceived: false,
    status: "Scheduled",
  },
  {
    id: 5,
    bookingNo: "BK-105",
    appointmentDate: addDays(3),
    appointmentTime: "04:00 PM",
    patientName: "Ravi Patel",
    doctorName: "Dr. Anil Mehta",
    department: "Cardiology",
    phone: "9012345678",
    paymentReceived: true,
    status: "Scheduled",
  },
];

const formatAppointmentDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const BookingList = () => {
  const todayBookings = bookingsData.filter(
    (booking) => booking.appointmentDate === today
  );
  const upcomingBookings = bookingsData.filter(
    (booking) => booking.appointmentDate > today
  );

  const renderBookingTable = (bookings: Booking[], showDate = false) => (
    <TableScroll>
      <StyledTable>
        <thead>
          <tr>
            <TableHeadCell>Booking No</TableHeadCell>
            {showDate && <TableHeadCell>Appointment Date</TableHeadCell>}
            <TableHeadCell>Appointment Time</TableHeadCell>
            <TableHeadCell>Patient Name</TableHeadCell>
            <TableHeadCell>Appointment With</TableHeadCell>
            <TableHeadCell>Department</TableHeadCell>
            <TableHeadCell>Phone No</TableHeadCell>
            <TableHeadCell>Payment Received</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableDataCell>{booking.bookingNo}</TableDataCell>
              {showDate && (
                <TableDataCell>
                  {formatAppointmentDate(booking.appointmentDate)}
                </TableDataCell>
              )}
              <TableDataCell>{booking.appointmentTime}</TableDataCell>
              <TableDataCell>{booking.patientName}</TableDataCell>
              <TableDataCell>{booking.doctorName}</TableDataCell>
              <TableDataCell>{booking.department}</TableDataCell>
              <TableDataCell>{booking.phone}</TableDataCell>
              <TableDataCell>
                <StatusBadge $variant={booking.paymentReceived ? "paid" : "pending"}>
                  {booking.paymentReceived ? "Yes" : "No"}
                </StatusBadge>
              </TableDataCell>
              <TableDataCell>
                <StatusBadge
                  $variant={
                    booking.status === "Confirmed"
                      ? "confirmed"
                      : booking.status === "Pending"
                      ? "pending"
                      : "scheduled"
                  }
                >
                  {booking.status}
                </StatusBadge>
              </TableDataCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableScroll>
  );

  return (
    <>
      <BookingHeader>
        <div>
          <SectionTitle>Booking List</SectionTitle>
          <HelperText>
            View today appointment bookings and upcoming new bookings.
          </HelperText>
        </div>
      </BookingHeader>

      <BookingGroup>
        <BookingGroupTitle>Today Bookings</BookingGroupTitle>
        {renderBookingTable(todayBookings)}
      </BookingGroup>

      <BookingGroup>
        <BookingGroupTitle>Upcoming New Bookings</BookingGroupTitle>
        {renderBookingTable(upcomingBookings, true)}
      </BookingGroup>
    </>
  );
};

export default BookingList;

