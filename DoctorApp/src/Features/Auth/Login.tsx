import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  authenticate,
  getStoredPassword,
  setStoredPassword,
  DOCTOR_EMAIL,
} from "../../utils/cookies";

const Page = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(360px, 1.05fr);
  background: #eef2ff;

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

const BrandPanel = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 44px;
  background: linear-gradient(180deg, #5b21b6 0%, #4338ca 100%);
  color: #fff;

  @media (max-width: 840px) {
    padding: 28px;
  }
`;

const BrandTitle = styled.h1`
  margin: 0;
  font-size: 42px;
  line-height: 1.05;
  font-weight: 900;
`;

const BrandText = styled.p`
  max-width: 420px;
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.85);
`;

const LoginCard = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 42px 24px;
  min-height: 100vh;
  background: #f8fafc;
`;

const Card = styled.div`
  width: min(480px, 100%);
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
  padding: 36px;
`;

const Title = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 30px;
  font-weight: 800;
`;

const Subtitle = styled.p`
  margin: 12px 0 28px;
  color: #6b7280;
  line-height: 1.7;
`;

const Form = styled.form`
  display: grid;
  gap: 18px;
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: #334155;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 15px;
  color: #0f172a;
  outline: none;

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
  }
`;

const Button = styled.button<{ secondary?: boolean }>`
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  color: #ffffff;
  background: ${({ secondary }) => (secondary ? "#64748b" : "#7c3aed")};
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ secondary }) => (secondary ? "#475569" : "#5b21b6")};
  }
`;

const SmallAction = styled.button`
  border: none;
  background: transparent;
  color: #7c3aed;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  padding: 0;
`;

const Message = styled.p<{ error?: boolean }>`
  margin: 0;
  color: ${({ error }) => (error ? "#dc2626" : "#16a34a")};
  font-size: 14px;
  line-height: 1.6;
`;

const Hint = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #64748b;
  line-height: 1.7;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DOCTOR_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const storedPassword = getStoredPassword();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (email.trim().toLowerCase() !== DOCTOR_EMAIL) {
      setError("Please use your assigned doctor email.");
      return;
    }

    if (password !== storedPassword) {
      setError("Invalid password. Contact admin or reset your password.");
      return;
    }

    authenticate(email.trim().toLowerCase());
    navigate("/dashboard");
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (email.trim().toLowerCase() !== DOCTOR_EMAIL) {
      setError("Reset is only available for your assigned doctor account.");
      return;
    }

    if (currentPassword !== storedPassword) {
      setError("Current password is incorrect.");
      return;
    }

    if (newPassword.length < 5) {
      setError("New password should be at least 5 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStoredPassword(newPassword);
    setSuccess("Password reset successfully. Use the new password to log in.");
    setResetMode(false);
    setPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Page>
      <BrandPanel>
        <BrandTitle>Doctor Panel</BrandTitle>
        <BrandText>
          Access your clinic dashboard, view appointment lists, update your profile picture, and manage today's schedule with a clean hospital-first interface.
        </BrandText>
      </BrandPanel>

      <LoginCard>
        <Card>
          <Title>{resetMode ? "Reset Password" : "Doctor Login"}</Title>
          <Subtitle>
            {resetMode
              ? "Enter your current password and choose a new password to update your doctor account."
              : "Sign in with your assigned doctor credentials. Password is 12345 for the first login."}
          </Subtitle>

          {resetMode ? (
            <Form onSubmit={handleReset}>
              <Field>
                Email address
                <Input type="email" value={email} readOnly />
              </Field>
              <Field>
                Current password
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Enter current password"
                  required
                />
              </Field>
              <Field>
                New password
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Choose a new password"
                  required
                />
              </Field>
              <Field>
                Confirm password
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </Field>
              {error && <Message error>{error}</Message>}
              {success && <Message>{success}</Message>}
              <Button type="submit">Save password</Button>
              <Footer>
                <SmallAction type="button" onClick={() => setResetMode(false)}>
                  Back to login
                </SmallAction>
              </Footer>
            </Form>
          ) : (
            <Form onSubmit={handleLogin}>
              <Field>
                Email address
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                Password
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
              {error && <Message error>{error}</Message>}
              {success && <Message>{success}</Message>}
              <Button type="submit">Sign in</Button>
              <Footer>
                <SmallAction type="button" onClick={() => setResetMode(true)}>
                  Forgot password?
                </SmallAction>
                <Hint>Admin-created doctor accounts only. No signup available.</Hint>
              </Footer>
            </Form>
          )}
        </Card>
      </LoginCard>
    </Page>
  );
};

export default Login;
