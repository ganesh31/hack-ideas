import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

describe("Login", () => {
  it("should call onUser on successful login", async () => {
    const mockOnUser = jest.fn();
    render(
      <BrowserRouter>
        <Login onUser={mockOnUser} />
      </BrowserRouter>
    );
    const textfield = screen.getByPlaceholderText("Employee Id");

    fireEvent.change(textfield, { target: { value: "1" } });

    const button = screen.getByText(/Submit/i);

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnUser).toBeCalled();
    });
  });

  it("should show error message if login failed", async () => {
    const mockOnUser = jest.fn();
    render(
      <BrowserRouter>
        <Login onUser={mockOnUser} />
      </BrowserRouter>
    );
    const textfield = screen.getByPlaceholderText("Employee Id");

    fireEvent.change(textfield, { target: { value: "123" } });

    const button = screen.getByText(/Submit/i);

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Employee does not exists"
      );
    });
  });
});
