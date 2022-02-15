import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";

describe("Register", () => {
  it("should be able to register new user", async () => {
    const mockOnUser = jest.fn();
    render(
      <BrowserRouter>
        <Register onUser={mockOnUser} />
      </BrowserRouter>
    );

    const element = screen.getByPlaceholderText("Name");

    fireEvent.change(element, { target: { value: "Ross" } });

    const submit = screen.getByText("Submit");

    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Employee ID generated successfully,"
      );
    });
    expect(mockOnUser).toBeCalled();

    const okButton = screen.getByText("Ok");
    fireEvent.click(okButton);
  });
});
