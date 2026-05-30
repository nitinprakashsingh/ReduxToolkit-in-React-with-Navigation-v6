import { render, screen } from "@testing-library/react";
import SignUpPage from "./Signup";

describe("SignUpPage", () => {
  it("renders the sign up page heading", () => {
    render(<SignUpPage />);

    expect(screen.getByRole("heading", { name: /signup page/i })).toBeInTheDocument();
  });
});
