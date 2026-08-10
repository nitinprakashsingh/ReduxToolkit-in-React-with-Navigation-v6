import axiosClient from "../../../../api/axiosClient";

export type User = {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  role: "admin" | "manager" | "live_responsist" | "user";
  address?: string;
  createdAt: string;
};

export type CreateUserPayload = {
  name: string;
  email?: string;
  mobile?: string;
  address?: string;
  role: "admin" | "manager" | "live_responsist" | "user";
  password?: string;
};

type UserListResponse = {
  data: User[];
};

type CreateUserResponse = {
  message: string;
  data: User;
};

type DeleteUserResponse = {
  message: string;
};

export const fetchUserListApi = async () => {
  const response = await axiosClient.get<UserListResponse>("/users/list");
  return response.data.data;
};

export const fetchPatientUsersApi = async () => {
  const response = await axiosClient.get<UserListResponse>("/users/patients");
  return response.data.data;
};

export const createUserApi = async (payload: CreateUserPayload) => {
  const response = await axiosClient.post<CreateUserResponse>("/users", payload);
  return response.data;
};

export const updateUserApi = async (userId: string, payload: CreateUserPayload) => {
  const response = await axiosClient.put<CreateUserResponse>(`/users/${userId}`, payload);
  return response.data;
};

export const deleteUserApi = async (userId: string) => {
  const response = await axiosClient.delete<DeleteUserResponse>(`/users/${userId}`);
  return response.data;
};
