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
  });

  it("should not show the add hack button if the user is not logged in", () => {
    render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    expect(screen.queryByTestId("addHack")).not.toBeInTheDocument();
  });

  it("should show the add hack button if the user is logged in", () => {
    render(
      <BrowserRouter>
        <Hacks user={{ id: 1, name: "John", hacks: [] }} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("addHack")).toBeInTheDocument();
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

    const likesElement = screen.queryAllByTestId("likes-count");

    let likesCount =
      parseInt(likesElement?.length > 0 ? likesElement[0].innerHTML : "") || 0;
    fireEvent.click(screen.getAllByTestId("button-like")[0]);

    await waitFor(() => {
      expect(screen.queryAllByTestId("likes-count")[0]).toHaveTextContent(
        (likesCount - 1).toString()
      );
    });

    fireEvent.click(screen.getAllByTestId("button-like")[0]);

    await waitFor(() => {
      expect(screen.queryAllByTestId("likes-count")[0]).toHaveTextContent(
        likesCount.toString()
      );
    });
  });
});
