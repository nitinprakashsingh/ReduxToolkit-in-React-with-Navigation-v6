export type PatientAppModuleConfig = {
  name: string;
  status: "draft" | "active";
  description: string;
};

export const patientAppModuleConfig: PatientAppModuleConfig = {
  name: "patientapp",
  status: "draft",
  description: "Scaffold for PatientApp-specific backend development",
};
