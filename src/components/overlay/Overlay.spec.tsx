import { fireEvent, render, screen } from "@testing-library/react";
import Overlay from "./Overlay";

describe("Overlay", () => {
  it("should render the overlay if open is true", () => {
    const mockClose = jest.fn();
    render(
      <Overlay onClose={mockClose} open>
        Overlay Content
      </Overlay>
    );

    const element = screen.getByText(/Overlay Content/i);

    expect(element).toBeInTheDocument();
  });

  it("should not render the overlay if open is false", () => {
    const mockClose = jest.fn();
    render(
      <Overlay onClose={mockClose} open={false}>
        Overlay Content
      </Overlay>
    );

    expect(screen.queryByText("Overlay Content")).not.toBeInTheDocument();
  });
});
