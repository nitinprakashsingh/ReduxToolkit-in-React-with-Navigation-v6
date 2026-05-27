import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

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
import { fetchBookings, Booking } from "../../../../api/bookingApi";
import {
  ActionIconButton,
  AddButton,
} from "../DepartmentList/DepartmentList.Style";

type BookingListProps = {
  onCreateClick?: () => void;
};

const formatDateInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const today = formatDateInput(new Date());

const formatAppointmentDate = (date: string) => {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
};

const BookingList = ({ onCreateClick }: BookingListProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        const result = await fetchBookings();
        setBookings(result.data || []);
      } catch (error) {
        console.error("Failed to load bookings", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const todayBookings = bookings.filter((booking) => {
    const bookingDate = formatDateInput(new Date(booking.appointmentDate));
    return bookingDate === today;
  });

  const upcomingBookings = bookings.filter((booking) => {
    const bookingDate = formatDateInput(new Date(booking.appointmentDate));
    return bookingDate > today;
  });

  const renderBookingTable = (bookingsToRender: Booking[], showDate = false) => (
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
          {bookingsToRender.length > 0 ? (
            bookingsToRender.map((booking) => (
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
                <TableDataCell>{booking.department || "N/A"}</TableDataCell>
                <TableDataCell>{booking.patientPhone}</TableDataCell>
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
            ))
          ) : (
            <TableRow>
              <TableDataCell colSpan={showDate ? 9 : 8}>
                No bookings found.
              </TableDataCell>
            </TableRow>
          )}
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
        {onCreateClick && (
          <AddButton onClick={onCreateClick}>
            <Plus size={14} />
            Create Booking
          </AddButton>
        )}
      </BookingHeader>

      <BookingGroup>
        <BookingGroupTitle>Today Bookings</BookingGroupTitle>
        {loading ? <p>Loading bookings...</p> : renderBookingTable(todayBookings)}
      </BookingGroup>

      <BookingGroup>
        <BookingGroupTitle>Upcoming New Bookings</BookingGroupTitle>
        {loading ? <p>Loading bookings...</p> : renderBookingTable(upcomingBookings, true)}
      </BookingGroup>
    </>
  );
};

export default BookingList;
