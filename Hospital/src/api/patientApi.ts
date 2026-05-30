import axiosClient from "./axiosClient";

export type PatientCreatePayload = {
  name: string;
  phone?: string;
  gender?: string;
  age?: number;
  assignedDoctor?: string;
  status?: string;
  dob?: string;
  lastVisit?: string;
};

export const fetchPatients = async () => {
  return axiosClient.get("/patients/list");
};

export const createPatient = async (payload: PatientCreatePayload) => {
  return axiosClient.post("/patients", payload);
};
