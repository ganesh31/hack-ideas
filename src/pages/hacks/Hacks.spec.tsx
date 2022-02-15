import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Hacks from "./Hacks";

describe("Hacks", () => {
  it("should render all the hacks", async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Jan Circuits '22/i)).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should navigate to login page if user is not logged in and clicks on the like button", async () => {
    render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Jan Circuits '22/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByTestId("button-like")[0]);
  });

  it("should update likes hack on click of the like button", async () => {
    render(
      <BrowserRouter>
        <Hacks
          user={{
            id: 1,
            name: "John",
            hacks: [],
          }}
        />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Jan Circuits '22/i)).toBeInTheDocument();
    });

    const likesElement = screen.getByTestId("likes-count");

    let likesCount = parseInt(likesElement.innerHTML) || 0;

    fireEvent.click(screen.getAllByTestId("button-like")[0]);

    await waitFor(() => {
      expect(screen.getByTestId("likes-count")).toHaveTextContent(
        (likesCount - 1).toString()
      );
    });

    fireEvent.click(screen.getAllByTestId("button-like")[0]);

    await waitFor(() => {
      expect(screen.getByTestId("likes-count")).toHaveTextContent(
        likesCount.toString()
      );
    });
  });
});
