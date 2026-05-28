import axiosClient from "../../../../api/axiosClient";

export type Disease = {
  id: string;
  name: string;
  organ: string;
  suggestedDepartment: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DiseasePayload = {
  name: string;
  organ: string;
  suggestedDepartment: string;
  type: string;
};

type DiseaseListResponse = {
  data: Disease[];
};

type DiseaseResponse = {
  message: string;
  data: Disease;
};

export const fetchDiseasesApi = async () => {
  const response = await axiosClient.get<DiseaseListResponse>("/diseases/list");
  return response.data.data;
};

export const createDiseaseApi = async (payload: DiseasePayload) => {
  const response = await axiosClient.post<DiseaseResponse>("/diseases", payload);
  return response.data;
};

export const updateDiseaseApi = async (diseaseId: string, payload: DiseasePayload) => {
  const response = await axiosClient.put<DiseaseResponse>(
    `/diseases/${diseaseId}`,
    payload
  );
  return response.data;
};
