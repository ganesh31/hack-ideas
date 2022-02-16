import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import MDEditor from "./MDEditor";

afterEach(cleanup);

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

  it("should show preview with default message if content is empty", async () => {
    const mockOnChange = jest.fn();
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <MDEditor initialContent="" label="Editor" onChange={mockOnChange} />
      </React.Suspense>
    );

    fireEvent.click(screen.getByText(/Preview/i));

    await waitFor(() => {
      expect(screen.getByText(/Start Hacking.../i)).toBeInTheDocument();
    });
  });

  it("should show preview", async () => {
    const mockOnChange = jest.fn();
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <MDEditor initialContent="" label="Editor" onChange={mockOnChange} />
      </React.Suspense>
    );

    fireEvent.change(screen.getByPlaceholderText("Start Hacking..."), {
      target: { value: "### Question" },
    });

    fireEvent.click(screen.getByText(/Preview/i));
  });
});
