import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../Store/types";
import { loginRequest } from "../../authSlice";
import LoginPage from "./Login";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}), { virtual: true });

jest.mock("../../../../Store/types", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseNavigate = useNavigate as jest.Mock;
const mockedUseAppDispatch = useAppDispatch as jest.Mock;
const mockedUseAppSelector = useAppSelector as jest.Mock;

describe("LoginPage", () => {
  const dispatch = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    mockedUseAppDispatch.mockReturnValue(dispatch);
    mockedUseNavigate.mockReturnValue(navigate);
    mockedUseAppSelector.mockReturnValue({ isLoading: false, error: null, user: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form fields and actions", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: /auth\.login\.welcomeback/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /auth\.login\.submitbutton/i })).toBeInTheDocument();
  });

  it("updates email and password inputs when the user types", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("secret123");
  });

  it("dispatches the login request and navigates to dashboard on submit", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /auth\.login\.submitbutton/i }));

    expect(dispatch).toHaveBeenCalledWith(
      loginRequest({ email: "test@example.com", password: "secret123" })
    );
    expect(navigate).not.toHaveBeenCalled();
  });
});
