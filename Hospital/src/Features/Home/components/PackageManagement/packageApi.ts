import axiosClient from "../../../../api/axiosClient";

export type PackagePlan = {
  id: string;
  name: string;
  price: string;
  duration: string;
  department: string;
  testsIncluded: number;
  consultancyFree: number;
  description: string;
  tier: string;
  durationMonths: number;
  status: string;
};

export type PackageSubscription = {
  id: string;
  name: string;
  phone: string;
  packageName: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | string;
};

export type CreatePackageSubscriptionPayload = {
  name: string;
  phone: string;
  packageName: string;
};

export type CreatePackagePlanPayload = {
  name: string;
  price: string;
  duration: string;
  department: string;
  testsIncluded: string;
  consultancyFree: string;
  description: string;
  tier: string;
  durationMonths: string;
};

type PackagePlanListResponse = {
  data: PackagePlan[];
};

type PackagePlanResponse = {
  message: string;
  data: PackagePlan;
};

type PackageSubscriptionListResponse = {
  data: PackageSubscription[];
};

type PackageSubscriptionResponse = {
  message: string;
  data: PackageSubscription;
};

export const fetchPackagePlansApi = async () => {
  const response = await axiosClient.get<PackagePlanListResponse>("/packages/list");
  return response.data.data;
};

export const createPackagePlanApi = async (payload: CreatePackagePlanPayload) => {
  const response = await axiosClient.post<PackagePlanResponse>("/packages", payload);
  return response.data;
};

export const fetchPackageSubscriptionsApi = async (packageName?: string) => {
  const response = await axiosClient.get<PackageSubscriptionListResponse>(
    "/packages/subscriptions",
    {
      params: packageName ? { packageName } : undefined,
    }
  );
  return response.data.data;
};

export const createPackageSubscriptionApi = async (
  payload: CreatePackageSubscriptionPayload
) => {
  const response = await axiosClient.post<PackageSubscriptionResponse>(
    "/packages/subscriptions",
    payload
  );
  return response.data;
};
