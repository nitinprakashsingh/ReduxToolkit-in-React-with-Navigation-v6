const cookieName = "doctor-session";
export const DOCTOR_EMAIL = "nitinprakashsingh2023@gmail.com";
const defaultPassword = "12345";
const passwordStorageKey = "doctor-stored-password";

export const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const authenticate = (email: string) => {
  setCookie(cookieName, "true", 7);
  setCookie("doctor-email", email, 7);
};

export const signOut = () => {
  removeCookie(cookieName);
  removeCookie("doctor-email");
};

export const getDoctorEmail = () => {
  return getCookie("doctor-email") || DOCTOR_EMAIL;
};

export const getStoredPassword = () => {
  return window.localStorage.getItem(passwordStorageKey) || defaultPassword;
};

export const setStoredPassword = (password: string) => {
  window.localStorage.setItem(passwordStorageKey, password);
};
