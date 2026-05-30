import axiosClient from "../../../../api/axiosClient";

export type Staff = {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateStaffPayload = {
  name: string;
  email: string;
  phone: string;
  relationship: string;
};

type StaffListResponse = {
  data: Staff[];
};

type CreateStaffResponse = {
  message: string;
  data: Staff;
};

export const createStaffApi = async (payload: CreateStaffPayload) => {
  const response = await axiosClient.post<CreateStaffResponse>("/staff", payload);
  return response.data;
};

export const fetchStaffListApi = async () => {
  const response = await axiosClient.get<StaffListResponse>("/staff/list");
  return response.data.data;
};
