import axiosClient from "../../../../api/axiosClient";

export type Department = {
  id: string;
  name: string;
  headDoctor?: string;
  phone?: string;
  roomNo?: string;
  status: "Active" | "Inactive" | string;
  createdAt?: string;
  updatedAt?: string;
};

export type DepartmentPayload = {
  name: string;
  headDoctor: string;
  phone: string;
  roomNo: string;
  status: string;
};

type DepartmentListResponse = {
  data: Department[];
};

type DepartmentResponse = {
  message: string;
  data: Department;
};

export const fetchDepartmentsApi = async () => {
  const response = await axiosClient.get<DepartmentListResponse>("/departments/list");
  return response.data.data;
};

export const createDepartmentApi = async (payload: DepartmentPayload) => {
  const response = await axiosClient.post<DepartmentResponse>("/departments", payload);
  return response.data;
};

export const updateDepartmentApi = async (
  departmentId: string,
  payload: DepartmentPayload
) => {
  const response = await axiosClient.put<DepartmentResponse>(
    `/departments/${departmentId}`,
    payload
  );
  return response.data;
};
