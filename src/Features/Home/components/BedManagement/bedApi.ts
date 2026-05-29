import axiosClient from "../../../../api/axiosClient";

export type BedStatus = "Available" | "Occupied" | "Maintenance" | "Reserved" | string;

export type Bed = {
  id: string;
  bedNo: string;
  ward: string;
  roomNo?: string;
  bedType: string;
  status: BedStatus;
  patientName?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BedPayload = {
  bedNo: string;
  ward: string;
  roomNo: string;
  bedType: string;
  status: BedStatus;
  patientName: string;
  notes: string;
};

type BedListResponse = {
  data: Bed[];
};

type BedResponse = {
  message: string;
  data: Bed;
};

export const fetchBedsApi = async () => {
  const response = await axiosClient.get<BedListResponse>("/beds/list");
  return response.data.data;
};

export const createBedApi = async (payload: BedPayload) => {
  const response = await axiosClient.post<BedResponse>("/beds", payload);
  return response.data;
};

export const updateBedApi = async (bedId: string, payload: Partial<BedPayload>) => {
  const response = await axiosClient.put<BedResponse>(`/beds/${bedId}`, payload);
  return response.data;
};
