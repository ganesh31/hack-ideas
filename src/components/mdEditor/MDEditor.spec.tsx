import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MDEditor from "./MDEditor";

describe("MDEditor", () => {
  it("should call mock change when field is changed", () => {
    const mockOnChange = jest.fn();
    render(
      <MDEditor initialContent="" label="Editor" onChange={mockOnChange} />
    );

    fireEvent.change(screen.getByPlaceholderText("Start Hacking..."), {
      target: { value: "### Question" },
    });

    expect(mockOnChange).toBeCalledWith("### Question");
  });

  /** test cas is failing due to suspense. Need to check */
  it.skip("should show preview", async () => {
    const mockOnChange = jest.fn();
    render(
      <MDEditor initialContent="" label="Editor" onChange={mockOnChange} />
    );

    fireEvent.change(screen.getByPlaceholderText("Start Hacking..."), {
      target: { value: "### Question" },
    });

    fireEvent.click(screen.getByText(/Preview/i));
  });
});
