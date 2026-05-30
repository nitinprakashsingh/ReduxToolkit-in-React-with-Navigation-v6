import axiosClient from "../../../../api/axiosClient";

export type Doctor = {
  id: string;
  name: string;
  speciality: string;
  phone: string;
  email: string;
  startCareerDate: string;
  registrationNumber: string;
  consultancyFees: string;
  availableDays: string;
  startTime: string;
  endTime: string;
  status: string;
};

export type CreateDoctorPayload = {
  name: string;
  speciality: string;
  phone: string;
  email: string;
  startCareerDate: string;
  registrationNumber: string;
  consultancyFees: string;
  availableDays: string;
  startTime: string;
  endTime: string;
};

type DoctorListResponse = {
  data: Doctor[];
};

type DoctorResponse = {
  message: string;
  data: Doctor;
};

export const fetchDoctorsApi = async () => {
  const response = await axiosClient.get<DoctorListResponse>("/doctors/list");
  return response.data.data;
};

export const createDoctorApi = async (payload: CreateDoctorPayload) => {
  const response = await axiosClient.post<DoctorResponse>("/doctors", payload);
  return response.data;
};

export const updateDoctorApi = async (doctorId: string, payload: CreateDoctorPayload) => {
  const response = await axiosClient.put<DoctorResponse>(`/doctors/${doctorId}`, payload);
  return response.data;
};
