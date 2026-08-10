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

export const fetchUserListApi = async () => {
  const response = await axiosClient.get<UserListResponse>("/users/list");
  return response.data.data;
};

export const createUserApi = async (payload: CreateUserPayload) => {
  const response = await axiosClient.post<CreateUserResponse>("/users", payload);
  return response.data;
};
