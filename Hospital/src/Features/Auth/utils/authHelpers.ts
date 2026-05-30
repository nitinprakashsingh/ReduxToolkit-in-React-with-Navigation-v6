import type { LoginPayload } from "../auth.types";

export const loginApi = async (payload: LoginPayload) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json(); // { user, token }
};