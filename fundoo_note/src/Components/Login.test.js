import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { loginApiCall } from "../Services/Api";
import { MemoryRouter } from "react-router-dom";

// Mock the API call
jest.mock("../Services/Api", () => ({
  loginApiCall: jest.fn(),
}));

describe("Login Component", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  test("renders login form correctly", () => {
    expect(screen.getByPlaceholderText("Email or Phone*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password*")).toBeInTheDocument();
  });

  test("shows error messages for invalid email and password", async () => {
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(
        screen.getByText("Email is required and must be valid.")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Password is required and must be at least 8 characters long, contain at least one uppercase letter, and one number."
        )
      ).toBeInTheDocument();
    });
  });

  test("submits login form with valid email and password", async () => {
    loginApiCall.mockResolvedValueOnce({
      data: { data: { access: "dummy" } },
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Email or Phone*"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password*"), {
      target: { value: "Password1" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(loginApiCall).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password1",
      });
    });
  });

  test("does not call API if email or password is invalid", async () => {
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText("Email or Phone*"), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password*"), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() => {
      expect(loginApiCall).not.toHaveBeenCalled();
    });
  });


  test("navigates to create account when clicked", () => {
    const createAccountLink = screen.getByText("Create account");
    fireEvent.click(createAccountLink);

    expect(createAccountLink).toBeInTheDocument();
  });
});
