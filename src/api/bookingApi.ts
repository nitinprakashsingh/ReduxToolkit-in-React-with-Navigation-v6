import axiosClient from "./axiosClient";

export type Booking = {
  id: string;
  bookingNo: string;
  patientId?: string;
  patientName: string;
  patientEmail?: string;
  patientPhone: string;
  doctorId?: string;
  doctorName: string;
  department?: string;
  appointmentDate: string;
  appointmentTime: string;
  consultancyFees: number;
  paymentMethod?: string;
  paymentReceived: boolean;
  paymentAmount: number;
  status: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateBookingPayload = {
  patientName: string;
  patientEmail?: string;
  patientPhone: string;
  patientId?: string;
  doctorName: string;
  doctorId?: string;
  department?: string;
  appointmentDate: string;
  appointmentTime: string;
  consultancyFees?: number;
  paymentMethod?: string;
  paymentReceived?: boolean;
  paymentAmount?: number;
  status?: string;
  notes?: string;
};

type BookingListResponse = {
  data: Booking[];
};

type BookingResponse = {
  message: string;
  data: Booking;
};

export const fetchBookings = async () => {
  const response = await axiosClient.get<BookingListResponse>("/bookings/list");
  return response.data;
};

export const createBooking = async (payload: CreateBookingPayload) => {
  const response = await axiosClient.post<BookingResponse>("/bookings", payload);
  return response.data;
};

export const getBooking = async (bookingId: string) => {
  const response = await axiosClient.get<BookingResponse>(`/bookings/${bookingId}`);
  return response.data;
};

export const updateBooking = async (bookingId: string, payload: Partial<CreateBookingPayload>) => {
  const response = await axiosClient.put<BookingResponse>(`/bookings/${bookingId}`, payload);
  return response.data;
};

export const deleteBooking = async (bookingId: string) => {
  const response = await axiosClient.delete<BookingResponse>(`/bookings/${bookingId}`);
  return response.data;
};
